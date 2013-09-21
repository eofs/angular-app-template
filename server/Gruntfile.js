/* jslint node: true */
'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default tasks
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('supervise', 'Run using Supervisor', function() {
    // Switch to asynchronous mode
    this.async();
    require('supervisor').run(['app.js']);
  });

  // Project configuration
  grunt.initConfig({
    src: {
      js: ['Gruntfile.js', 'app.js', 'settings.js', 'lib/**/*.js']
    },
    jshint: {
      files: ['<%= src.js %>'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        globals: { require: false, __dirname: false, console: false, module: false, exports: false }
      }
    }
  });
};
