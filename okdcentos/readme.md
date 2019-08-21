## Pre requisite

to setup centos with OpenShift aka OKD, you need to have 
- internet access
- setup and install the following 
  - [virtualbox](https://www.virtualbox.org/wiki/Downloads)
  - [vagrant](https://www.vagrantup.com/downloads.html)

## OKD setup

start up the machine where it will install
- git
- ansible
- docker
- wget

### start the machine

```
vagrant up
```

### login machine shell

you will be prompted with choosing the interface, this should be usually the bridge in your machine.

```
vagrant ssh
```

## in machine shell

you can check the latest download [here](https://www.okd.io/download.html#oc-platforms), as of this writing, I am using ***v3.11.0-0cbc58b-linux-64bit.tar.gz***

### bootstrap a local single server OpenShift Origin cluster

start up a okd local cluster in centos.

```
oc cluster up
```

### access the okd console in browser

exit centos, from your host machine, login

id: developer
pw: any value

```
https://127.0.0.1:8443
```

## Resources

- install [docker-ce](https://docs.docker.com/install/linux/docker-ce/centos/) in centos
- install [python](https://tecadmin.net/install-python-2-7-on-centos-rhel/) 
- issue: SELinux is not supported with the overlay2 graph driver on this kernel. [solution](https://docs.hortonworks.com/HDPDocuments/Cloudbreak/Cloudbreak-2.9.1/troubleshoot/content/cb_trouble-docker.html)

