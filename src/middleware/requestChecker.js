exports.register = function (req, res, next) {
    let body = req.body;

    if (typeof(body.email) != "string" || body.email.length == 0) {
        res.status(400).json({"msg": "email should be a character string or was not provided"});
    } else if (typeof(body.firstname) != "string" || body.firstname.length == 0) {
        res.status(400).json({"msg": "firstname should be a character string or was not provided"});
    } else if (typeof(body.name) != "string" || body.name.length == 0) {
        res.status(400).json({"msg": "name should be a character string or was not provided"});
    } else if (typeof(body.password) != "string" || body.password.length == 0) {
        res.status(400).json({"msg": "password should be a character string or was not provided"});
    } else if (!body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        res.status(400).json({"msg": "incorrect email: should be like example@mail.domain"});
    } else
        next();
}

exports.updateUser = function (req, res, next) {
    let body = req.body;

    if (typeof(body.email) != "string" || body.email.length == 0) {
        res.status(400).json({"msg": "email should be a character string or was not provided"});
    } else if (typeof(body.firstname) != "string" || body.firstname.length == 0) {
        res.status(400).json({"msg": "firstname should be a character string or was not provided"});
    } else if (typeof(body.name) != "string" || body.name.length == 0) {
        res.status(400).json({"msg": "name should be a character string or was not provided"});
    } else if (typeof(body.password) != "string" || body.password.length == 0) {
        res.status(400).json({"msg": "password should be a character string or was not provided"});
    } else if (!body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        res.status(400).json({"msg": "incorrect email: should be like example@mail.domain"});
    } else if (!body.created_at || body.created_at.length == 0) {
        res.status(400).json({"msg": "created_at should be a character string or was not provided"});
    }
        next();
}

function todoCheck(req, res) {
    let body = req.body;

    if (typeof(body.title) != "string" || body.title.length == 0) {
        res.status(400).json({"msg": "title should be a character string or was not provided"});
    } else if (typeof(body.description) != "string" || body.description.length == 0) {
        res.status(400).json({"msg": "description should be a character string or was not provided"});
    } else if (isNaN(Date.parse(body.due_time))) {
        res.status(400).json({"msg": "Due_time should be in a valid date format or was not provided"});
    } else if (body.status && body.status != "todo" && body.status != "doing" && body.status != "done" && body.status!= "in progress") {
        res.status(400).json({"msg": "status should be either todo, doing, in progress, or done"})
    } else if (isNaN(parseInt(body.user_id)) || parseInt(body.user_id) < 1) {
        res.status(400).json({"msg": "user_id should be a positive number or was not provided"})
    } else
        return 'ok';
}

exports.createTodo = function (req, res, next) {
    if (todoCheck(req, res) == 'ok')
        next();
}

exports.updateTodo = function (req, res, next) {
    if (todoCheck(req, res) == 'ok') {
        let id = req.params.id;
        if (isNaN(parseInt(id)) || parseInt(id) < 1)
            res.status(400).json({"msg": "parameter id is expected to be a positive int"})
        else
            next();
    }
}