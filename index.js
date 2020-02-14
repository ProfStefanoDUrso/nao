const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const books = require('./books')

app.use(bodyParser.json());
app.listen(process.env.PORT || 3000,() => {
    console.log('listening');
});

app.get('/', function (req, res) {
  res.send('Hello NAO!');
});

app.get('/list', function (req, res) {
    res.contentType('application/json');
    myJSONstring = JSON.stringify(books);
    res.send(myJSONstring);
});

app.get('/check', function (req, res) {
    res.send('130');
});

app.get('/book/:id', function (req, res) {
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