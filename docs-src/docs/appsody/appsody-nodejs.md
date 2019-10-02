

in the previous tutorial, you learned about the application development cycle with nodejs where you goes through

1. write your app and test codes 
2. test the nodejs
3. dockerise your app
4. test the dockerise app
5. 

in the directory where server.js located, run

```
appsody init nodejs none
```

## hot reload


## test the app

```
appsody run --docker-options "-e CONTAINER_PORT=3000 -e TARGET_URL=https://httpbin.org/ -e TARGET_URI=delay/1" -p 5000:3000
```

### read env from file

```
appsody run --docker-options "--env-file .env"
```

## app metrics

## deploy to k8s


# request for stack

- DART



