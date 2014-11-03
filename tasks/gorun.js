'use strict';

var chalk = require('chalk');
var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = function(grunt) {
    var pidFile = "gorun.pid";
    var opts = {
        stdout: function (data) {
            grunt.log.writeln(data);
        },
        stderr: function (data) {
            grunt.log.error(data);
        },
        detached: true,
        stdio: [ 'ignore', process.stdin, process.stdout ]
    };

    grunt.registerMultiTask('gorun', 'Run Go programs.', function() {
        var done = this.async();
        var src = this.data.src;
        var commandText = "go run "+src;
        process.env.GOOS="darwin";

        var proc = spawn('go', ['run', src], opts);
        proc.unref();

        done();
    });
};