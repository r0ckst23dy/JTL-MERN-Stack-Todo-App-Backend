const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creates Schema for Todos
let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: { 
        type: String
    },
    todo_completed: {
        type: Boolean
    }
})
//Exports Schema to Server
module.exports = mongoose.model('Todo', Todo);