
## get your environment ready
- install docker
- install ICP tools


## login to ICP private image repo
```sh
docker login mycluster.icp:8500
```

## tag the image local to icp repo

add an image to namespace: ***js-demo-ns*** 
**note**: ensure the namespace used is available
```sh
docker tag js-httpbin:2.0 mycluster.icp:8500/js-demo-ns/js-httpbin:2.0
```

## push tag image to repo
```sh
docker push mycluster.icp:8500/js-demo-ns/js-httpbin:2.0
```

## login to ICP
```sh
cloudctl login [-a CLUSTER_URL] [-u USERNAME] [-p PASSWORD]

sample
cloudctl login -a https://<IP>:8443 -u <userid> -p <password>
```

## deploy the application
```sh
kubectl apply -f httpbin.yaml
```

## get service 
```sh
kubectl get service -n js-demo-ns

sample output
NAME                   TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
js-httpbin-service     NodePort   10.0.192.59    <none>        3000:30848/TCP   32m
```

## describe service details
```sh
kubectl describe service js-httpbin-service -n js-demo-ns

sample output
Name:                     js-httpbin-service
Namespace:                js-demo-ns
Labels:                   <none>
Annotations:              kubectl.kubernetes.io/last-applied-configuration:
                            {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"name":"js-httpbin-service","namespace":"js-demo-ns"},"spec":{"ports":[{"...
Selector:                 app=js-httpbin-app
Type:                     NodePort
IP:                       10.0.192.59
Port:                     <unset>  3000/TCP
TargetPort:               3000/TCP
NodePort:                 <unset>  30848/TCP
Endpoints:                10.1.50.93:3000
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

## get deployment
```sh
kubectl get deployment -n js-demo-ns

sample output
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
js-httpbin-deployment   1/1     1            1           30m
```

## get deployment details
```sh
kubectl describe deployment js-httpbin-deployment -n js-demo-ns

sample output
Name:                   js-httpbin-deployment
Namespace:              js-demo-ns
CreationTimestamp:      Mon, 05 Aug 2019 20:19:08 +0700
Labels:                 app=js-httpbin-app
Annotations:            deployment.kubernetes.io/revision: 2
                        kubectl.kubernetes.io/last-applied-configuration:
                          {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"labels":{"app":"js-httpbin-app"},"name":"js-httpbin-deployment",...
Selector:               app=js-httpbin-app
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=js-httpbin-app
  Containers:
   js-httpbin-app:
    Image:      mycluster.icp:8500/js-demo-ns/js-httpbin:2.0
    Port:       3000/TCP
    Host Port:  0/TCP
    Environment:
      TARGET_URL:      https://httpbin.org
      CONTAINER_PORT:  3000
      TARGET_URI:      /delay/1
    Mounts:            <none>
  Volumes:             <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   js-httpbin-deployment-88c7d557 (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  32m   deployment-controller  Scaled up replica set js-httpbin-deployment-dbbf69d4 to 1
  Normal  ScalingReplicaSet  27m   deployment-controller  Scaled up replica set js-httpbin-deployment-88c7d557 to 1
  Normal  ScalingReplicaSet  26m   deployment-controller  Scaled down replica set js-httpbin-deployment-dbbf69d4 to 0
```

## get pods in a namespace "js-demo-ns"
```sh
kubectl get pods -n js-demo-ns

sample output
NAME                                   READY   STATUS    RESTARTS   AGE
js-httpbin-deployment-88c7d557-bqbc4   1/1     Running   0          15m
```

## get yaml of pod
```sh
kubectl get pod js-httpbin-deployment-88c7d557-bqbc4  -o yaml -n js-demo-ns
```

## get logs in pod
```sh
kubectl logs js-httpbin-deployment-88c7d557-bqbc4 -n js-demo-ns

sample output
> ls@1.0.0 start /usr/src/app
> node server.js

Your port is: 3000
Running on http:/0.0.0.0:3000
getURL: https://httpbin.org/delay/1
context /: 200
getURL: https://httpbin.org/status/200
context /readiness: 200
getURL: https://httpbin.org/status/200
context /liveness: 200
getURL: https://httpbin.org/delay/5
context /delay5: 200
getURL: https://httpbin.org/status/503
context /status503: 503
```

# Resource
- [kubectl cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)