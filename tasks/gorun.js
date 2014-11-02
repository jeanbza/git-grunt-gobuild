'use strict';

var spawn = require('child_process').spawn;

module.exports = function(grunt) {
    var opts = {
        stdout: function (data) {
            grunt.log.writeln(data);
        },
        stderr: function (data) {
            grunt.log.error(data);
        }
    };

    grunt.registerMultiTask('gorun', 'Run Go programs.', function() {
        var src = this.data.src;
        var proc = spawn('go', ['run', src, '&'], opts);
        var done = this.async();

        console.log('go run '+src+' &');

        proc.on('stdout', function(data) {
            opts.stdout(data);
        });

        proc.on('stderr', function(data) {
            opts.stderr(data);
        });

        proc.on('error', function(err) {
            console.log(err);
        });

        proc.on('exit', function (status) {
            if (status !== 0) {
                grunt.fail.fatal("Failure executing go run with exit code "+status+".");
            }

            done();
        });
    });
};