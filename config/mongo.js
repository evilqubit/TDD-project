var mongoSkin = require('mongoskin');
var db = mongoSkin.db('mongodb://192.168.99.100:32768',{safe:true});
function getDB() {
    return db;
}
module.exports = {
  getDB:getDB
}
