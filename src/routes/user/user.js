const userDb = require('./user.query');
const todoDb = require('../todos/todos.query');

exports.getUser = function (req, res) {
    let email = req.email;
    userDb.emailShowDatabaseUser(email, (dbUser) => {
        if (dbUser.length == 0)
                res.status(404).json({"msg": "Not found"});
        else
            res.status(200).json(dbUser[0]);
    });
}

exports.getUserByParameter = function (req, res) {
    const parameter = req.params.id || req.params.email;
    let id = parseInt(parameter);

    if (isNaN(id)) {
        userDb.emailShowDatabaseUser(parameter, (dbUser) => {
            if (dbUser.length == 0)
                res.status(404).json({"msg": "Not found"});
            else
                res.status(200).json(dbUser[0]);
        });
    } else {
        userDb.idShowDatabaseUser(id, (dbUser) => {
            if (dbUser.length == 0)
                res.status(404).json({"msg": "Not found"});
            else
                res.status(200).json(dbUser[0]);
        });
    }
}

exports.updateUser = function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let name = req.body.name;
    let unsureId = parseInt(req.params.id);

    if (isNaN(unsureId) || unsureId < 1) {
        res.status(400).json({"msg": "the parameter id is not a positive number"})
    } else {
        userDb.updateDatabaseUser(email, password, name, firstname, unsureId, (result) => {
            if (result.affectedRows == 1) {
                userDb.idShowDatabaseUser(unsureId, (dbUser) => {
                res.status(200).json(dbUser[0]);
                })
            } else
                res.status(404).json({"msg":"Not found"})
        })
    }
}

exports.deleteUser = function (req, res) {
    let unsureId = parseInt(req.params.id);

    if (isNaN(unsureId) || unsureId < 1) {
        res.status(400).json({"msg": "the parameter id is not a positive number"})
    } else {
        todoDb.deleteAllDatabaseTodo(unsureId, () => {})
        userDb.deleteDatabaseUser(unsureId, (result) => {
            if (result.affectedRows == 1)
                res.status(200).json({"msg": `succesfully deleted record number : ${unsureId}`})
            else
                res.status(404).json({"msg": "Not found"});
        })
    }
}