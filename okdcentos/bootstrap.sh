#!/usr/bin/env bash

sudo groupadd docker 
sudo usermod -aG docker vagrant

sudo yum -y update

# sudo yum install git epel-release docker ansible dnsmasq wget -y 
sudo yum install git epel-release ansible pyOpenSSL python-cryptography python-lxml docker -y
sudo yum install wget -y

# update python
sudo yum install gcc openssl-devel bzip2-devel -y
wget https://www.python.org/ftp/python/2.7.16/Python-2.7.16.tgz
tar xzf Python-2.7.16.tgz
cd Python-2.7.16
./configure --enable-optimizations
sudo make altinstall
/usr/local/bin/python2.7 -V

# install pip
curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
sudo python get-pip.py

# install ansible and update to lateste version
# sudo yum install ansible -y
# upgrade ansible
sudo pip install --upgrade ansible

# start docker
sudo systemctl start docker

# ensure docker started on reboot
sudo systemctl enable docker

# fix error due to docker not supported for overlay2
sudo sed -i 's/overlay2/devicemapper/g' /etc/sysconfig/docker-storage && cat /etc/sysconfig/docker-storage
sudo sed -i 's/overlay2/devicemapper/g' /etc/sysconfig/docker-storage-setup && cat /etc/sysconfig/docker-storage-setup

# setup insecure docker login
sudo sed -i 's/{}/{ "insecure-registries": ["172.30.0.0\/16"] }/g' /etc/docker/daemon.json && cat /etc/docker/daemon.json

# restart docker after using devicemapper
sudo systemctl restart docker

# update and cleanup
sudo yum update -y

# Download the Linux oc binary
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz
tar xvf openshift-origin-client-tools*.tar.gz
cd openshift-origin-client*/
sudo mv oc kubectl  /usr/local/bin/


