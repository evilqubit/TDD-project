var express = require('express');
var mongoSkin = require('mongoskin');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));

var db = mongoSkin.db('mongodb://192.168.99.100:32768',{safe:true});

app.param('collectionName',function(req,res,next,collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});

app.get('/',function(req,res){
  res.send('Please select a collection');
});

app.get('/collection/:collectionName',function(req,res,next) {
  var data = req.collection.find({},{limit:10,sort:{'_id':-1}}).toArray(function(e,results) {
    if (e) return next(e);
    res.send(results).end();
  });
});

app.post('/collection/:collectionName',function(req,res,next) {
  req.collection.insert(req.body,{},function(e, results) {
      if (e) return next(e);
      res.status(201).send(results);
  })
});

app.listen(8080,function(){
  console.log("app is listening on port 8080")
})
