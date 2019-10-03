

in the previous tutorial, you learned about the application development cycle with nodejs where you goes through

1. write your app and test codes 
2. test the nodejs
3. dockerise your app
4. test the dockerise app

In this section we will learn about using Appsody where it will improves the development experience where it has hot reload of your application as you make changes to your app and also comes with app metrics for profiling during development time.

in the directory where server.js located, run, the following command will make exising node.js application for use with appsody.

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

appsody run and appsody debug also injects a development-time only feature that adds a performance monitoring and profiling dashboard using the appmetrics-dash module

This provides a display similar to the following, which provides data for:

- HTTP request responsiveness and HTTP throughput
- Performance of outbound HTTP requests and other requests
- Event Loop latency showing the delay before tasks are scheduled.
- CPU and Memory usage for the process and the system

to access the dashboard, access it using the URI **appmetrics-dash/**

```
http://localhost:5000/appmetrics-dash/
```

## load test

you can use [hey](https://github.com/rakyll/hey) to do a load test and get similar result below.


```
$ hey http://localhost:5000

Summary:
  Total:        7.7418 secs
  Slowest:      2.2496 secs
  Fastest:      1.7412 secs
  Average:      1.9158 secs
  Requests/sec: 25.8337

  Total data:	35400 bytes
  Size/request:	177 bytes

Response time histogram:
  1.741 [1]   |■
  1.792 [27]  |■■■■■■■■■■■■■■■■
  1.843 [69]  |■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  1.894 [43]  |■■■■■■■■■■■■■■■■■■■■■■■■■
  1.945 [7]   |■■■■
  1.995 [3]   |■■
  2.046 [0]   |
  2.097 [0]   |
  2.148 [18]  |■■■■■■■■■■
  2.199 [21]  |■■■■■■■■■■■■
  2.250 [11]  |■■■■■■


Latency distribution:
  10% in 1.7877 secs
  25% in 1.8085 secs
  50% in 1.8452 secs
  75% in 2.1152 secs
  90% in 2.1755 secs
  95% in 2.2044 secs
  99% in 2.2495 secs

Details (average, fastest, slowest):
  DNS+dialup:	0.0017 secs, 1.7412 secs, 2.2496 secs
  DNS-lookup:	0.0005 secs, 0.0000 secs, 0.0039 secs
  req write:	0.0001 secs, 0.0000 secs, 0.0010 secs
  resp wait:	1.9138 secs, 1.7411 secs, 2.2408 secs
  resp read:	0.0001 secs, 0.0000 secs, 0.0002 secs

Status code distribution:
  [200]	200 responses
```

## to deploy to k8s

1. tag your image and push to your target repo
2. use kubectl and deploy with ```kubectl apply -f ./k8s/httpbin.yaml```



## Resources

- Package your [Node.js](https://medium.com/appsody/nodes-cloud-packaged-fe60e29b699d) app for Cloud with Appsody