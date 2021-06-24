require('dotenv').config();
const mysql = require('mysql2');

exports.connection = mysql.createConnection({
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
});