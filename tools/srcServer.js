var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('../webpack.config');
var open = require('open');

/* eslint-disable no-console */

var port = process.env.PORT || 3000;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/productsApi', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/api/products/products.json'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
