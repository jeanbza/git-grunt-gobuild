'use strict';

var spawn = require('child_process').spawn;

module.exports = function(grunt) {
    // Internal lib.
    var chalk = require('chalk');

    var opts = {
        stdout: function (data) {
            grunt.log.writeln(data);
        },
        stderr: function (data) {
            grunt.log.error(data);
        }
    };

    function getBinaryFromPath(path) {
        var pathSegments = path.split('/');
        var binary = pathSegments[pathSegments.length-1].replace('.go', '');

        return binary;
    }

    function spawnTasks(done, tasks, opts, finishedCallback) {
        var task = tasks.shift();
        var cmd = task.cmd;
        var args = task.args;
        var commandText = cmd+" "+args.join(' ');

        console.log("Executing "+commandText);

        function spawnFunc() {
            var proc = spawn(cmd, args, opts);

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
                    grunt.fail.fatal("Failure executing "+commandText+" with exit code "+status+".");
                }

                if (tasks.length === 0) {
                    finishedCallback();
                    done();
                } else {
                    spawnTasks(done, tasks, opts, finishedCallback)();
                }
            });
        }

        return spawnFunc;
    }

    grunt.registerMultiTask('gocompile', 'Compile Go files.', function() {
        var src = this.data.src;
        var dest = this.data.dest;
        var binary = getBinaryFromPath(src);

        if (this.data.goarch) {
            process.env.GOARCH = this.data.goarch;
        }

        if (this.data.goos) {
            process.env.GOOS = this.data.goos;

            if (this.data.goos === 'windows') {
                binary += ".exe";
            }
        }

        var tasks = [{
            cmd: 'go',
            args: ['build', src]
        }, {
            cmd: 'mv',
            args: [binary, dest]
        }];

        var finishedCallback = function() {
            grunt.log.writeln('File ' + chalk.cyan(src) + ' compiled to ' + chalk.cyan(dest) + '.');
        };

        spawnTasks(this.async(), tasks, opts, finishedCallback)();
    });
};