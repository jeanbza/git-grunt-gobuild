'use strict';

var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = function(grunt) {
    var out = fs.openSync('./out.log', 'a');
    var err = fs.openSync('./out.log', 'a');
    var opts = {
        stdout: function (data) {
            grunt.log.writeln(data);
        },
        stderr: function (data) {
            grunt.log.error(data);
        },
        detached: true,
        stdio: [ 'ignore', out, err ]
    };

    grunt.registerMultiTask('gorun', 'Run Go programs.', function() {
        var src = this.data.src;
        var commandText = "go run "+src;

        console.log("Executing "+commandText);

        process.env.GOOS="darwin";
        var proc = spawn('go', ['run', src], opts);
        proc.unref();

        var done = this.async();

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
            grunt.log.error(proc.stdout._readableState.buffer);
            grunt.log.error(proc.stderr._readableState.buffer);
            if (status !== 0) {
                grunt.fail.fatal("Failure executing go run with exit code "+status+".");
            }

            done();
        });
    });
};