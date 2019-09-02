

## Minishift for Mac (virtualbox)

Ensure you have 

- installed [virtualbox](https://www.virtualbox.org/wiki/Downloads)
- internet access
- installed [brew](https://brew.sh/)


## minishift

from a mac terminal, run the following command, a VM will be started after installation with a link to access the minishift console.


### install
```
brew cask install minishift
```

### start

```

minishift start --vm-driver virtualbox
```

### stop

```
minishift stop
```

To explore do refer to [Using Minishift](https://docs.okd.io/latest/minishift/using/index.html)

## Resources

- [Learn OpenShift](https://learn.openshift.com/)
- to use minishift in other [environment](https://docs.okd.io/latest/minishift/getting-started/setting-up-virtualization-environment.html)