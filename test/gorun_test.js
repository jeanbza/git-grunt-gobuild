'use strict';

var grunt = require('grunt');
var http = require('http');

exports.gorun = {
    gorunBasic: function(test) {
        test.expect(2);

        var expectedBody = "bar";
        var expectedCode = 200;

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/foo'
        };

        http.get(options, function(res) {
            test.equal(expectedCode, res.statusCode, 'should run and be able to curl running program and receive '+expectedCode+' - instead received '+res.StatusCode);

            res.setEncoding('utf8');
            res.on('data', function (data) {
                test.equal(expectedBody, data, 'should run and be able to curl running program and receive '+expectedBody+' - instead received '+data);
                test.done();
            });
        }).on('error', function(e) {
            test.equal(false, true, 'Got error: ' + e);
            test.equal(false, true, "Second assertion failed because couldn't connect to running go program.");
            test.done();
        });
    }   
};