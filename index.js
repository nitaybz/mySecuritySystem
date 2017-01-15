var express = require('express');
var app = express(); 
app.storage = require('node-persist');

// CONFIGURATION
require('./api')(app);

app.listen(1880, function () {
  console.log('Example app listening on port 1880!')
})

app.storage.initSync({
    dir:'./persist',
  });