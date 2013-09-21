module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-html2js');

  // Default tasks
  grunt.registerTask('default', ['jshint', 'build']);
  grunt.registerTask('build', ['clean', 'jade', 'html2js', 'concat', 'stylus:build', 'copy:assets']);
  grunt.registerTask('release', ['clean', 'jade', 'html2js', 'uglify', 'jshint', 'concat:index', 'concat:vendor', 'stylus:build', 'copy:assets']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
      '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
      ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['src/**/*.js', '<%= distdir %>/templates/**/*.js'],
      jade: ['src/views/**/*.jade'],
      stylus: ['src/styles/**/*.styl'],
      html: {
        partials: ['src/views/**/*.html', '!src/views/index.html'],
        index: ['src/views/index.html']
      }
    },
    clean: ['<%= distdir %>/*', '<%= src.html.partials %>', '<%= src.html.index %>'],
    copy: {
      assets: {
        files: [{dest: '<%= distdir %>', src: '**', expand: true, cwd: 'src/assets/'}]
      }
    },
    concat: {
      dist: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['<%= src.js %>'],
        dest:'<%= distdir %>/js/<%= pkg.name %>.js'
      },
      index: {
        src: ['<%= src.html.index %>'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      vendor: {
        files: [
          {src: 'vendor/angular/*.js', dest: '<%= distdir %>/js/angular.js'},
          {src: 'vendor/angular-plugins/*.js', dest: '<%= distdir %>/js/angular-plugins.js'},
          {src: 'vendor/angular-ui/*.js', dest: '<%= distdir %>/js/angular-ui.js'},
          {src: 'vendor/jquery/*.js', dest: '<%= distdir %>/js/jquery.js'},
          {src: 'vendor/bootstrap/*.js', dest: '<%= distdir %>/js/bootstrap.js'},
        ]
      }
    },
    html2js: {
      views: {
        options: {
          base: 'src/views'
        },
        src: ['<%= src.html.partials %>'],
        dest: '<%= distdir %>/templates/views.js',
        module: 'templates.views'
      }
    },
    watch: {
      all: {
        files: ['<%= src.js %>', '<%= src.jade %>', '<%= src.stylus %>'],
        tasks: ['default', 'timestamp']
      },
      build: {
        files: ['<%= src.js %>', '<%= src.jade %>', '<%= src.stylus %>'],
        tasks: ['build', 'timestamp']
      }
    },
    jade: {
      compile: {
        src: ['<%= src.jade %>'],
        expand: true,
        ext: '.html'
      }
    },
    stylus: {
      build: {
        files: [
          {src: ['<%= src.stylus %>'], dest:'<%= distdir %>/css/<%= pkg.name %>.css'}
        ]
      }
    },
    uglify: {
      dist: {
        options: {
          banner: '<%= banner %>',
          sourceMap: '<%= distdir %>/js/<%= pkg.name %>.js.map',
          sourceMappingURL: '<%= pkg.name %>.js.map'
        },
        src: ['<%= src.js %>'],
        dest:'<%= distdir %>/js/<%= pkg.name %>.js'
      },
    },
    jshint: {
      files: ['Gruntfile.js', '<%= src.js %>'],
      options: {
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    }
  });
};
