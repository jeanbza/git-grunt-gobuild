Compile Go programs inline as a Grunt task.

# Testing
Please note that some tests require you to have bootstrapped the amd64 and i386 architectures. If you have not done so already, do the following:

```bash
cd $GOROOT/src
GOARCH=386 ./make.bash   # May need to sudo
GOARCH=amd64 ./make.bash # May need to sudo
```