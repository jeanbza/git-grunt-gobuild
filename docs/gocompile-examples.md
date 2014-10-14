# Usage Examples

## Compile a Go program into a binary

```go
gocompile: {
  first: {
    files: {
      'main.go': 'binary_one',
    }
  },
  second: {
    files: {
      'other.go': 'binary_two'
    }
  }
}
```