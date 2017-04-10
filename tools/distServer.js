var express = require('express');
var path = require('path');
var open = require('open');

/* eslint-disable no-console */

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static('dist'));

app.use('/productsApi', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/api/products/products.json'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});