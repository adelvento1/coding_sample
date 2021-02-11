
var supertest = require('supertest');

describe('Analytics', function() {

  describe('storeData()', function() {
    it('should store data', function () {
      supertest(sails.hooks.http.app)
      .post('/analytics')
      .send({ timestamp: 1613076600000, user: '24574', event: 'click' })
      .expect(204)
    });
  });

  describe('storeInvalidTimestampData()', function() {
    it('should return type error on timestamp variable', function () {
      supertest(sails.hooks.http.app)
      .post('/analytics')
      .send({ timestamp: '1613076600000', user: '24684', event: 'impression' })
      .expect(400)
    });
  });

  describe('storeInvalidUserData()', function() {
    it('should return type error on user variable', function () {
      supertest(sails.hooks.http.app)
      .post('/analytics')
      .send({ timestamp: 1613076600000, user: 24684, event: 'impression' })
      .expect(400)
    });
  });

  describe('storeNoData()', function() {
    it('should return error since there is no data', function () {
      supertest(sails.hooks.http.app)
      .post('/analytics')
      .send({ timestamp: null, user: null, event: null })
      .expect(400)
    });
  });

  describe('missingEvent()', function() {
    it('should return error since there is no event', function () {
      supertest(sails.hooks.http.app)
      .post('/analytics')
      .send({ timestamp: 1612999320000, user: 24684 })
      .expect(400)
    });
  });

});