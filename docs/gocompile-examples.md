# Usage Examples

## Basic compilation

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

## Compile with goarch and goos

```javascript
gocompile: {
  first: {
    src: "main.go",
    dest: "my_executable.exe",
    goarch: 386,
    goos: windows
  }
}
```