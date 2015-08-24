'use strict';
/**
 * @file basic test
 * @module remove_connection
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var setConnection = require('..').setConnectionMiddleware;
var assert = require('assert');
var express = require('express');
var request = require('supertest');

/*
 * test module
 */
describe('middleware', function() {

  var app;

  describe('normal', function() {

    before(function(done) {

      app = express();
      app.get('/', function(req, res) {

        res.end();
      });
      done();
    });
    it('should get "Connection" header', function(done) {

      request(app).get('/').expect(200).end(function(err, res) {

        assert.equal(err, null);
        assert.equal(res.header['undefined'], undefined);
        assert.notEqual(res.header.connection, undefined);
        assert.notEqual(res.headers.connection, undefined);
        done();
      });
    });
  });

  describe('remove', function() {

    before(function(done) {

      app = express();
      app.use(setConnection()).get('/', function(req, res) {

        res.end();
      });
      done();
    });
    it('shouldn\'t get "Connection" header', function(done) {

      request(app).get('/').expect(200).end(function(err, res) {

        assert.equal(err, null);
        assert.equal(res.header['undefined'], undefined);
        assert.equal(res.header.connection, 'close');
        assert.equal(res.headers.connection, 'close');
        done();
      });
    });
  });

  describe('try to modify', function() {

    before(function(done) {

      app = express();
      app.use(setConnection(true)).get('/', function(req, res) {

        res.end();
      });
      done();
    });
    it('shouldn\'t get "Connection" header, after `res.shouldKeepAlive`',
      function(done) {

        request(app).get('/').expect(200).end(
          function(err, res) {

            assert.equal(err, null);
            assert.equal(res.header['undefined'], undefined);
            assert.ok(res.header.connection == undefined || 'close',
              'node@~0.10');
            assert.ok(res.headers.connection == undefined || 'close',
              'node@~0.10');
            done();
          });
      });

    before(function(done) {

      app = express();
      app.use(setConnection(true)).get('/', function(req, res) {

        Object.defineProperty(res, 'shouldKeepAlive', {
          configurable: true,
          enumerable: true,
          get: function() {

            return true;
          },
        });
        res.end();
      });
      done();
    });
    it('shouldn\'t get "Connection" header, after `Object.defineProperty`',
      function(done) {

        request(app).get('/').expect(200).end(
          function(err, res) {

            assert.equal(err, null);
            assert.equal(res.header['undefined'], undefined);
            assert.ok(res.header.connection == undefined || 'close',
              'node@~0.10');
            assert.ok(res.headers.connection == undefined || 'close',
              'node@~0.10');
            done();
          });
      });

    before(function(done) {

      app = express();
      app.use(setConnection(true)).get('/', function(req, res) {

        res.setHeader('Connection', 'ciao');
        res.end();
      });
      done();
    });
    it('shouldn\'t get "Connection" header, after `res.setHeader`',
      function(done) {

        request(app).get('/').expect(200).end(
          function(err, res) {

            assert.equal(err, null);
            assert.equal(res.header['undefined'], undefined);
            assert.ok(res.header.connection == undefined || 'close',
              'node@~0.10');
            assert.ok(res.headers.connection == undefined || 'close',
              'node@~0.10');
            done();
          });
      });
  });
});
