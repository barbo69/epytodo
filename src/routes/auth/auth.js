const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDb = require('../user/user.query');

function isValidUser(password, dbUser) {
    if (dbUser.length == 1 && bcrypt.compareSync(password, dbUser[0].password))
        return true;
    else
        return false;
}

exports.register = function(req, res) {
    let user = null;
    try {
        let email = req.body.email;
        let name = req.body.name;
        let firstname = req.body.firstname;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        user = {
            email: email.toLowerCase(),
            name: name.toLowerCase(),
            firstname: firstname.toLowerCase(),
            password: hash
        }
        userDb.emailShowDatabaseUser(email, (dbUser) => {
            if (dbUser.length == 0) {
                userDb.createDatabaseUser(user.name, user.firstname, user.email, user.password, (dbUser) => {
                    const accessToken = jwt.sign({email: user.email, id: dbUser.insertId}, process.env.SECRET);
                    res.status(200).json({"token": accessToken});
                })
            } else {
                res.status(409).json({"msg": "account already exists"})
            }
        });
    } catch (e) {
        console.log(e.message);
        res.status(400).json({"msg": "internal server error"});
    }
}

exports.login = function(req, res) {
    let b = req.body;
    if (typeof(b.email) != "string" || typeof(b.password) != "string")
        res.status(400).json({"msg": "email and password ought to be provided as character strings"});
    else {
        userDb.emailShowDatabaseUser(b.email, (dbUser) => {
            if (isValidUser(b.password, dbUser)) {
                const accessToken = jwt.sign({email: b.email, id: dbUser[0].id}, process.env.SECRET);
                res.status(200).json({"token": accessToken});
            }
            else
                res.status(401).json({"msg": "Invalid Credentials"});
        })
    }
}