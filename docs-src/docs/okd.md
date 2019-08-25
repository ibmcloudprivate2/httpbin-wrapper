## Pre requisite

to setup centos with OpenShift aka OKD, you need to have 
- internet access
- download and install the following 
  - [virtualbox](https://www.virtualbox.org/wiki/Downloads)
  - [vagrant](https://www.vagrantup.com/downloads.html)

### prepare in your host machine

1. create a folder of choice
2. create a file **Vagrantfile**
3. copy the [content](https://github.com/ibmcloudprivate2/httpbin-wrapper/blob/master/okdcentos/Vagrantfile) into the **Vagrantfile** created above.

## OKD setup

using vagrant it will start up and install the following.

- git
- ansible
- docker
- wget
- python
- pip
- okd 3.11
- start up the cluster

### start the machine

a new VM will be provisined with the following command, it will read the Vagrantfile and provision the VM accordingly.

```
vagrant up
```

### access the okd console in browser

from your host machine, login

id: developer
pw: any value

```
https://127.0.0.1:8443
```

### using on shutdown.

you can start your okd centos again

```
vagrant up
```

login to centos shell

```
vagrant ssh
```

within the centos shell, to start the okd cluster again

```
oc cluster up
```

## Resources

- install [docker-ce](https://docs.docker.com/install/linux/docker-ce/centos/) in centos
- install [python](https://tecadmin.net/install-python-2-7-on-centos-rhel/) 
- issue: SELinux is not supported with the overlay2 graph driver on this kernel. [solution](https://docs.hortonworks.com/HDPDocuments/Cloudbreak/Cloudbreak-2.9.1/troubleshoot/content/cb_trouble-docker.html)

