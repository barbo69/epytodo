const mysql = require('mysql2');
const connection = require("../../config/db").connection;

exports.createDatabaseUser = function (name, firstname, email, password, callback) {
    var sql = "INSERT INTO user (email, password, name, firstname) VALUES ?";
    var value = [[email, password, name, firstname]];
    connection.query(sql, [value], function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}

exports.idShowDatabaseUser = function (id, callback) {
    var sql = "SELECT * FROM user WHERE id = ?";
    var value = id;
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}

exports.emailShowDatabaseUser = function (email, callback) {
    var sql = `SELECT * FROM user WHERE email = ?`;
    var value = [email];
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
}

exports.updateDatabaseUser = function(email, password, name, firstname, id, callback) {
    var sql = "UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?";
    var value = [email, password, name, firstname, id];
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err)
        else
            callback(result);
    });
}

exports.deleteDatabaseUser = function (id, callback) {
    var sql = "DELETE FROM user WHERE id = ?";
    var value = [id];
    connection.query(sql, value, function (err, result) {
        if (err)
            console.log(err);
        else {
            callback(result);
        }
    });
}