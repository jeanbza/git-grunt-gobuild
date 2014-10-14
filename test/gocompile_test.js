'use strict';

var grunt = require('grunt');
var shelljs = require('shelljs');

exports.gocompile = {
  basic: function(test) {
    test.expect(1);

    shelljs.exec('test/tmp/basic');

    var expect = grunt.file.read('test/expected/basic');
    var result = grunt.file.read('test/tmp/basic_out');
    test.equal(expect, result, 'should compile and run go program');

    test.done();
  }
};