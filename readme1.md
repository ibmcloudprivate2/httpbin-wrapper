# Building Dotnet application and deploy it into OCP private registry

- This repo will have 3 section:
  Section 1: How to build image using docker and Dockerfile as a container image
      1.1: Build docker image
      1.2: Test docker image
  Section 2:  How to push image into docker hub under your account.
      2.1: Login into docker hub
      2.2: Tag the image when you need to rename / retag / push this image into image registry
      2.3 Push the image into your docker hub account
  Section 3: How to push image into openshift private image registry.
      3.1: Know your private image resgitry endpoint and get the credential to login your private image resgitry endpoint
      3.2: Login into Openshift private registry
      3.3: Create a new project to push your image into it
      3.4: Retag the image you built with the openshift private registry name and the project name you created in 3.3

- The sequential steps you should follow is section 1 to 3.


### Section 1: How to build and test image using docker and Dockerfile as a container image
---
1. clone this project
2. npm install
3. rename **.env.sample** to **.env**
4. to test execute command **npm test**
5. to start server, execute command **npm run start_local**

To run locally
```sh
npm run start_local
```

To run test
```sh
npm test
```


#### 1.1: Build docker image

```sh
docker build . -t <image-name>:<image-tag>
# For example
docker build . -t http-bin:1.0.0 # Using http-bin as image name , 1.0.0 as image tag

```



#### 1.2: Test docker image
`CONTAINER_PORT` defined the port to be used in the container.

the context root of the app can be configured with below values
- `TARGET_URL` defined the host url to be called
- `TARGET_URI` defined the uri to be called

```sh
docker run -e CONTAINER_PORT='<your container port>' \
           -e TARGET_URL='<the target url>' \
           -e TARGET_URI='<the ratget uri>' \
           -p <the port that you wish to open in your browser>:<your container port> <image-name>:<image-tag>

# For example, passing in variable and use image name = http-bin, image tag = 1.0.0
docker run -e CONTAINER_PORT='3000' \
           -e TARGET_URL='https://httpbin.org/' \
           -e TARGET_URI='delay/1' \
           -p 3000:3000 http-bin:1.0.0 

# If you get the following example output

# > ls@1.0.0 start /usr/src/app
# > node server.js

# Your port is: 3000
# Running on http:/0.0.0.0:3000

# It means the application is running, else you may restart from step 1

```

### Section 2: Push docker image to dockerhub
---
#### 2.1: Login into docker hub
```sh
### By default docker login into `docker.io`
### If you have your private registry, you may wish to use command 'docker login <your private resgitry fqdn>'
docker login

### After you run 'docker login', it will ask you for username and password listed as below

### Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
### Username: 

```
--- 
- Enter your username, not your email address use for registration. For more info, please come to https://stackoverflow.com/questions/40872558/just-created-docker-hub-account-credentials-do-not-work-for-docker-login
- Enter your accesstoken if you enable 2FA autientication. For more info, please come to https://docs.docker.com/docker-hub/2fa/
--- 
- You will see `Login Succeeded` if you have successfully logon.

#### 2.2: Tag the image when you need to rename / retag / push this image into image registry
- To push an image to Docker Hub, you must first name your local image using your Docker Hub username and the repository name that you created through Docker Hub on the web.

- Name your local images using one of these methods:

1. When you build them, using docker build -t <hub-user>/<repo-name>[:<tag>]

2. By re-tagging an existing local image docker tag <existing-image> <hub-user>/<repo-name>[:<tag>]

3. By using docker commit <existing-container> <hub-user>/<repo-name>[:<tag>] to commit changes

```sh
docker tag <image-name>:<image-tag> <your-dockerhub-acct>/<image-name>:<image-tag>

# For example
docker tag http-bin:1.0.0 jaricsng/http-bin:1.0.0

```
- If tag of the image not specified, defaults is latest.

- After this step, you are ready to push `image` to `image registry`.

#### 2.3 Push the image into your docker hub account
```sh
docker push <your-username>/http-bin:1.0.0

# for example
docker push jaricsng/http-bin:1.0.0
```


### Section 3: How to push image into Openshift private image registry.
---
- Prerequisite: 
  1. You must have a Openshift cluster 
  2. You must able to login and access the Openshift cluster
  3. You have installed `oc` command line tools or `kubectl` command line tools
  4. Created a route that expose your private image registry in Openshift cluster. For more information, you may visit [exposing registry in ocp](https://docs.openshift.com/container-platform/3.4/install_config/registry/securing_and_exposing_registry.html)
---

#### 3.1: Know your private image registry endpoint and use credential to login your private image resgitry endpoint
- Login the cluster with your existing credential 
```sh
# Login to existing cluster
oc login <the-target-openshift-cluster> -u <your-username> -p <your-password>
```
---

- Method 1: Get the endpoint of your image registry using Cli
```sh
# Get route in default namespace
oc get route -n default # you may change the namespace if image registry is not within default namespace

# or
kubectl get route -n default # you may change the namespace if image registry is not within default namespace
```

- Below is the expected output. If you did not have the similar output, you may wish to check with your prerequisites.
```yaml
NAME               HOST/PORT                                                    PATH   SERVICES           PORT    TERMINATION   WILDCARD
docker-registry    docker-registry-default.dc.test.okd.161.202.175.99.nip.io           docker-registry    <all>   passthrough   None
registry-console   registry-console-default.dc.test.okd.161.202.175.99.nip.io          registry-console   <all>   passthrough   None
```

- From the result above, you will know your endpoint is `docker-registry-default.dc.test.okd.161.202.175.99.nip.io` under `HOST/PORT` section

- Method 2: Get the endpoint of your image registry using [web console](https://cookbook.openshift.org/image-registry-and-image-streams/how-do-i-push-an-image-to-the-internal-image-registry.html)

---

#### 3.2: Login into Openshift private registry
- If you are already logged in to the OpenShift cluster from the command line, you can login to the internal image registry using the docker tool using:
```sh
### By default docker login into `docker.io`
### If you have your private openshift registry, you may wish to use the name of image registry obtain from 
'docker login -u `oc whoami` -p `oc whoami --show-token` <your-private-openshift-image-registry>'

# For example
docker login -u `oc whoami` -p `oc whoami --show-token` docker-registry-default.dc.test.okd.161.202.175.99.nip.io


### After you run 'docker login', it will ask you for username and password listed as below

### Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
### Username: 

```

---
#### 3.3: Create a new project to push your image into it
- You may create the project in openshift cluster using the command below
```sh
oc new-project <project-name>

# for example
oc new-project my-namespace

```

- If you see the expected output below, means you are successfully created a project in openshift cluster. If not, you may consider to check if you have login to the cluster.
```yaml
Now using project "my-namespace" on server "https://161.202.175.99:8443".

You can add applications to this project with the 'new-app' command. For example, try:

    oc new-app centos/ruby-25-centos7~https://github.com/sclorg/ruby-ex.git

to build a new example application in Ruby.

```

---

#### 3.4: Retag the image you built with the openshift private registry name and the project name you created in 3.3

- Tag the local image you wish to push with the details of the image registry, your project in OpenShift, the name of the image stream and image version tag.

```sh
# for example
docker tag <image-name>:<image-tag> <your-openshift-private-registry-image-registry>/<your-project-name>/<image-name>:<image-tag>

# For example
docker tag http-bin:1.0.0 docker-registry-default.dc.test.okd.161.202.175.99.nip.io/my-namespace/http-bin:1.0.0

```

- After this step, you are ready to push the image into openshift private registry


#### 3.5 Push the image into Openshift private image registry

- Push the image you created in `Step 1` into Openshift private image registry

```sh
docker push <image-name>:<image-tag> <your-openshift-private-registry-image-registry>/<your-project-name>/<image-name>:<image-tag>

# for example
docker push docker-registry-default.dc.test.okd.161.202.175.99.nip.io/my-namespace/http-bin:1.0.0
```

- If you see the following output, means docker are pushing the image
```yaml
The push refers to repository [docker-registry-default.dc.test.okd.161.202.175.99.nip.io/my-namespace/http-bin]
89d3a5a36f52: Pushed 
62065de09b0e: Pushing [====>                                              ]   2.61MB/31.53MB
1da2481eacac: Pushed 
0b77ffaff4ac: Pushed 
4c5e2c02e279: Pushed 
aa8fc267d1f6: Pushed 
2f6a6589e295: Pushed 
799e7111d6d4: Pushed 
a72a7e555fe1: Pushing [>                                                  ]  5.986MB/561.6MB
b8f8aeff56a8: Pushing [=>                                                 ]   4.91MB/141.8MB
687890749166: Pushed 
2f77733e9824: Pushed 
97041f29baff: Pushing [==============>                                    ]  28.72MB/100.7MB
```

- If you see the following output, means the image has been pushed to openshift private image registry successfully

```yaml
The push refers to repository [docker-registry-default.dc.test.okd.161.202.175.99.nip.io/my-namespace/http-bin]
5f70bf18a086: Layer already exists
0b10d8731592: Pushed
b08b5a92e747: Pushed
89c69caaa06d: Pushed
59b0a875ac52: Pushed
5dbcf0efe4f2: Pushed
latest: digest: sha256:1ce7366fbc35b99b43d7e9e8de5131f313552a7eee57e157c92e8cc9d5a0a57f size: 6628

```


### Complete! Well done! +1!



















