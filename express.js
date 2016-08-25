var express = require('express');
var mongoSkin = require('mongoskin');
var bodyParser = require('body-parser');
var logger = require('morgan');
var Pokedex = require('pokedex-promise-v2');

var P = new Pokedex();
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
  req.collection.find({},{limit:10,sort:{'_id':-1}}).toArray(function(e,results) {
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

app.get('/collection/:collectionName/:id',function(req,res,next) {
  var id = req.params.id;
  req.collection.findById(id,function(e,results) {
    if (e) return next(e);
    res.send(results).end();
  });
});

app.put('/collection/:collectionName/:id',function(req,res,next) {
  var id = req.params.id;
  req.collection.updateById(id,{$set:req.body},{save:true,multi:false},function(e,results) {
    if (e) return next(e);
    res.send(results===1 ? {message:"success"}:{message:"Failure"}).end();
  });
});

app.delete('/collection/:collectionName/:id',function(req,res,next) {
  var id = req.params.id;
  req.collection.removeById(id,function(e,results) {
    if (e) return next(e);
    res.status(200);
    res.send(results===1 ? {message:"success"}:{message:"Failure"}).end();
  });
});

app.get('/pokemon/:collectionName/:name', function(req,res,next) {
  P.getPokemonByName(req.params.name) // with Promise
    .then(function(response) {
      response.types.forEach((type) => {
        req.collection.insert({"name":req.params.name,"type":type.type.name},{},function(e, results) {
            if (e) return next(e);
        });
      })
      res.status(201).send({"message":"Added"});

    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
});

const PORT = 8080
app.listen(PORT,function(){
  console.log("app is listening on port " + PORT);
})
