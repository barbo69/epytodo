require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

const auth = require('./routes/auth/auth');
const token = require('./middleware/auth').token
const notFound = require('./middleware/notFound').notFound;
const cors = require("./middleware/auth").cors;
const user = require("./routes/user/user");
const todo = require("./routes/todos/todos");
const requestChecker = require('./middleware/requestChecker');

app.use(cors);
app.use(express.json());


/* AUTHENTICATION */
app.post('/register', requestChecker.register, auth.register);
app.post('/login', auth.login);


/* USER ROUTES */
app.get('/user', token, user.getUser);
app.get('/user/todos', token, todo.getUsersTodo);
app.get('/user/:id', token, user.getUserByParameter);
app.get('/user/:email', token, user.getUserByParameter);

app.put('/user/:id', token, requestChecker.updateUser, user.updateUser);

app.delete('/user/:id', token, user.deleteUser);


/* TODO ROUTES */
app.get('/todo', token, todo.getAllTodos);
app.get('/todo/:id', token, todo.getSingleTodo);

app.post('/todo', token, requestChecker.createTodo, todo.createTodo);
app.put('/todo/:id', token, requestChecker.updateTodo, todo.updateTodo);

app.delete('/todo/:id', token, todo.deleteTodo);


// app.use(notFound);


app.listen(PORT, HOST, ()=>console.log(`Server listening on ${HOST}:${PORT}`));