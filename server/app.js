/* jslint node: true */
'use strict';


var express = require('express');
var http = require('http');
var config = require('./lib/config.js');


var app = express();

require('./lib/routes/static').addRoutes(app, config);

// all environments
app.set('port', process.env.PORT || config.server.port);
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.server.cookieSecret));
app.use(express.session());
app.use(app.router);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

require('./lib/routes/index').addRoutes(app, config);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
