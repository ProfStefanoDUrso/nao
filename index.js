const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.listen(process.env.PORT || 3000,() => {
    console.log('listening');
});

app.get('/', function (req, res) {
  res.send('Hello NAO!');
});

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'./index.html'));
});