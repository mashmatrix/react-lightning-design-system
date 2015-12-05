#!/usr/bin/env node
var path = require('path');
var express = require('express');
var enchilada = require('enchilada');
var babelify = require('babelify');
var lessMiddleware = require('less-middleware');

var port = process.env.PORT || 3000;

var server = express();
server.use('/assets', express.static(path.join(__dirname, '../bower_components/salesforce-lightning-design-system/assets')));

server.use(enchilada({
  src: path.join(__dirname, '../client'),
  transforms: [
    babelify.configure({ optional: [ 'runtime', 'es7.objectRestSpread' ] }),
  ],
  debug: true
}));
server.use(lessMiddleware(path.join(__dirname, '../client'), {
  debug: true,
  dest: path.join(__dirname, '../.tmp')
}));

server.use(express.static(path.join(__dirname, '../.tmp')));
server.use(express.static(path.join(__dirname, '../public')));

server.listen(port, function() {
  console.log('App server started : http://localhost:' + port);
});
