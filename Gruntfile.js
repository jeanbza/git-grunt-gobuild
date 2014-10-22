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

    gocompile: {
      basic: {
        src: 'test/fixtures/basic.go',
        dest: 'test/tmp/basic'
      },
      flags: {
        src: 'test/fixtures/flags.go',
        dest: 'test/tmp/flags',
        flags: {
          foo: "hello",
          bar: "world"
        }
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['test/tmp/*']
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
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
  grunt.registerTask('test', ['jshint', 'clean', 'gocompile', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};