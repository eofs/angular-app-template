/* jslint node: true */
'use strict';

// Module dependencies
var _ = require('lodash');
var util = require('util');

// Default configuration values
var config = require('../settings.js');


// Merge defaults and local values
try {
  var locals = require('../settings_local.js');
  _.merge(config, locals);
} catch(err) {
  util.log('Could not load local configuration file. Using defaults.');
}

module.exports = config;
