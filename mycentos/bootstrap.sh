# add vagrant part of docker group
sudo groupadd docker
sudo usermod -aG docker vagrant

sudo yum install git epel-release docker ansible dnsmasq wget -y

# install nodejs and npm stable version 10.x
sudo yum install -y gcc-c++ make
sudo curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install nodejs -y

# start docker
sudo systemctl start docker

# ensure docker started on reboot
sudo systemctl enable docker

# fix error due to docker not supported for overlay2
sudo sed -i 's/overlay2/devicemapper/g' /etc/sysconfig/docker-storage && cat /etc/sysconfig/docker-storage
sudo sed -i 's/overlay2/devicemapper/g' /etc/sysconfig/docker-storage-setup && cat /etc/sysconfig/docker-storage-setup

# restart docker after using devicemapper
sudo systemctl restart docker

# update and cleanup
sudo yum update -y
