const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const books = require('./books')

app.use(bodyParser.json());
app.listen(process.env.PORT || 3000,() => {
    console.log('listening');
});

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

app.get('/', function (req, res, next) {
  res.send('Hello NAO!');
});

app.get('/list', function (req, res, next) {
    res.contentType('application/json');
    myJSONstring = JSON.stringify(books);
    res.send(myJSONstring);
});

app.get('/check', function (req, res, next) {
    res.send('130');
});

app.get('/book/:id', function (req, res, next) {
    id=req.params['id'];
    res.contentType('application/json');
    myJSONstring = JSON.stringify(books);
    var myJSONstringP = JSON.parse(myJSONstring);
    var _books=myJSONstringP.books.filter(x=>x.code == id && x.available == 1);
    res.send(_books);
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