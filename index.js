var keys=require('./config/keys')
var mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);


const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
//const books = require('./books')

//const books = require('./model/Book')
var crud=require('./services/crud')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000,() => {
    console.log('listening');
});

app.get('/', function (req, res) {
  res.send('Hello NAO!');
});

app.get('/list', async function (req, res) {
    // res.contentType('application/json');
    // myJSONstring = JSON.stringify(books);
    // res.send(myJSONstring);
    var books=await crud.readAllDB();
    console.log(books);
    //res.send('OK');
    res.contentType('application/json');
    res.send(books);
});

app.get('/create',function (req, res) {
    crud.createDB();
    res.send('OK');
});

app.get('/read/:id', async function (req, res) {
    id=req.params['id'];
    var book=await crud.readDB(id);
    console.log(book);
    //res.send('OK');
    res.contentType('application/json');
    res.send(book);
});

app.get('/check', function (req, res) {
    res.send('130');
});

app.get('/book/:id', async function (req, res) {
    // id=req.params['id'];
    // res.contentType('application/json');
    // myJSONstring = JSON.stringify(books);
    // var myJSONstringP = JSON.parse(myJSONstring);
    // var _books=myJSONstringP.books.filter(x=>x.code == id && x.available == 1);
    // res.send(_books);
    id=req.params['id'];
    var book=await crud.updateAvailabilityDB(id,false);
    console.log(book);
    res.contentType('application/json');
    res.send(book);
});

app.get('/return/:id', async function (req, res) {
    // id=req.params['id'];
    // res.contentType('application/json');
    // myJSONstring = JSON.stringify(books);
    // var myJSONstringP = JSON.parse(myJSONstring);
    // var _books=myJSONstringP.books.filter(x=>x.code == id && x.available == 1);
    // res.send(_books);
    id=req.params['id'];
    var book=await crud.updateAvailabilityDB(id,true);
    console.log(book);
    res.contentType('application/json');
    res.send(book);
});

app.get('/booki/:id', function (req, res) {
    id=req.params['id'];
    myJSONstring = JSON.stringify(books);
    var myJSONstringP = JSON.parse(myJSONstring);
    var _books=myJSONstringP.books.filter(x=>x.code == id && x.available == 1);
    if (_books.length>0)
        res.send("1");
    else
        res.send("0");
});


// app.get('*',(req,res) => {
//     res.sendFile(path.join(__dirname,'./index.html'));
// });