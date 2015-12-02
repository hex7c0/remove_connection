# [remove_connection](https://github.com/hex7c0/remove_connection)

[![NPM version](https://img.shields.io/npm/v/remove_connection.svg)](https://www.npmjs.com/package/remove_connection)
[![Linux Status](https://img.shields.io/travis/hex7c0/remove_connection.svg?label=linux)](https://travis-ci.org/hex7c0/remove_connection)
[![Windows Status](https://img.shields.io/appveyor/ci/hex7c0/remove_connection.svg?label=windows)](https://ci.appveyor.com/project/hex7c0/remove_connection)
[![Dependency Status](https://img.shields.io/david/hex7c0/remove_connection.svg)](https://david-dm.org/hex7c0/remove_connection)
[![Coveralls](https://img.shields.io/coveralls/hex7c0/remove_connection.svg)](https://coveralls.io/r/hex7c0/remove_connection)

Just a simple hack to remove [Connection header](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Connection) from HTTP(S) response.
Similar to [remove_date](https://github.com/hex7c0/remove_date/)

## Installation

Install through NPM

```bash
npm install remove_connection
```
or
```bash
git clone git://github.com/hex7c0/remove_connection.git
```

## API

inside nodejs project
```js
var setConnection = require('remove_connection');

require('http').createServer(function(req, res) {

  setConnection(res); // remove Connection header from response

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello World\n');
}).listen(3000, '127.0.0.1');
```

as middleware
```js
var setConnection = require('remove_connection').setConnectionMiddleware;
var app = require('express')();

app.use(setConnection()).get('/', function(req, res) {

  res.end('Hello World\n');
}).listen(3000, '127.0.0.1');
```

### setConnection(res [, setHeader])

#### options

 - `res` - **Object** response to client *(default "required")*
 - `setHeader`- **Boolean** setHeader block *(default "optional")*

### setConnectionMiddleware([setHeader])

#### options

 - `setHeader`- **Boolean** setHeader block *(default "optional")*

## Examples

Take a look at my [examples](examples)

### [License GPLv3](LICENSE)
