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

## Compile with goarch

```javascript
gocompile: {
  first: {
    src: "main.go",
    dest: "binary_one",
    goarch: 386
  },
  second: {
    src: "some/location/other.go",
    dest: "/tmp/binary_two"
  }
}
```