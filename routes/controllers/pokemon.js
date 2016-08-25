var express = require('express');
var router = express.Router();
var db = require('../../config/mongo.js').getDB();
var Pokedex = require('pokedex-promise-v2');

var P = new Pokedex();
router.route('/:collectionName/:name')
  .all(function(req,res,next) {
    req.collection = db.collection(req.params.collectionName);
    return next();
  })
  .get( function(req,res,next) {
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

module.exports = router;
