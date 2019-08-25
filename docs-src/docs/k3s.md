

## Pre requisite

to setup centos with OpenShift aka OKD, you need to have 
- internet access
- download and install the following 
  - [virtualbox](https://www.virtualbox.org/wiki/Downloads)
  - [vagrant](https://www.vagrantup.com/downloads.html)

### prepare in your host machine

1. create a folder of choice
2. create a file **Vagrantfile**
3. copy the [content](https://github.com/ibmcloudprivate2/httpbin-wrapper/blob/master/k3scentos/Vagrantfile) into the **Vagrantfile** created above.

### start the machine

a new VM will be provisined with the following command, it will read the Vagrantfile and provision the VM accordingly.

```
vagrant up
```

## to use k3s in VM

login to VM
```
vagrant ssh
```

### list k3s nodes

```
k3s kubectl get node
```

### to check id and password of k3s

you can get the id and password to login k3s

view it in more /etc/rancher/k3s/k3s.yaml

```
more /etc/rancher/k3s/k3s.yaml
```

## to access k3s outside of VM (from your host)

use a browser from your host and access https://localhost:6443

enter the id and password obtained in file **/etc/rancher/k3s/k3s.yaml**
