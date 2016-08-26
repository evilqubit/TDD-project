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

var s


const PORT = 8080
app.listen(PORT,function(){
  console.log("app is listening on port " + PORT);
})

 var async = require('async');
  var age = 10;
  var sex = 'm';
  var name ='';
  var newname ='';
app.get('/promise', function(req, res) {
async.series([
    function(callback) {
        name = 'billy';
        callback();
    },
    function(callback){
      if(age == 10 && sex === 'm' && name === 'billy') {
        newname = 'billy bob';
         callback();
        }
    else{
        callback(new Error('not found'));
    }
       
    },
    function(callback){
         if(newname !== 'billy bob')
             return callback(new Error('test'));
        callback();
    },
    function(callback){
     res.status(200);
      res.send('Take your money bitch');
      res.end();
    }
],function(err){
     res.status(500);
     res.send('err');
     res.end();
});
});

module.exports = app;
