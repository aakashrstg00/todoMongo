const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
//init
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
//
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/todo';
//body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//view
app.set('view engine', 'ejs');
//
MongoClient.connect(url, (err, dbs) => {
    console.log('mongo connected');
    if (err) throw err;

    db = dbs;
    Todos = db.collection('todos');
    app.listen(3000, () => console.log("Server started at 3000"));
});
//
app.get('/', (req, res) => {
    Todos.find({}).toArray((err, todos) => {
        if (err) {
            return console.log('error');
        }
        console.log('todos: ', todos);
        res.render('index', {
            todos: todos
        });
    });

});

app.post('/todo/add', (req, res) => {
    console.log('body: ', req.body);
    var todo = req.body;

    //insert todo
    Todos.insert(todo, function (err, result) {
        if (err) {
            return console.log(error);
        }
        console.log("todo added!");
        res.redirect('/');
    });
});
app.delete('/todo/delete/:id', (req, res, next) => {
    Todos.deleteOne({
        _id: ObjectID(req.params.id)
    }, (err, result) => {
        if (err) {
            return console.log("error");
        }
        console.log("Todo Deleted");
        res.sendStatus(200);
    });
});
app.get('/todo/edit/:id', (req, res, next) => {
    Todos.find({
        _id: ObjectID(req.params.id)
    }).next((err, todo) => {
        if (err) {
            return console.log('error ocurred');
        }
        console.log('todo edit request');
        res.render('edit', {
            todo: todo
        });
    });
});
app.post('/todo/edit/:id', (req, res) => {
    console.log('body: ', req.body);
    var todo = req.body;

    //update todo
    Todos.updateOne({
        _id: ObjectID(req.params.id)
    }, {
        $set: todo
    }, (err, result) => {
        if (err) {
            return console.log("error");
        }
        console.log("Todo Updated");
        res.redirect('/');
    })
});