'use strict';

var chalk = require('chalk');
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

    function getBinaryFromPath(path) {
        var pathSegments = path.split('/');
        var binary = pathSegments[pathSegments.length-1].replace('.go', '');

        return binary;
    }

    grunt.registerMultiTask('gobuild', 'Compile Go programs.', function() {
        var done = this.async();
        var src = this.data.src;
        var dest = this.data.dest;
        var binary = getBinaryFromPath(src);
        var commandText = "go build -o "+dest+" "+src;

        console.log("Executing "+commandText);

        if (this.data.goarch) {
            process.env.GOARCH = this.data.goarch;
        }

        if (this.data.goos) {
            process.env.GOOS = this.data.goos;

            if (this.data.goos === 'windows') {
                binary += ".exe";
            }
        }

        var proc = spawn('go', ['build', '-o', dest, src], opts);

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
            
            done();
        });
    });
};