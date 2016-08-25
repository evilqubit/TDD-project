var express = require('express');
var responseTime = require('response-time');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
var db = require('./config/mongo.js');
require('./config/express.js')(app,db);
app.use(responseTime());
app.get('/',function(req,res){
  res.send('Please select a collection');
});




const PORT = 8080
app.listen(PORT,function(){
  console.log("app is listening on port " + PORT);
})

module.exports = app;
