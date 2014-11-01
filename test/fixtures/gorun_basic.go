package main

import (
  "net/http"
)

func main() {
    http.HandleFunc("/foo", foo)
    http.ListenAndServe(":3000", nil)
}

func foo(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("bar"))
}