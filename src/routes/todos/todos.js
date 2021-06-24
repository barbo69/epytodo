const todoDb = require('./todos.query');
const userDb = require('../user/user.query');

exports.getAllTodos = function (req, res) {
    todoDb.showAllDatabaseTodo((tasks) => {
        tasks.map((element) => {
            if (element.status == 'in progress')
                element.status = 'doing';
        })
        res.status(200).send(tasks);
    })
}

exports.getSingleTodo = function (req, res) {
    let unsureId = req.params.id;

    unsureId = parseInt(unsureId);
    if (isNaN(unsureId) || unsureId < 1) {
        res.status(400).json({"msg": "Parameter id is not a positive number"})
    } else {
        todoDb.idShowDatabaseTodo(unsureId, (todo) => {
            todo.map((element) => {
                if (element.status == 'in progress')
                    element.status = 'doing';
            })
            if (todo.length != 1) {
                res.status(404).json({"msg": "Not found"})
            } else
                res.status(200).json(todo[0]);
        })
    }
}

exports.getUsersTodo = function (req, res) {
    userDb.idShowDatabaseUser(req.userId, (user) => {
        if (user.length != 1) {
            res.status(404).json({"msg": "Not found"})
        } else {
            todoDb.idShowDatabaseUsersTodo(req.userId, (todos) => {
                todos.map((element) => {
                    if (element.status == 'in progress')
                        element.status = 'doing';
                })
                res.status(200).send(todos);
            })
        }
    })
}

exports.createTodo = function (req, res) {
    let due_time = new Date(req.body.due_time).toISOString().replace('T', ' ').split('.')[0];
    let user_id = parseInt(req.body.user_id);
    let status;

    if (req.body.status == "doing")
        status = "in progress"
    else if (req.body.status)
        status = req.body.status;
    else
        status = 'not started';
    userDb.idShowDatabaseUser(user_id, (result) => {
        if (result.length != 1) {
            res.status(404).json({"msg": "todo could not be create because user was not found"})
        } else {
            todoDb.createDatabaseTodo(req.body.title, req.body.description, due_time, status, user_id, (result) => {
                todoDb.idShowDatabaseTodo(result.insertId, (task) => {
                    task.map((element) => {
                        if (element.status == 'in progress')
                            element.status = 'doing';
                    })
                    res.status(200).json(task[0]);
                })
            })
        }
    })
}

exports.updateTodo = function (req, res) {
    let due_time = new Date(req.body.due_time).toISOString().replace('T', ' ').split('.')[0];
    let user_id = parseInt(req.params.id);
    let status;

    if (isNaN(user_id) || user_id < 1) {
        res.status(400).json({'msg': 'parameter id is not a positive number'})
    } else {
        if (req.body.status == "doing")
            status = "in progress"
        else if (req.body.status)
            status = req.body.status;
        else
            status = 'not started';
        userDb.idShowDatabaseUser(user_id, (result) => {
            if (result.length != 1) {
                res.status(404).json({"msg": "todo could not be modified because user was not found"})
            } else {
                todoDb.createDatabaseTodo(req.body.title, req.body.description, due_time, status, user_id, (result) => {
                    todoDb.idShowDatabaseTodo(result.insertId, (task) => {
                        task.map((element) => {
                            if (element.status == 'in progress')
                                element.status = 'doing';
                        })
                        res.status(200).json(task[0]);
                    })
                })
            }
        })
    }
}

exports.deleteTodo = function (req, res) {
    let todoId = parseInt(req.params.id);

    if (isNaN(todoId) || todoId < 1) {
        res.status(400).json({'msg': 'parameter id is not a positive number'})
    } else {
        todoDb.deleteDatabaseTodo(todoId, (result) => {
            if (result.affectedRows < 1) {
                res.status(404).json({"msg": "Not found"});
            }
            else
            res.status(200).json({"msg": `succesfully deleted record number : ${todoId}`})
        })
    }
}