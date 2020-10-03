const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//instance of routes for todo routes
const todoRoutes = express.Router();
const PORT = 4000;

//Imports Todo Model
let Todo = require('./todo.model')

//Adding cors and bodyparser middleware and joson
app.use(cors());
app.use(bodyParser.json());

//MongoClient Constructor
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true}, { useUnifiedTopology : true})
const connection = mongoose.connection;
//Method for connecting to MongoDB Database
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

//Todos List route and Callback Method
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) { 
        if (err) { 
            console.log(err);
        } else {
            res.json(todos)
        }
    });
});

//Edit Todo route and Callback Method
todoRoutes.route('/:id').get(function(req, res) { 
    let id = req.params.id;
    Todo.findById(id, function(err, todo) { 
        res.json(todo)
    });
});

//Create Todo route with  Callback Method
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => { 
            res.status(400).send('adding new todo failed');
        });
});

//Todo Update and or Completed Route with Callback Method 
todoRoutes.route('/update/:id').post(function(req, res) { 
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description =  req.body.todo_description;
            todo.todo_responsible =  req.body.todo_responsible;
            todo.todo_priority =  req.body.todo_priority;
            todo.todo_completed =  req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send('Update not possible')
            });
    });
});

//Method to use express router middleware to access our todo routes 
app.use('/todos', todoRoutes);

//Server callback function letting the user know the server is running successfully
app.listen(PORT, function() { 
    console.log("Server is running on Port: " + PORT);
});

//must use nodemon to start server *nodemon server*