const supertest = require('supertest');
const app = require('../express');
const api = supertest(app);
const test = require('tape');

  test('GET /collection/test', function(t){
    api
      .get('/collection/test')
      .expect('Content-Type',/json/)
      .expect(200)
      .end(function (err,res) {
        if (err) {t.fail(err); t.end()}
          t.ok(res.body.length,"should have array");
          t.equal(res.body[0]._id.length,24,"length 24");
          t.end();
      });
  });
