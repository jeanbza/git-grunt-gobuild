'use strict';

var chalk = require('chalk');
var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = function(grunt) {
    var pidFile = "gorun.pid";
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
        var done = this.async();
        var src = this.data.src;
        var commandText = "go run "+src;
        process.env.GOOS="darwin";

        var proc = spawn('go', ['run', src], opts);
        proc.unref();

        fs.appendFile(pidFile, proc.pid, function (err) {
            if (err) {
                throw err;
            }

            grunt.log.writeln('The pid of the process '+chalk.cyan(commandText)+' was appended to '+chalk.cyan(pidFile)+'.');
        });

        proc.on('exit', function (status) {
            if (status !== 0) {
                grunt.fail.fatal("Failure executing go run with exit code "+status+".");
            }

            done();
        });
    });
};