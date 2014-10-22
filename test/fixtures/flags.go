package main

import (
    "fmt"
    "os"
    "flag"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    flagString1 := flag.String("foo", "THIS SHOULD HAVE BEEN REPLACED - #1", "Flag string 1")
    flagString2 := flag.String("bar", "THIS SHOULD HAVE BEEN REPLACED - #2", "Flag string 1")
    flag.Parse()

    f, err := os.Create("flags_out")
    check(err)

    defer f.Close()

    d1 := []byte(fmt.Sprintf("%s %s", *flagString1, *flagString2))

    _, err = f.Write(d1)
    check(err)
}