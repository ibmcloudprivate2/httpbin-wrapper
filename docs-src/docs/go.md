
## setup go 

- Visit the official Go [downloads](https://golang.org/dl/) page and find the URL for the current binary release's tarball, along with its SHA256 hash.

```
cd ~
curl -O https://dl.google.com/go/go1.12.7.linux-amd64.tar.gz
sha256sum  go1.12.7.linux-amd64.tar.gz
```

- extract the tarball

```
tar xvf go1.12.7.linux-amd64.tar.gz
```

- Recursively change go's owner and group to root, and move it to /usr/local

```
sudo chown -R root:root ./go
sudo mv go /usr/local
```

**Note**: Although /usr/local/go is the officially-recommended location, some users may prefer or require different paths.

- set some paths in your environment

```
sudo vi ~/.profile
```

At the end of the file, add this line:

```
export GOPATH=$HOME/work
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
```

- refresh your profile by running

```
source ~/.profile
```

- Create a new directory for your Go workspace, which is where Go will build its files

```
mkdir $HOME/work
```

- create a directory hierarchy in this folder through this command in order for you to create your test file. You can replace the value <span style="color:red">**user**</span> with your GitHub username if you plan to use Git to commit and store your Go code on GitHub

```
mkdir -p work/src/github.com/user/hello
```

- create a sample "hello world" go file.

```
touch ~/work/src/github.com/user/hello/hello.go
```

- copy the following into the hello.go file

```
package main

import "fmt"

func main() {
    fmt.Printf("hello, world\n")
}
```

- compile it by invoking the Go command install

```
go install github.com/user/hello
```

- With the file compiled, you can run it by simply executing the command

```
hello
```

- You can see where the compiled hello binary is installed by using the which command

```
which hello
```

You are all set to develop go.
