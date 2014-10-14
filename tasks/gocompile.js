'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var shelljs = require('shelljs');
  var chalk = require('chalk');

  grunt.registerMultiTask('gocompile', 'Compile Go files.', function() {
    for (var src in this.data.files) {
      var dest = this.data[src];
      var binary = src.substring(0, src.length-3);

      shelljs.exec('go build '+src);
      shelljs.exec('mv '+binary+' '+dest);

      grunt.log.writeln('File ' + chalk.cyan(src) + ' compiled to ' + chalk.cyan(dest) + '.');
    }
  });
};