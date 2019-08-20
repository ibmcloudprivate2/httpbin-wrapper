
## login

```
vagrant ssh
```

edit the following files, replace the string **overlay2** with **devicemapper**

```
sudo vi /etc/sysconfig/docker-storage
sudo vi /etc/sysconfig/docker-storage-setup
```

## setup hosts file

add the IP of your ICP cluster.

```
sudo vi /etc/hosts

add
119.81.108.152 mycluster.icp
```

## check docker info

```
docker info
```

## setup insecure docker to mycluster.icp:8500

edit the 
```
sudo vi /etc/docker/daemon.json 
```

add the following into daemon.json

{ "insecure-registries": ["mycluster.icp:8500"] }

## retart docker

```
sudo systemctl restart docker
```

## install nodjs

```
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install nodejs
```

## git clone the project

in the centos VM, git clone the project.

```
git clone https://github.com/ibmcloudprivate2/httpbin-wrapper.git
```

### install the nodejs app

install the nodejs app, change folder to **httpbin-wrapper**
```
cd httpbin-wrapper/
cp .env.sample .env
npm install
```

### run the test

```
npm test
```

### run the application

```
node -r dotenv/config server.js
```

access the application with below IP which is configured in Vagrantfile.

```
curl http://192.168.33.10:1323
```


## Build docker image

once you have tested your application, you can build the docker image.

<image-name> ==> specify your image of choice

<image-tag> ==> specify your tag of choice


```
docker build . -t <image-name>:<image-tag>
```

Example
```
docker build . -t mynodeapp:1.0
```

### test the image

```
docker run -e CONTAINER_PORT='3000' -e TARGET_URL='https://httpbin.org/' -e TARGET_URI='delay/1' -p 5000:3000 mynodeapp:1.0 
```

### tag the image for icp repo

<namespace> ==> namespace in ICP with the user's access 

```
docker tag js-httpbin:2.0 mycluster.icp:8500/<namespace>/mynodeapp:1.0
```

### push image

```
docker login mycluster.icp:8500
docker push mycluster.icp:8500/<namespace>/mynodeapp:1.0
```

### run the image in ICP

edit /k8s/httpbin.yaml accordingly to use your image you have tag above.

```
kubectl apply -f ./k8s/httpbin.yaml
```

