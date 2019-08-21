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

you will be prompted with a list of interface to use, choose the interface accordingly.

```
vagrant up

1) en13: Belkin USB-C LAN
2) en0: Wi-Fi (AirPort)
3) p2p0
4) awdl0
5) en4: Thunderbolt 3
6) en11: Thunderbolt 4
7) en3: Thunderbolt 1
8) en10: Thunderbolt 2
9) bridge0
10) en14: Ethernet(?)
11) bridge100
12) en5: USB Ethernet(?)
==> default: When choosing an interface, it is usually the one that is
==> default: being used to connect to the internet.
    default: Which interface should the network bridge to? 11
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

