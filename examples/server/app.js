#!/usr/bin/env node
var path = require('path');
var express = require('express');
var browserify = require('browserify-middleware');
var babelify = require('babelify');
var lessMiddleware = require('less-middleware');

var port = process.env.PORT || 3000;

var server = express();
server.use('/assets', express.static(path.join(__dirname, '../node_modules/@salesforce-ux/design-system/assets')));

server.use(browserify(path.join(__dirname, '../client'), {
  transform: [babelify],
  cache: false,
  debug: true
}));

server.use(lessMiddleware(path.join(__dirname, '../client'), {
  dest: path.join(__dirname, '../.tmp'),
  debug: true
}));

server.use(express.static(path.join(__dirname, '../.tmp')));
server.use(express.static(path.join(__dirname, '../public')));

server.listen(port, function() {
  console.log('App server started : http://localhost:' + port);
});
