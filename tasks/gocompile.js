'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var shelljs = require('shelljs');
  var chalk = require('chalk');

  grunt.registerMultiTask('gocompile', 'Compile Go files.', function() {
    var binary = shelljs.exec('basename ' + this.data.src).output.replace('.go\n', '');

    shelljs.exec('go build '+this.data.src);
    shelljs.exec('mv '+binary+' '+this.data.dest);

    grunt.log.writeln('File ' + chalk.cyan(this.data.src) + ' compiled to ' + chalk.cyan(this.data.dest) + '.');
  });
};