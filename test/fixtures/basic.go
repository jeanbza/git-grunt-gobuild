package main

import (
    "os"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    f, err := os.Create("basic_out")
    check(err)

    defer f.Close()

    d1 := []byte("hello\ngo\n")

    _, err = f.Write(d1)
    check(err)
}