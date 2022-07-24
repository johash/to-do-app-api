const express = require("express");
const router = express.Router();

const Todo = require('../models/todo.model.js');

router.get("/", (req, res) => {
  Todo.find().select('heading description status').exec().then(todos => {
    if(todos.length === 0) {
        return res.status(200).json({
            count: todos.length,
            message : 'No records found'
        })
    }
    res.status(200).json({
        count: todos.length,
        todos: todos,
        headers: {

            method: req.method,
            url: req.url
        }
    });
  }).catch(err => {
    res.status(500).json({
        Error: err
    })
  })
});

router.post('/', (req, res) => {
    let newTodo = new Todo({
        heading: req.body.heading,
        description: req.body.description,
        status: false
    })
    newTodo.save().then(result => {
        console.log(result);
        res.status(201).json({
            todo: result,
            headers: {
                method: req.method,
                url: req.url
            }
        })
    }).catch(err => {
        res.json({Error : err})
    })
})

router.put('/:id', (req, res) => {
    let todoId = req.params.id;
    Todo.findById(todoId).select('status').exec().then(todo => {
        if(todo) {
            Todo.findByIdAndUpdate(todo._id, {status: !todo.status}).exec().then(result => {
                res.status(200).json({
                    result
                })
            }).catch(err => {
                res.status(500).json({
                    Error: err
                })
            });
        }
    }).catch(err => {
        res.status(500).json({
            Error: err
        })
    })
})

router.delete('/:id', (req, res) => {
    let todoId = req.params.id;
    Todo.findByIdAndDelete(todoId).exec().then(result => {
        res.status(200).json({
            result
        })
    }).catch(err => {
        res.status(500).json({
            Error: err
        })
    })
})

module.exports = router;
