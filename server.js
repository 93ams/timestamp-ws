'use strict';

var express = require('express');

var app = express();
var routes = require('./app/routes/index.js')(app);

var local_path = process.cwd();

var public_path = local_path + '/public';

app.use('/public', express.static(public_path));

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});