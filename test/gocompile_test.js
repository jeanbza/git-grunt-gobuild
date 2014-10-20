'use strict';

var grunt = require('grunt');
var child_process = require('child_process');

exports.gocompile = {
    basic: function(test) {
        test.expect(1);

        var proc = child_process.execFile('./basic', [], {
            cwd: 'test/tmp/'
        }, function() {
            var expect = grunt.file.read('test/expected/basic');
            var result = grunt.file.read('test/tmp/basic_out');
            test.equal(expect, result, 'should compile and run go program');

            test.done();
        });
    }
};