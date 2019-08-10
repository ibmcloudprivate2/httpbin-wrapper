

## Development environment
Ensure your development environment has the following

1. docker where you can build, run, push/pull images
2. install [node and npm](https://nodejs.org/en/download/)
3.  IBM Cloud Private [tools](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.2.0/manage_cluster/cli_guide.html)
   > install [cloudctl](https://www.ibm.com/support/knowledgecenter/SSBS6K_3.2.0/manage_cluster/install_cli.html)
    
    > install [kubectl](https://www.ibm.com/support/knowledgecenter/SSBS6K_3.2.0/manage_cluster/install_kubectl.html)

## Verify your setup

```
node -v
```

```
npm -v
```

## Ubuntu Linux Setup for Windows

download Windows multipass, head over to [here](https://multipass.run/).

[Installing](https://discourse.ubuntu.com/t/installing-multipass-for-windows/9547) Multipass for Windows

## Ubuntu Linux Setup for Macs

download Macs multipass, head over to [here](https://multipass.run/).

to create a default Ubuntu with
- name: linux-vm
- cpu : 4 cores
- memory: 8GB
- disk: 40 GB

run the following command, and it will create a VM spec as of above.

```
multipass launch -n linux-vm -m 8G -d 40G -c 4
```

### vm info

to find info about VMs

```
multipass list
```

### get into vm shell

to access the shell of Ubuntu VM

```
multipass shell linux-vm
```

### install docker

- update existing package

```
sudo apt update && sudo apt upgrade
```

- install a few prerequisite packages which let apt use packages over HTTPS

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

- add the GPG key for the official Docker repository to your system

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

- Add the Docker repository to APT sources

```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

- update the package database with the Docker packages from the newly added repo

```
sudo apt update && sudo apt upgrade
```

- Make sure you are about to install from the Docker repo instead of the default Ubuntu repo

```
apt-cache policy docker-ce
```

- install Docker

```
sudo apt install docker-ce
```

- check Docker status

```
sudo systemctl status docker
```

- check docker version 

```
docker version
```

- add your user for running docker commands

```
sudo usermod -aG docker ${USER}
```

- to confirm user has been added

```
id -nG
```

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

### clone the project

- clone the httpbin-wrapper sample project

```
git clone https://github.com/ibmcloudprivate2/httpbin-wrapper.git

cd httpbin-wrapper/
npm install
```

- create the .env 

```
cp .env.sample .env
```

- run the test using the .env file

- to run and test your app locally in the linux vm
- determine the IP assigned to the vm using multipass list

```
multipass list

Name                    State             IPv4             Image
linux-vm                Running           192.168.64.7     Ubuntu 18.04 LTS
```

- login into the vm shell and run 

```
node -r dotenv/config server.js

output:
Your port is: 1323
Running on http:/0.0.0.0:1323
```

- from another terminal or from browser use the following url based on the IP you obtained from ***multipass list***

```
curl http://192.168.64.7:1323/

output:
{"args":{},"data":"","files":{},"form":{},"headers":{"Accept":"application/json","Host":"httpbin.org"},"origin":"121.7.17.203, 121.7.17.203","url":"https://httpbin.org/delay/1"}
```

> Your environment is now ready for you to do nodejs development.

### to exit shell

type ***exit*** in the multipass linux-vm shell

### stop the vm 

```
multipass stop linux-vm
```

### delete and clean vm

```
multipass delete linux-vm 
multipass purge
```

### get help

```
multipass help
```

