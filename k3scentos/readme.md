

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