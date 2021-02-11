
var supertest = require('supertest');
const assert = require('assert');

describe('Analytics', function() {

  describe('retrieveDataValid()', function() {
    it('should retrieve all data in hour surrounding 8.50 on Tue Feb 11 2021', function (done) {
      supertest(sails.hooks.http.app)
      .get('/analytics?timestamp=1581454200000')
      .expect(function(res) {
        assert(res.body.clicks === 2)
        assert(res.body.impressions === 1);
      })
      .end(done)
    });
  });

  describe('retrieveDataNoParam()', function() {
    it('should return error for no parameters', function (done) {
      supertest(sails.hooks.http.app)
      .get('/analytics')
      .expect(400)
      .end(done)
    });
  });

  describe('retrieveDataInvalid()', function() {
    it('should retrieve all data in hour surrounding 8.50 on Tue Feb 11 2021', function (done) {
      supertest(sails.hooks.http.app)
      .get('/analytics?timestamp=aaa')
      .expect(400)
      .end(done)
    });
  });

  describe('retrieveDataValidButNoData()', function() {
    it('should retrieve all data from a timestamp that has no data', function (done) {
      supertest(sails.hooks.http.app)
      .get('/analytics?timestamp=1583860859000')
      .expect(function(res) {
        assert(res.body.clicks === 0);
        assert(res.body.impressions === 0);
      })
      .end(done)
    });
  });

  describe('retrieveDataHourEdgeCase()', function() {
    it('A call returns timestamps up to but not including the following hour', function (done) {
      supertest(sails.hooks.http.app)
      .get('/analytics?timestamp=1514811599999')
      .expect(function(res) {
        assert(res.body.impressions === 1);
      })
      .end(done)
    });

    it('A call returns all timestamps greater than and including the preceding hour mark', function (done) {
      supertest(sails.hooks.http.app)
      .get('/analytics?timestamp=1514811600001')
      .expect(function(res) {
        assert(res.body.impressions === 2);
      })
      .end(done)
    });
  });

});