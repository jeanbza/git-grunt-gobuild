'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var shelljs = require('shelljs');

  grunt.registerMultiTask('gocompile', 'Compile Go files.', function() {
    for (var src in this.data) {
      var dest = this.data[src];
      var binary = src.substring(0, src.length-3);
      console.dir(binary);

      shelljs.exec('go build '+src);
      shelljs.exec('mv '+binary+' '+dest)
    }
  });
};