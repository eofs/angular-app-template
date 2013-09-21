/* jslint node: true */
'use strict';


exports.addRoutes = function(app, config) {
  app.all('/*', function(req, res) {
    res.sendfile('index.html', {root: config.server.distFolder});
  });
};
