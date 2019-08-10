

## Introduction

In this hands on exercise, you will learn

- how to build a docker image
- how to push an image to a private repo
- how to deploy an container in kubernetes platform

### About the application
this is a nodejs application that calls httpbin.org API and you can then use 

- Clone the [project](https://github.com/ibmcloudprivate2/httpbin-wrapper) which contains the nodeJS that call service in [httpbin.org](https://httpbin.org/)


## On your machine

- ensure you have your [pre-requisite](prepare.md) installed
   
- test the application
   
```   
   npm install
   npm test
```

- build the image 
   
```
   docker build . -t <image-name>:<image-tag>
```

- test the image
   
```
   docker run -e CONTAINER_PORT='3000' -e TARGET_URL='https://httpbin.org/' -e TARGET_URI='delay/1' -p 5000:3000 js-httpbin:2.0 <image-name>:<image-tag>
```

- tag the image for ICP
   
```
   docker tag js-httpbin:2.0 mycluster.icp:8500/<namespace>/<image-name>:<image-tag>
```

- push the image to kubernetes platform
    
   edit /etc/hosts to map  mycluster.icp to ICP IP address and configure docker to use insecure login
   
```
   docker login mycluster.icp:8500
   docker push mycluster.icp:8500/<namespace>/<image-name>:<image-tag>
```

- run the image
   
```
   kubectl apply -f ./k8s/httpbin.yaml
```

## Further exercise

1. modify the application
2. tag image new version
3. test it 
4. push image to kubernetes platform
5. scale it
6. update the application to new version of image
7. rollback
