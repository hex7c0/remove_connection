'use strict';
/**
 * @file remove_connection main
 * @module remove_connection
 * @subpackage main
 * @version 0.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * functions
 */
/**
 * set shouldKeepAlive property as static setter/getter
 * 
 * @private
 * @function __valueOverride
 * @param {Object} res - response to client
 */
function __valueOverride(res) {

  // res.shouldKeepAlive = false; // static setter

  // block sendDate
  Object.defineProperty(res, 'shouldKeepAlive', {
    configurable: false,
    enumerable: false, // remove undefined
    get: function() {

      return false;
    },
    set: function() {

      return; // ignore setter
    }
  });

  return;
}

/**
 * set header(s) property as static setter/getter
 * 
 * @private
 * @function __headerOverride
 * @param {Object} res - response to client
 */
function __headerOverride(res) {

  res.setHeader('Connection', null); // populate headers

  Object.defineProperty(res._headers, 'connection', { // value
    configurable: false,
    enumerable: false, // remove undefined
    get: function() {

      return;
    },
    set: function() {

      return;
    }
  });
  Object.defineProperty(res._headerNames, 'connection', { // key
    configurable: false,
    enumerable: false, // remove undefined
    get: function() {

      return;
    },
    set: function() {

      return;
    }
  });
  if (res._removedHeader !== undefined) { // node > 0.10
    Object.defineProperty(res._removedHeader, 'connection', { // flag
      configurable: false,
      enumerable: false, // remove undefined
      get: function() {

        return true; // force remove this header
      },
      set: function() {

        return;
      }
    });
  }

  return;
}

/**
 * remove connection header from response as function
 * 
 * @public
 * @function setConnection
 * @param {Object} res - response to client
 * @param {Boolean} [setHeader] - setHeader block
 */
function setConnection(res, setHeader) {

  __valueOverride(res);

  if (setHeader === true) { // block setHeader
    __headerOverride(res);
  }

  return;
}
module.exports = setConnection;

/**
 * remove connection header from response as middleware. builder
 * 
 * @public
 * @function setConnectionMiddleware
 * @param {Boolean} [setHeader] - setHeader block
 * @return {Function}
 */
function setConnectionMiddleware(setHeader) {

  if (setHeader === true) { // block setHeader
    return function setConnection(req, res, next) {

      __valueOverride(res);

      __headerOverride(res);

      return next();
    };
  }

  return function setConnection(req, res, next) {

    __valueOverride(res);

    return next();
  };
}
module.exports.setConnectionMiddleware = setConnectionMiddleware;
