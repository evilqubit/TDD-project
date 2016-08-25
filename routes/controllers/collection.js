var express = require('express');
var router = express.Router();
var db = require('../../config/mongo.js').getDB();
router.route('/:collectionName')
  .all(function(req,res,next) {
    req.collection = db.collection(req.params.collectionName);
    return next();
  })
  .get(function(req,res,next) {
  req.collection.find({},{limit:10,sort:{'_id':-1}}).toArray(function(e,results) {
    if (e) return next(e);
    res.send(results).end();
  });
  })
  .post(function(req,res,next) {
  req.collection.insert(req.body,{},function(e, results) {
      if (e) return next(e);
      res.status(201).send(results);
  })
});
router.route('/:collectionName/:id')
  .all(function(req,res,next) {
    req.collection = db.collection(req.params.collectionName);
    return next();
  })
  .get(function(req,res,next) {
    var id = req.params.id;
    req.collection.findById(id,function(e,results) {
      if (e) return next(e);
      res.send(results).end();
    });
  })

  .put(function(req,res,next) {
    var id = req.params.id;
    req.collection.updateById(id,{$set:req.body},{save:true,multi:false},function(e,results) {
      if (e) return next(e);
      res.send(results===1 ? {message:"success"}:{message:"Failure"}).end();
    });
  })

  .delete(function(req,res,next) {
    var id = req.params.id;
    req.collection.removeById(id,function(e,results) {
      if (e) return next(e);
      res.status(200);
      res.send(results===1 ? {message:"success"}:{message:"Failure"}).end();
    });
});

module.exports = router;
