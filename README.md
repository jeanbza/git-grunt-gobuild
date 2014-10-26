# grunt-contrib-gocompile v0.1.0 [![Build Status](https://travis-ci.org/jadekler/git-grunt-gocompile.svg?branch=master)](https://travis-ci.org/jadekler/git-grunt-gocompile)

> Compile Go files



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-gocompile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-gocompile');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-cssmin/tree/grunt-0.3-stable).*



## Gocompile task
_Run this task with the `grunt gocompile` command._

Compile Go programs inline as a Grunt task.
### Options

To be added!
### Usage Examples

#### Compile a Go program into a binary

```javascript
gocompile: {
  first: {
    src: "main.go",
    dest: "binary_one"
  },
  second: {
    src: "some/location/other.go",
    dest: "/tmp/binary_two"
  }
}
```

## Release History

 * 2014-10-13   v0.1.0   Initial commit with basic functionality - Go Build.

---

Task submitted by [Jean de Klerk](jeandeklerk.com)

*This file was generated on Wed Oct 22 2014 12:18:24.*
