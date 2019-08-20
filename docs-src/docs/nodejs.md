
## Introduction

In this tutorial, you will learn

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
7. download ICP cli tools: cloudctl and kubectl
8. cloudctl login 
9. run in k8s: kubectl apply - yaml

To do this tutorial, we will use a Linux CentOS.

If you do not have a Linus O/S, do the following, on your host O/S

1. download and install virtualbox in your host O/S
2. download and install vagrant in your host O/S
3. create a folder of choice and create a Vagrantfile with the following [content](https://github.com/ibmcloudprivate2/httpbin-wrapper/blob/master/mycentos/Vagrantfile).
4. run ```vagrant up``` and a centos will be provisioned using the Vagrantfile with VirtualBox. 
5. run ```vagrant ssh`` to login to the provisioned centos

In the CentOS, you will do the following steps

1. git clone https://github.com/ibmcloudprivate2/httpbin-wrapper.git
2. setup insecure docker login
3. setup hosts file
4. install nodejs app
5. test the nodejs app
6. build image
7. tag the image
8. push the image to ICP image repo
9. run the image in ICP

## In centos

### setup insecure docker login

setup insecure docker login to ICP repo, edit  /etc/docker/daemon.json to include the following
  
```
{ "insecure-registries": ["mycluster.icp:8500"] }
```

restart docker
```
sudo systemctl restart docker
```

### verify docker 

```
docker run hello-world
```

### setup hosts file

edit **/etc/hosts** to map mycluster.icp to ICP IP address and configure docker to use insecure login

assuming ICP IP: **161.222.28.45**, add the following into **/etc/hosts**

```
161.222.28.45 mycluster.icp
```

### clone the tutorial project

run the following command to clone the git project

```
git clone https://github.com/ibmcloudprivate2/httpbin-wrapper.git
cd httpbin-wrapper
cp .env.sample .env
```

### verify nodejs and npm are installed

```
node -v
npm -v
```

### install the application

```   
npm install
npm test
```

### test the appliation

- test the application

```
node -r dotenv/config server.js &

curl http://localhost:1323

```

- terminal the app, the process id with the following command.

```
ps -ef | grep node

vagrant   3181  1836  1 14:36 pts/0    00:00:00 node -r dotenv/config server.js
vagrant   3195  1836  0 14:37 pts/0    00:00:00 grep --color=auto node

kill 3181
```

- build the image, specify image-name and image-tag of your choice.

```
docker build . -t <image-name>:<image-tag>
```

**example**

```
docker build . -t js-nodeapp:1.0
```

- test the docker image
   
```
docker run -e CONTAINER_PORT='3000' -e TARGET_URL='https://httpbin.org/' -e TARGET_URI='delay/1' -p 5000:3000 <image-name>:<image-tag>
```

**example**

run the application as daemon (background)

```
docker run -e CONTAINER_PORT='3000' -e TARGET_URL='https://httpbin.org/' -e TARGET_URI='delay/1' -d -p 5000:3000 js-nodeapp:1.0
```

list the docker running container

```
docker ps

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
a2c857faef87        js-nodeapp:1.0      "docker-entrypoint..."   3 minutes ago       Up 3 minutes        0.0.0.0:5000->3000/tcp   mystifying_snyder
```

access the application, the above command forward host port 5000 to the internal application port 3000.

```
curl http://localhost:5000
```

terminal docker running container

```
docker kill a2c857faef87
```

- tag the image for ICP image repository, use the namespace assigned to user.

```
docker tag js-httpbin:2.0 mycluster.icp:8500/<namespace>/<image-name>:<image-tag>
```

**example**

assuming user has access to namespace: auser01

```
docker tag js-httpbin:2.0 mycluster.icp:8500/auser01/js-nodeapp:1.0
```

- login and push the image to kubernetes platform
    
```
docker login mycluster.icp:8500
docker push mycluster.icp:8500/auser01/js-nodeapp:1.0
```

- run the image in ICP, update the httpbin.yaml to reference the image push to ICP repo accordingly.

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
- uninstall nodejs and npm ```sudo yum remove -y nodejs npm```
- setup virtualbox guest addition, run ```vagrant plugin install vagrant-vbguest``` to [guest addition](https://www.virtualbox.org/manual/ch04.html) for the VM.