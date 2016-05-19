'use strict';

/**
 *
 */

var express = require('express');
var port = process.env.PORT || 3008;
var app = express();

app.use( express.static(__dirname) );

app.listen(port, function () {
  console.log('app listening on port %d', port);
});
