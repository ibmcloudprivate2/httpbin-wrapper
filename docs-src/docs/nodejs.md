

## Introduction

In this hands on exercise, you will learn

- how to build a docker image
- how to push an image to a private repo
- how to deploy an container in kubernetes platform

### About the application
this is a nodejs application that calls httpbin.org API and you can then use 

- Clone the [project](https://github.com/ibmcloudprivate2/httpbin-wrapper) which contains the nodeJS that call service in [httpbin.org](https://httpbin.org/)

High level steps

1. develop app
2. test it
3. build docker image
4. test it: docker run image
5. docker tag (for target image repo)
6. docker push
7. run in k8s: kubectl apply - yaml


## On your machine

- ensure you have your [pre-requisite](prepare.md) installed

## Install Nodejs and NPM

- Install Nodejs from the repositories

```
sudo apt install nodejs
```

- Uninstall Nodejs

```
sudo apt remove nodejs
```

- we will install nodejs version 10.16.2
- we will download a script ***nodesource_setup.sh*** for a specific version of nodejs
- then run the downloaded script where PPA will be added to your configuration and your local package cache will be updated.
- nodejs package contains the nodejs binary as well as npm, so you don't need to install npm separately. 

```
cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs -y
node -v
npm -v
```

- for some npm packages to work (those that require compiling code from source, for example), you will need to install the build-essential package

```
sudo apt install build-essential
```
   
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


## References

- using [virtualbox and vagrant](https://github.com/ibmcloudprivate2/httpbin-wrapper/blob/master/mycentos/readme.md) to practice nodejs deployment to ICP.