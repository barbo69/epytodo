const mysql = require('mysql2');
const connection = require("../../config/db").connection;

exports.showAllDatabaseTodo = function (callback) {
    var sql = "SELECT * FROM todo";
    connection.query(sql, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}

exports.idShowDatabaseTodo = function (id, callback) {
    var sql = "SELECT * FROM todo WHERE id = ?";
    var value = id;
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}

exports.idShowDatabaseUsersTodo = function (user_id, callback) {
    var sql = "SELECT * FROM todo WHERE user_id = ?";
    var value = user_id;
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}

exports.createDatabaseTodo = function (title, description, due_time, status, user_id, callback) {
    var due_time_date = new Date(due_time);
    var sql = "INSERT INTO todo (title, description, due_time, status, user_id) VALUES ?";
    var value = [[title, description, due_time_date, status, user_id]];
    connection.query(sql, [value], function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}

exports.updateDatabaseTodo = function(title, description, due_time, status, id, callback) {
    var due_time_date = new Date(due_time);
    var sql = "UPDATE todo SET title = ?, description = ?, due_time = ?, status = ? WHERE id = ?";
    var value = [title, description, due_time_date, status, id];
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err)
        else
            callback(result);
    });
}

exports.deleteDatabaseTodo = function (id, callback) {
    var sql = "DELETE FROM todo WHERE id = ?";
    var value = [id];
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}

exports.deleteAllDatabaseTodo = function (user_id, callback) {
    var sql = "DELETE FROM todo WHERE user_id = ?";
    var value = [user_id];
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}