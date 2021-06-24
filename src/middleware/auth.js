require('dotenv');

const jwt = require('jsonwebtoken');

exports.token = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({"msg" : "No token, authorization denied"});
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.status(403).json({"msg": "Token is not valid"});
        } else {
            req.userId = user.id;
            req.email = user.email;
            next();
        }
    })
}

exports.cors = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Auth-Token, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};