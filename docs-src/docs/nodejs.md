
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

1. [download](https://www.virtualbox.org/wiki/Downloads) and install virtualbox in your host O/S
2. [download](https://www.vagrantup.com/downloads.html) and install vagrant in your host O/S
3. create a folder of choice and create a file **Vagrantfile** with the following [content](https://github.com/ibmcloudprivate2/httpbin-wrapper/blob/master/mycentos/Vagrantfile).
4. run ```vagrant up``` and a centos will be provisioned using the Vagrantfile with VirtualBox. 
5. run ```vagrant ssh`` to login to the provisioned centos

In the CentOS, you will do the following steps

1. git clone https://github.com/ibmcloudprivate2/httpbin-wrapper.git
2. setup insecure docker login
3. setup hosts file
4. install nodejs app
5. test the nodejs app
6. download CLI
7. build image
8. tag the image
9. push the image to ICP image repo
10. run the image in ICP

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

- to list images 

```
docker images
```

- to test docker is setup correctly, you can run the following command, it will run a docker image **hello-world**, if the image is not available in your local machine, it will pull from dockerhub repo.
  
```
docker run hello-world
```

sample output
```
Unable to find image 'hello-world:latest' locally
Trying to pull repository docker.io/library/hello-world ...
latest: Pulling from docker.io/library/hello-world
1b930d010525: Pull complete
Digest: sha256:b8ba256769a0ac28dd126d584e0a2011cd2877f3f76e093a7ae560f2a5301c00
Status: Downloaded newer image for docker.io/hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

- you can list your docker image again on your machine

```
docker images
```

### setup hosts file

edit **/etc/hosts** to map mycluster.icp to ICP IP address and configure docker to use insecure login

assuming ICP IP: **119.81.213.119**, add the following into **/etc/hosts**

```
119.81.213.119 mycluster.icp
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
v10.16.3

npm -v
6.9.0
```

### install the application

- build the application with the following command
  
```   
npm install
```

- run the test where it will test API endpoints and code coverage.
  
```
npm test
```

- sample output

```
> ls@1.0.0 test /home/vagrant/httpbin-wrapper
> nyc mocha -r dotenv/config --exit --timeout 10000

Your port is: 1323
Running on http:/0.0.0.0:1323


  API Tests
    # Test root context with defined url and uri
getURL: https://httpbin.org/delay/1
context /: 200
{ args: {},
  data: '',
  files: {},
  form: {},
  headers: { Accept: 'application/json', Host: 'httpbin.org' },
  origin: '219.83.38.2, 219.83.38.2',
  url: 'https://httpbin.org/delay/1' }
      ✓ should be access to target url and uri (2136ms)
    # Test readiness
getURL: https://httpbin.org/status/200
context /readiness: 200
{}
      ✓ should be ready (1188ms)
    # Test liveness
getURL: https://httpbin.org/status/200
context /liveness: 200
{}
      ✓ should be alive (1167ms)
    # Test status 200
getURL: https://httpbin.org/status/200
context /status200: 200
{}
      ✓ should be status 200 (1080ms)
    # Test status 503
getURL: https://httpbin.org/status/503
context /status503: 503
{}
      ✓ should be status 503 (2108ms)
    # Test delay 1 sec
getURL: https://httpbin.org/delay/1
context /delay1: 200
{ args: {},
  data: '',
  files: {},
  form: {},
  headers: { Accept: 'application/json', Host: 'httpbin.org' },
  origin: '219.83.38.2, 219.83.38.2',
  url: 'https://httpbin.org/delay/1' }
      ✓ should be delay 1 sec (3033ms)
    # Test delay 5 sec
getURL: https://httpbin.org/delay/5
context /delay5: 200
{ args: {},
  data: '',
  files: {},
  form: {},
  headers: { Accept: 'application/json', Host: 'httpbin.org' },
  origin: '219.83.38.2, 219.83.38.2',
  url: 'https://httpbin.org/delay/5' }
      ✓ should be delay 5 sec (7250ms)


  7 passing (18s)

-----------|----------|----------|----------|----------|-------------------|
File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------|----------|----------|----------|----------|-------------------|
All files  |    83.33 |       50 |    88.24 |    92.31 |                   |
 config.js |      100 |      100 |      100 |      100 |                   |
 server.js |     83.1 |       50 |    88.24 |    92.19 |... 15,116,117,120 |
-----------|----------|----------|----------|----------|-------------------|
```

### check ip of your VM

```
ip a
```

### download CLI

You can operate on the kubernetes cluster with CLI tool, to do that, you need to download the CLI tools with links from the sytem console.

Assuming: your system console url is https://**119.81.213.119**:8443/console/welcome


- download cloudctl

```
curl -kLo cloudctl-linux-amd64-v3.2.0-634 https://119.81.213.119:8443/api/cli/cloudctl-linux-amd64
```

- make the downloaded file as executable

check the name of the downloaded file

```
ls -l
```

- then make the file executable using **chmod** command
  
```
chmod 755 cloudctl-linux-amd64-v3.2.0-634
```

- move the file to folder **/usr/local/bin** 

```
sudo mv cloudctl-linux-amd64-v3.2.0-634 /usr/local/bin/cloudctl
```

- download kubectl CLI, running similar command.

```
curl -kLo kubectl-linux-amd64-v1.13.5 https://119.81.213.119:8443/api/cli/kubectl-linux-amd64
chmod 755 kubectl-linux-amd64-v1.13.5
sudo mv kubectl-linux-amd64-v1.13.5 /usr/local/bin/kubectl
```

### test the appliation

nodejs application is built earlier with the command **npm install** where a folder *node_modules* will be created with all application dependency modules downloaded based on **package.json** file.

- run the application in background using **&** where the application required environment variable are defined in **.env**

```
node -r dotenv/config server.js &
```

- access the application with command below to validate it is working

```
curl http://localhost:1323
```

- expected output, where the above url will called **https://httpbin.org/delay/1** where you get a 200 OK response after 1 second.

```
getURL: https://httpbin.org/delay/1
context /: 200
{"args":{},"data":"","files":{},"form":{},"headers":{"Accept":"application/json","Host":"httpbin.org"},"origin":"219.83.38.2, 219.83.38.2","url":"https://httpbin.org/delay/1"}[vagrant@node1 httpbin-wrapper]
```

### terminate the application

- determine the process id of the running application by obtaining the id with the following command
  
```
ps -ef | grep node
```

sample output

```
vagrant   3181  1836  1 14:36 pts/0    00:00:00 node -r dotenv/config server.js
vagrant   3195  1836  0 14:37 pts/0    00:00:00 grep --color=auto node
```

- terminate the app using the process id with the following command.

```
kill 3181
```

- with validation that the application is working as expected, you are now ready to dockerize the application
- build the image, specify <image-name> and <image-tag> of your choice.

```
docker build . -t <image-name>:<image-tag>
```

> Note: take note of the <image-name>, <image-tag> in your docker build command, you will need to use them in the **httpbin.yaml** later.

**example**

```
docker build . -t js-nodeapp:1.0
```

- with the application dockerize, you need to test the dockerize application is working as expected.
- the application is configued using environment variable CONTAINER_PORT, TARGET_URL, TARGET_URI to works
  where the running application can be accessed at port 5000 which is defined with **-p** flag and mapped to the application container exposed at **3000**
- the container is run as a daemon or background process with the flag **-d**
   
```
docker run -e CONTAINER_PORT='3000' -e TARGET_URL='https://httpbin.org/' -e TARGET_URI='delay/1' -d -p 5000:3000 <image-name>:<image-tag>
```

**example**

run the application as daemon (background)

```
docker run -e CONTAINER_PORT='3000' -e TARGET_URL='https://httpbin.org/' -e TARGET_URI='delay/1' -d -p 5000:3000 js-nodeapp:1.0
```

- list the docker running container

```
docker ps
```

sample output

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
a2c857faef87        js-nodeapp:1.0      "docker-entrypoint..."   3 minutes ago       Up 3 minutes        0.0.0.0:5000->3000/tcp   mystifying_snyder
```

- access the application, the above command forward host port 5000 to the internal application port 3000 you should expect similar output you seen earlier before dockerizing your application.

```
curl http://localhost:5000
```

- terminate docker running container using the CONTAINER ID obtained from **docker ps**

```
docker kill a2c857faef87
```

- after you have validated the dockerize application is working as expected, you are not ready to push the image to image repository.
- before you can push your local image to image repository, you need to tag the image where you have access to.
- tag the image for ICP image repository, use the **<namespace>** assigned to your user ID.

```
docker tag js-nodeapp:1.0 mycluster.icp:8500/<namespace>/<image-name>:<image-tag>
```

**example**

assuming user has access to namespace: **user01** then tag your tag as follows

```
docker tag js-nodeapp:1.0 mycluster.icp:8500/user01/js-nodeapp:1.0
```

- login and push the image to kubernetes platform
- ensure your /etc/hosts has the correct **IP-address** for **mycluster.icp** host name
- ensure the docker is setup with insecure login to **mycluster.icp**
- ensure you are using **<namespace>** you have access to otherwise you will encounter error
    
```
docker login mycluster.icp:8500
docker push mycluster.icp:8500/user01/js-nodeapp:1.0
```

- with the image pushed successfully to your **<namespace>** you can deploy application using kubectl cli
- to deploy and run the image in kuberenetes, update the httpbin.yaml to reference the image your pushed to repo.
- before executing the following command, replace <namespace>  <image-name>, <image-tag> in  **./k8s/httpbin.yaml**

- first login with cloudctl, and choose your **<namespace>** you have access to, this will setup the cluster context for you.

```
cloudctl login -a https://119.81.213.119:8443
```

- deploy the application with the following command which has a service and deployment file.
- a service file that exposed the application deployment with **NodePort** type.
  
```
kubectl apply -f ./k8s/httpbin.yaml
```

- to check the pods (application) is running

```
kubectl get pods
```

- to get service list

```
kubectl get services
```

- to get description of a service listed, specify the service-id obtained in the list earlier
  
```
kubectl describle service <service-id>
```

## Further exercise

1. modify the application
2. tag image new version
3. test it 
4. push image to kubernetes platform
5. scale it
6. update the application to new version of image
7. rollback

## Resources

- using [virtualbox and vagrant](https://github.com/ibmcloudprivate2/httpbin-wrapper/blob/master/mycentos/readme.md) to practice nodejs deployment to ICP.
- IBM [Code Patterns](https://developer.ibm.com/patterns/) sample codes to many different area, AI, Blockchain, Data Science, DevOps, Machine learning, API Management and many others.
- IBM [Architecture Centers](https://www.ibm.com/cloud/garage/architectures) provides Reference Architecture to for many different categores: multi cloud, hybrid cloud, AI, Microservice, Security, Service Management.
- kubectl [Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- IBM community [helm](https://github.com/IBM/charts) chart
- community [Helm](https://github.com/helm/charts) chart stable and incubator 
- community [Operator](https://operatorhub.io/) application catalog
- Infrastructure as Code [Terrform](https://www.terraform.io/) to multi cloud [providers](https://www.terraform.io/docs/providers/index.html), IBM,OpenStack, AWS, Azure, Google, vmware and many more.
- Configuration as Code with [Ansible](https://www.ansible.com/) or [Chef](https://www.chef.io/products/automate/)
- OWASP Zed Attack Proxy ([ZAP](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)) [tutorial](https://owasp-academy.teachable.com/p/owasp-zap-tutorial).
- devops security [aqua](https://www.aquasec.com/) 
- Code Quality and Security [SonarQube](https://www.sonarqube.org/)
- uninstall nodejs and npm ```sudo yum remove -y nodejs npm```
- setup virtualbox guest addition, run ```vagrant plugin install vagrant-vbguest``` to [guest addition](https://www.virtualbox.org/manual/ch04.html) for the VM.
- IBM [Skill gateways](https://www.ibm.com/services/learning/ites.wss/zz-en?pageType=page&c=a0011023)