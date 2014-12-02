# git-grunt-gobuild v0.2.2

[![Build Status](https://travis-ci.org/jadekler/git-grunt-gobuild.svg)](https://travis-ci.org/jadekler/git-grunt-gobuild)

> Compile Go files



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install git-grunt-gobuild --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('git-grunt-gobuild');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-cssmin/tree/grunt-0.3-stable).*

#### Related projects
Also check out [gorun](https://github.com/jadekler/git-grunt-gorun) and [gostop](https://github.com/jadekler/git-grunt-gostop) for other go/grunt modules.


## Gobuild task
_Run this task with the `grunt gobuild` command._

Compile Go programs inline as a Grunt task.

### Testing
Please note that some tests require you to have bootstrapped the amd64 and i386 architectures. If you have not done so already, do the following:

```bash
cd $GOROOT/src
GOARCH=386 ./make.bash   # May need to sudo
GOARCH=amd64 ./make.bash # May need to sudo
GOOS=darwin ./make.bash  # May need to sudo
GOOS=windows ./make.bash # May need to sudo
```
### Options

###### src
Set to your go file with func main().

###### dest
The destination binary (with binary name included).

###### goarch and goos
The architecture / OS to build for. See [the chart here](https://golang.org/doc/install/source) for reference. Leave undefined for the default architecture / OS on your system.
### Usage Examples

#### Basic compilation

```javascript
gobuild: {
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

#### Compile with goarch and goos

```javascript
gobuild: {
  first: {
    src: "main.go",
    dest: "my_executable.exe",
    goarch: 386,
    goos: windows
  }
}
```

## Release History

 * 2014-10-13   v0.2.2   Updated readme with related projects.
 * 2014-10-13   v0.2.1   Simplified gobuild process with the -o flag.
 * 2014-10-13   v0.2.0   Formally changed the project to gobuild, and split out [gorun to separate project](git@github.com:jadekler/git-grunt-gorun.git).
 * 2014-10-13   v0.1.0   Initial commit with basic functionality - Go Build.

---

Task submitted by [Jean de Klerk](jeandeklerk.com)

*This file was generated on Tue Dec 02 2014 14:20:15.*
