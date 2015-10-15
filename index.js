var express = require('express'),
	_ 		= require('lodash');


var app = express();

/* Environment Variables */
var env = (function() {
	var e = {};
	e.lifecycle = (process.env.NODE_ENV || 'production').toUpperCase();
	e.port = process.env.PORT || 3000;
	e.root = (e.lifecycle === 'production' ? 'dist' : 'src');
	return e;
})(process.env);

/* Static Routing */
app.use('/bower_components', express.static('bower_components'));
app.use('/assets', express.static('assets'));	
app.use(express.static(env.root));

app.listen(env.port);