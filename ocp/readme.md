
## get your environment ready
- install docker
- install ICP tools
- install oc tools (Optional)


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

sample output
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubernetes.io/psp: ibm-anyuid-psp
  creationTimestamp: "2019-08-05T14:23:10Z"
  generateName: js-httpbin-deployment-7677b4ff9b-
  labels:
    app: js-httpbin-app
    pod-template-hash: 7677b4ff9b
  name: js-httpbin-deployment-7677b4ff9b-xkdzc
  namespace: js-demo-ns
  ownerReferences:
  - apiVersion: apps/v1
    blockOwnerDeletion: true
    controller: true
    kind: ReplicaSet
    name: js-httpbin-deployment-7677b4ff9b
    uid: 8d58e8d6-b78c-11e9-b1e7-068193eefc5e
  resourceVersion: "2052428"
  selfLink: /api/v1/namespaces/js-demo-ns/pods/js-httpbin-deployment-7677b4ff9b-xkdzc
  uid: 8d5cf3f2-b78c-11e9-b1e7-068193eefc5e
spec:
  containers:
  - env:
    - name: TARGET_URL
      value: https://httpbin.org
    - name: CONTAINER_PORT
      value: "3000"
    - name: TARGET_URI
      value: /delay/1
    image: mycluster.icp:8500/js-demo-ns/js-httpbin:2.0
    imagePullPolicy: Always
    livenessProbe:
      failureThreshold: 3
      httpGet:
        path: /liveness
        port: 3000
        scheme: HTTP
      initialDelaySeconds: 3
      periodSeconds: 3
      successThreshold: 1
      timeoutSeconds: 1
    name: js-httpbin-app
    ports:
    - containerPort: 3000
      protocol: TCP
    readinessProbe:
      failureThreshold: 3
      httpGet:
        path: /readiness
        port: 3000
        scheme: HTTP
      initialDelaySeconds: 5
      periodSeconds: 5
      successThreshold: 1
      timeoutSeconds: 1
    resources: {}
    securityContext:
      capabilities:
        drop:
        - MKNOD
      procMount: Default
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: default-token-cwvcw
      readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  imagePullSecrets:
  - name: sa-js-demo-ns
  nodeName: 10.117.213.99
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext: {}
  serviceAccount: default
  serviceAccountName: default
  terminationGracePeriodSeconds: 30
  tolerations:
  - effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
  - effect: NoExecute
    key: node.kubernetes.io/unreachable
    operator: Exists
    tolerationSeconds: 300
  volumes:
  - name: default-token-cwvcw
    secret:
      defaultMode: 420
      secretName: default-token-cwvcw
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: "2019-08-05T14:23:10Z"
    status: "True"
    type: Initialized
  - lastProbeTime: null
    lastTransitionTime: "2019-08-05T14:50:16Z"
    status: "True"
    type: Ready
  - lastProbeTime: null
    lastTransitionTime: "2019-08-05T14:50:16Z"
    status: "True"
    type: ContainersReady
  - lastProbeTime: null
    lastTransitionTime: "2019-08-05T14:23:10Z"
    status: "True"
    type: PodScheduled
  containerStatuses:
  - containerID: docker://285a3f59034eb9996e14ec6e53cb17e5c4cb0ff261f8e0733ea5da6ec6cdf009
    image: mycluster.icp:8500/js-demo-ns/js-httpbin:2.0
    imageID: docker-pullable://mycluster.icp:8500/js-demo-ns/js-httpbin@sha256:9e39c5a934649c4c4163ad802f62b19b07728c9cc5ee2034120871893e07fb8b
    lastState:
      terminated:
        containerID: docker://39fcec9b2dff627e9e03cfd26686b79f42257a5388159cbeb88411c929239d19
        exitCode: 0
        finishedAt: "2019-08-05T14:47:16Z"
        reason: Completed
        startedAt: "2019-08-05T14:47:05Z"
    name: js-httpbin-app
    ready: true
    restartCount: 7
    state:
      running:
        startedAt: "2019-08-05T14:50:09Z"
  hostIP: 10.117.213.99
  phase: Running
  podIP: 10.1.44.44
  qosClass: BestEffort
  startTime: "2019-08-05T14:23:10Z"
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
