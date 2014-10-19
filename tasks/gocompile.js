'use strict';

var spawn = require('child_process').spawn;

module.exports = function(grunt) {
    // Internal lib.
    var shelljs = require('shelljs');
    var chalk = require('chalk');

    var opts = {
        stdout: function (data) {
            grunt.log.writeln(data);
        },
        stderr: function (data) {
            grunt.log.error(data);
        }
    };

    function spawnTasks(done, tasks, opts, finishedCallback) {
        var task = tasks.shift();
        var cmd = task.cmd;
        var args = task.args;

        console.log("Executing "+cmd+" "+args.join(' '));

        function spawnFunc() {
            var proc = spawn(cmd, args, opts);

            proc.on('stdout', function(data) {
                opts.stdout(data);
            });

            proc.on('stderr', function(data) {
                opts.stderr(data);
            });

            proc.on('exit', function (status) {
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
        var binary = shelljs.exec('basename ' + this.data.src).output.replace('.go\n', '');

        var tasks = [{
            cmd: 'go',
            args: ['build', this.data.src]
        }, {
            cmd: 'mv',
            args: [binary, this.data.dest]
        }];

        var src = this.data.src;
        var dest = this.data.dest;
        var finishedCallback = function() {
            grunt.log.writeln('File ' + chalk.cyan(src) + ' compiled to ' + chalk.cyan(dest) + '.');
        };

        spawnTasks(this.async(), tasks, opts, finishedCallback)();
    });
};