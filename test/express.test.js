var superagent = require('superagent');
var expect = require('expect.js');

describe('Express Rest API Service', function() {
  var id;
  it('Post an object', function(done) {
    superagent.post('http://localhost:8080/collection/test')
      .send({"name":"Carlo Khanati","email":"carlo.khanati@gmail.com"})
      .end(function(e,res) {
        expect(e).to.eql(null);
        expect(res.body.length).to.eql(1);
        expect(res.body[0]._id.length).to.eql(24);
        id=res.body[0]._id;
        done();
      });
  });
  it('Retrieve a collection', function(done) {
    superagent.get('http://localhost:8080/collection/test')
      .end(function(e,res) {
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function(item){return item._id;})).to.contain(id);
        done();
      });
  });
  it('Update an Object', function(done) {
    superagent.put('http://localhost:8080/collection/test/'+id).send({name:"show me"})
      .end(function(e,res) {
        expect(e).to.eql(null);
        expect(typeof(res.body)).to.eql("object");
        expect(res.body.message).to.eql("success");
        done();
      });
  });
  it('Check Update an Object', function(done) {
    superagent.get('http://localhost:8080/collection/test/'+id).send({name:"show me"})
      .end(function(e,res) {
        expect(e).to.eql(null);
        expect(typeof(res.body)).to.eql("object");
        expect(res.body._id.length).to.eql(24);
        expect(res.body.name).to.eql("show me");
        done();
      });
  });
  it('Delete an Object', function(done) {
    superagent.del('http://localhost:8080/collection/test/'+id)
      .end(function(e,res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(typeof(res.body)).to.eql("object");
        expect(res.body.message).to.eql("success");
        done();
      });
  });
  it('Check Deleted Object', function(done) {
    superagent.get('http://localhost:8080/collection/test/')
      .end(function(e,res) {
        expect(e).to.eql(null);
        expect(res.body.map(function(item){return item._id;})).to.not.be(id);
        done();
      });
  });
})
