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
var setConnection = require('..');
var assert = require('assert');
var http = require('http');
var request = require('supertest');

/*
 * test module
 */
describe('basic', function() {

  var app;

  describe('normal', function() {

    before(function(done) {

      app = http.createServer(function(req, res) {

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
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

      app = http.createServer(function(req, res) {

        setConnection(res);

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
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

      app = http.createServer(function(req, res) {

        setConnection(res);
        res.shouldKeepAlive = true;

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
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
            assert.equal(res.headers.connection, undefined);
            done();
          });
      });

    before(function(done) {

      app = http.createServer(function(req, res) {

        setConnection(res);
        Object.defineProperty(res, 'shouldKeepAlive', {
          configurable: true,
          enumerable: true,
          get: function() {

            return true;
          },
        });

        res.writeHead(200, {
          'Content-Type': 'text/plain'
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
            assert.equal(res.headers.connection, undefined);
            done();
          });
      });

    before(function(done) {

      app = http.createServer(function(req, res) {

        setConnection(res, true);
        res.setHeader('Connection', 'ciao');

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
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
            assert.equal(res.headers.connection, undefined);
            done();
          });
      });
  });
});
