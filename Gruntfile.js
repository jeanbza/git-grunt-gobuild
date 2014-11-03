'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    gobuild: {
      basic: {
        src: 'test/fixtures/gobuild_basic.go',
        dest: 'test/tmp/gobuild_basic'
      },
      goarch1: {
        src: 'test/fixtures/goarch.go',
        dest: 'test/tmp/goarch1',
        goarch: '386'
      },
      goarch2: {
        src: 'test/fixtures/goarch.go',
        dest: 'test/tmp/goarch2',
        goarch: 'amd64'
      },
      goos1: {
        src: 'test/fixtures/goos.go',
        dest: 'test/tmp/goos1',
        goos: 'darwin'
      },
      goos2: {
        src: 'test/fixtures/goos.go',
        dest: 'test/tmp/goos2.exe',
        goos: 'windows'
      }
    },
    gorun: {
      basic: {
        src: 'test/fixtures/gorun_basic.go'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['test/tmp/*']
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/gobuild_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  // NOTE: We run the task twice to check for file overwrite issues.
  grunt.registerTask('test', ['jshint', 'clean', 'gobuild', 'gorun', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};