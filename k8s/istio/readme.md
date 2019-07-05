# About istio

- [concepts](https://istio.io/docs/concepts/what-is-istio/)
- [traffice management](https://istio.io/docs/concepts/traffic-management/)
- [security](https://istio.io/docs/concepts/security/)
- [policy and telemetry](https://istio.io/docs/concepts/policies-and-telemetry/)
- [performance and scalability](https://istio.io/docs/concepts/performance-and-scalability/)
- [multicluster deployment](https://istio.io/docs/concepts/multicluster-deployments/)

You can learn more about istio using the [examples](https://istio.io/docs/examples/bookinfo/) and following the [tasks](https://istio.io/docs/tasks/traffic-management/) tutorial.

In this tutorial, we will deploy a the sample nodejs created and deploy in IBM Cloud Private to learn about istio.

# Deploy istio

a number of methods are available for istio installation
- install istio using [IBM Helm chart](https://istio.io/docs/setup/kubernetes/install/platform/ibm/#ibm-cloud-private)
- install using [community latest version](https://istio.io/docs/setup/kubernetes/install/helm/) of istio

The following provides instruction for customised installation of community istio in IBM Cloud Private (ICP).

## prerequisite

- IBM Cloud Private
- git
- editor e.g VS Code, Atom
- docker

# Install Istio

Perform the [Prerequisites](https://istio.io/docs/setup/kubernetes/install/helm/#option-1-install-with-helm-via-helm-template)


ICP endpoint: https://<ICP-Host>:8443
id: <userid>
password: <password>

## login to ICP 

```sh
cloudctl login -a https://<ICP-URL>:8443 -u admin -p <password>
```

## create a namespace 
```sh
kubectl create ns istio-demo
kubectl get ns
```

create istio-system is not exist

```sh
kubectl create namespace istio-system
```

## enable auto istio sidecar injection
```sh
kubectl label namespace istio-demo istio-injection=enabled
```

### check which namespace has auto sidecar injection

```sh
kubectl get namespace -L istio-injection
```

you should similar output below where you will notice, namespace istio-demo will have istio auto injection of sidecar.
```sh
NAME           STATUS   AGE     ISTIO-INJECTION
cert-manager   Active   26h
default        Active   26h
ibmcom         Active   26h
istio-demo     Active   5m42s   enabled
istio-system   Active   26h
kube-public    Active   26h
kube-system    Active   26h
platform       Active   26h
services       Active   26h
```

## download the istio release

get the latest release from [here](https://istio.io/docs/setup/kubernetes/#downloading-the-release) and follow the instruction.

```sh
curl -L https://git.io/getLatestIstio | ISTIO_VERSION=1.2.0 sh -
cd istio-1.2.0
export PATH=$PWD/bin:$PATH
```

## Install all the Istio Custom Resource Definitions (CRDs) using kubectl apply

```sh
helm template install/kubernetes/helm/istio-init --name istio-init --namespace istio-system | kubectl apply -f -
```

you should see similar output below
```sh
configmap/istio-crd-10 created
configmap/istio-crd-11 created
configmap/istio-crd-12 created
serviceaccount/istio-init-service-account created
clusterrole.rbac.authorization.k8s.io/istio-init-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-init-admin-role-binding-istio-system created
job.batch/istio-init-crd-10 created
job.batch/istio-init-crd-11 created
job.batch/istio-init-crd-12 created
```

## verify 26 istio CRD 

```sh
kubectl get crds | grep 'istio.io\|certmanager.k8s.io' | wc -l

26
```

## for istio demo (non production)

```sh
helm template install/kubernetes/helm/istio --name istio --namespace istio-system --values install/kubernetes/helm/istio/values-istio-demo.yaml | kubectl apply -f -
```

you should see similar output as follows

```sh
secret/kiali created
configmap/istio-galley-configuration created
configmap/istio-grafana-custom-resources created
configmap/istio-grafana-configuration-dashboards-galley-dashboard created
configmap/istio-grafana-configuration-dashboards-istio-mesh-dashboard created
configmap/istio-grafana-configuration-dashboards-istio-performance-dashboard created
configmap/istio-grafana-configuration-dashboards-istio-service-dashboard created
configmap/istio-grafana-configuration-dashboards-istio-workload-dashboard created
configmap/istio-grafana-configuration-dashboards-mixer-dashboard created
configmap/istio-grafana-configuration-dashboards-pilot-dashboard created
configmap/istio-grafana created
configmap/kiali created
configmap/prometheus created
configmap/istio-security-custom-resources created
configmap/istio created
configmap/istio-sidecar-injector created
serviceaccount/istio-galley-service-account created
serviceaccount/istio-egressgateway-service-account created
serviceaccount/istio-ingressgateway-service-account created
serviceaccount/istio-grafana-post-install-account created
clusterrole.rbac.authorization.k8s.io/istio-grafana-post-install-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-grafana-post-install-role-binding-istio-system created
job.batch/istio-grafana-post-install-1.2.0 created
serviceaccount/kiali-service-account created
serviceaccount/istio-mixer-service-account created
serviceaccount/istio-pilot-service-account created
serviceaccount/prometheus created
serviceaccount/istio-cleanup-secrets-service-account created
clusterrole.rbac.authorization.k8s.io/istio-cleanup-secrets-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-cleanup-secrets-istio-system created
job.batch/istio-cleanup-secrets-1.2.0 created
serviceaccount/istio-security-post-install-account created
clusterrole.rbac.authorization.k8s.io/istio-security-post-install-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-security-post-install-role-binding-istio-system created
job.batch/istio-security-post-install-1.2.0 created
serviceaccount/istio-citadel-service-account created
serviceaccount/istio-sidecar-injector-service-account created
serviceaccount/istio-multi created
clusterrole.rbac.authorization.k8s.io/istio-galley-istio-system created
clusterrole.rbac.authorization.k8s.io/kiali created
clusterrole.rbac.authorization.k8s.io/kiali-viewer created
clusterrole.rbac.authorization.k8s.io/istio-mixer-istio-system created
clusterrole.rbac.authorization.k8s.io/istio-pilot-istio-system created
clusterrole.rbac.authorization.k8s.io/prometheus-istio-system created
clusterrole.rbac.authorization.k8s.io/istio-citadel-istio-system created
clusterrole.rbac.authorization.k8s.io/istio-sidecar-injector-istio-system created
clusterrole.rbac.authorization.k8s.io/istio-reader created
clusterrolebinding.rbac.authorization.k8s.io/istio-galley-admin-role-binding-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-kiali-admin-role-binding-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-mixer-admin-role-binding-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-pilot-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/prometheus-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-citadel-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-sidecar-injector-admin-role-binding-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-multi created
role.rbac.authorization.k8s.io/istio-ingressgateway-sds created
rolebinding.rbac.authorization.k8s.io/istio-ingressgateway-sds created
service/istio-galley created
service/istio-egressgateway created
service/istio-ingressgateway created
service/grafana created
service/kiali created
service/istio-policy created
service/istio-telemetry created
service/istio-pilot created
service/prometheus created
service/istio-citadel created
service/istio-sidecar-injector created
deployment.apps/istio-galley created
deployment.apps/istio-egressgateway created
deployment.apps/istio-ingressgateway created
deployment.apps/grafana created
deployment.apps/kiali created
deployment.apps/istio-policy created
deployment.apps/istio-telemetry created
deployment.apps/istio-pilot created
deployment.apps/prometheus created
deployment.apps/istio-citadel created
deployment.apps/istio-sidecar-injector created
deployment.apps/istio-tracing created
horizontalpodautoscaler.autoscaling/istio-egressgateway created
horizontalpodautoscaler.autoscaling/istio-ingressgateway created
horizontalpodautoscaler.autoscaling/istio-policy created
horizontalpodautoscaler.autoscaling/istio-telemetry created
horizontalpodautoscaler.autoscaling/istio-pilot created
service/jaeger-query created
service/jaeger-collector created
service/jaeger-agent created
service/zipkin created
service/tracing created
mutatingwebhookconfiguration.admissionregistration.k8s.io/istio-sidecar-injector created
poddisruptionbudget.policy/istio-galley created
poddisruptionbudget.policy/istio-egressgateway created
poddisruptionbudget.policy/istio-ingressgateway created
poddisruptionbudget.policy/istio-policy created
poddisruptionbudget.policy/istio-telemetry created
poddisruptionbudget.policy/istio-pilot created
poddisruptionbudget.policy/istio-sidecar-injector created
attributemanifest.config.istio.io/istioproxy created
attributemanifest.config.istio.io/kubernetes created
handler.config.istio.io/stdio created
instance.config.istio.io/accesslog created
instance.config.istio.io/tcpaccesslog created
rule.config.istio.io/stdio created
rule.config.istio.io/stdiotcp created
instance.config.istio.io/requestcount created
instance.config.istio.io/requestduration created
instance.config.istio.io/requestsize created
instance.config.istio.io/responsesize created
instance.config.istio.io/tcpbytesent created
instance.config.istio.io/tcpbytereceived created
instance.config.istio.io/tcpconnectionsopened created
instance.config.istio.io/tcpconnectionsclosed created
handler.config.istio.io/prometheus created
rule.config.istio.io/promhttp created
rule.config.istio.io/promtcp created
rule.config.istio.io/promtcpconnectionopen created
rule.config.istio.io/promtcpconnectionclosed created
handler.config.istio.io/kubernetesenv created
rule.config.istio.io/kubeattrgenrulerule created
rule.config.istio.io/tcpkubeattrgenrulerule created
instance.config.istio.io/attributes created
destinationrule.networking.istio.io/istio-policy created
destinationrule.networking.istio.io/istio-telemetry created
```

## verify istio installation

```sh
kubectl get svc -n istio-system
```

similar output as follows for istio demo profile
```sh
NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                                                                                                                                      AGE
grafana                  ClusterIP      192.168.0.145   <none>        3000/TCP                                                                                                                                     5m35s
istio-citadel            ClusterIP      192.168.0.239   <none>        8060/TCP,15014/TCP                                                                                                                           5m35s
istio-egressgateway      ClusterIP      192.168.0.217   <none>        80/TCP,443/TCP,15443/TCP                                                                                                                     5m35s
istio-galley             ClusterIP      192.168.0.184   <none>        443/TCP,15014/TCP,9901/TCP                                                                                                                   5m35s
istio-ingressgateway     LoadBalancer   192.168.0.50    <pending>     15020:31524/TCP,80:31380/TCP,443:31390/TCP,31400:31400/TCP,15029:32753/TCP,15030:31791/TCP,15031:30795/TCP,15032:30005/TCP,15443:32213/TCP   5m35s
istio-pilot              ClusterIP      192.168.0.140   <none>        15010/TCP,15011/TCP,8080/TCP,15014/TCP                                                                                                       5m35s
istio-policy             ClusterIP      192.168.0.248   <none>        9091/TCP,15004/TCP,15014/TCP                                                                                                                 5m35s
istio-sidecar-injector   ClusterIP      192.168.0.127   <none>        443/TCP                                                                                                                                      5m35s
istio-telemetry          ClusterIP      192.168.0.155   <none>        9091/TCP,15004/TCP,15014/TCP,42422/TCP                                                                                                       5m35s
jaeger-agent             ClusterIP      None            <none>        5775/UDP,6831/UDP,6832/UDP                                                                                                                   5m34s
jaeger-collector         ClusterIP      192.168.0.93    <none>        14267/TCP,14268/TCP                                                                                                                          5m34s
jaeger-query             ClusterIP      192.168.0.48    <none>        16686/TCP                                                                                                                                    5m34s
kiali                    ClusterIP      192.168.0.251   <none>        20001/TCP                                                                                                                                    5m35s
prometheus               ClusterIP      192.168.0.34    <none>        9090/TCP                                                                                                                                     5m35s
tracing                  ClusterIP      192.168.0.178   <none>        80/TCP                                                                                                                                       5m34s
zipkin                   ClusterIP      192.168.0.103   <none>        9411/TCP                                                                                                                                     5m34s
```

ensure corresponding istio pods with status RUNNING.
```sh
kubectl get pods -n istio-system
```

you should see similar output as follows
```sh
NAME                                      READY   STATUS      RESTARTS   AGE
grafana-7869478fc5-6ng4m                  1/1     Running     0          20m
istio-citadel-657f5dd79c-fljws            1/1     Running     0          20m
istio-cleanup-secrets-1.2.0-ltfg6         0/1     Completed   0          20m
istio-egressgateway-694545b8db-b2znp      1/1     Running     0          17m
istio-egressgateway-694545b8db-fbg94      1/1     Running     0          20m
istio-egressgateway-694545b8db-zfgq4      1/1     Running     0          16m
istio-galley-9b7bbcdb7-wvfcc              1/1     Running     0          20m
istio-grafana-post-install-1.2.0-5kh6r    0/1     Completed   0          20m
istio-ingressgateway-fccd6ffb6-6czrr      1/1     Running     0          17m
istio-ingressgateway-fccd6ffb6-9vw6z      1/1     Running     0          18m
istio-ingressgateway-fccd6ffb6-jzb4n      1/1     Running     0          20m
istio-ingressgateway-fccd6ffb6-lllpt      1/1     Running     0          5m22s
istio-init-crd-10-6rdvw                   0/1     Completed   0          25m
istio-init-crd-11-k9kr9                   0/1     Completed   0          25m
istio-init-crd-12-4zjtm                   0/1     Completed   0          25m
istio-pilot-75b98c987f-rpvmp              2/2     Running     0          20m
istio-policy-5f8ccb5d49-5z248             2/2     Running     3          20m
istio-security-post-install-1.2.0-hxhc7   0/1     Completed   0          20m
istio-sidecar-injector-5d4c9bffd6-c6bbz   1/1     Running     0          20m
istio-telemetry-787594d8bb-s4jnz          2/2     Running     3          20m
istio-tracing-79db5954f-kwb4p             1/1     Running     0          20m
kiali-7b5b867f8-f4g5z                     1/1     Running     0          20m
prometheus-5b48f5d49-j2t6f                1/1     Running     0          20m
```

Installation completed !

# Uninstall

to uninstall above demo 

```sh
helm template install/kubernetes/helm/istio --name istio --namespace istio-system --values install/kubernetes/helm/istio/values-istio-demo.yaml | kubectl delete -f -
kubectl delete namespace istio-system
```

Deleting CRDs and Istio Configuration
```sh
kubectl delete -f install/kubernetes/helm/istio-init/files
```

# Installing Bookinfo application

to install the bookinfo application, see [here](https://istio.io/docs/examples/bookinfo/).

the bookinfo sample app will de deployed to default namespace.

## login to ICP

```sh
cloudctl login -a https://<ICP-URL>:8443 -u admin -p <password>
```

## set auto injection of sidecar of istio
```sh
kubectl label namespace default istio-injection=enabled
```

## deploy the bookinfo app

```sh
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
```

if you encountered similar output, you will need to create a image policy where you allows deployment of image from docker.io/istio/ for default namespace.

```sh
Error from server (InternalError): error when creating "samples/bookinfo/platform/kube/bookinfo.yaml": Internal error occurred: admission webhook "trust.hooks.securityenforcement.admission.cloud.ibm.com" denied the request:
Deny "docker.io/istio/examples-bookinfo-details-v1:1.12.0", no matching repositories in ClusterImagePolicy and no ImagePolicies in the "default" namespace
Error from server (InternalError): error when creating "samples/bookinfo/platform/kube/bookinfo.yaml": Internal error occurred: admission webhook "trust.hooks.securityenforcement.admission.cloud.ibm.com" denied the request:
Deny "docker.io/istio/examples-bookinfo-ratings-v1:1.12.0", no matching repositories in ClusterImagePolicy and no ImagePolicies in the "default" namespace
Error from server (InternalError): error when creating "samples/bookinfo/platform/kube/bookinfo.yaml": Internal error occurred: admission webhook "trust.hooks.securityenforcement.admission.cloud.ibm.com" denied the request:
Deny "docker.io/istio/examples-bookinfo-reviews-v1:1.12.0", no matching repositories in ClusterImagePolicy and no ImagePolicies in the "default" namespace
Error from server (InternalError): error when creating "samples/bookinfo/platform/kube/bookinfo.yaml": Internal error occurred: admission webhook "trust.hooks.securityenforcement.admission.cloud.ibm.com" denied the request:
Deny "docker.io/istio/examples-bookinfo-reviews-v2:1.12.0", no matching repositories in ClusterImagePolicy and no ImagePolicies in the "default" namespace
Error from server (InternalError): error when creating "samples/bookinfo/platform/kube/bookinfo.yaml": Internal error occurred: admission webhook "trust.hooks.securityenforcement.admission.cloud.ibm.com" denied the request:
Deny "docker.io/istio/examples-bookinfo-reviews-v3:1.12.0", no matching repositories in ClusterImagePolicy and no ImagePolicies in the "default" namespace
Error from server (InternalError): error when creating "samples/bookinfo/platform/kube/bookinfo.yaml": Internal error occurred: admission webhook "trust.hooks.securityenforcement.admission.cloud.ibm.com" denied the request:
Deny "docker.io/istio/examples-bookinfo-productpage-v1:1.12.0", no matching repositories in ClusterImagePolicy and no ImagePolicies in the "default" namespace
```

### verify all services and pods are running

```sh
kubectl get services
```

you should see similar output below

```sh
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
details       ClusterIP   192.168.0.171   <none>        9080/TCP   12m
kubernetes    ClusterIP   192.168.0.1     <none>        443/TCP    3d2h
productpage   ClusterIP   192.168.0.74    <none>        9080/TCP   12m
ratings       ClusterIP   192.168.0.20    <none>        9080/TCP   12m
reviews       ClusterIP   192.168.0.53    <none>        9080/TCP   12m
```

```sh
kubectl get pods
```

you should see similar output below

```sh
NAME                              READY   STATUS    RESTARTS   AGE
details-v1-59489d6fb6-8mzrh       2/2     Running   0          8m46s
productpage-v1-689ff955c6-bwppg   2/2     Running   0          8m45s
ratings-v1-85f65447f4-n6dr4       2/2     Running   0          8m46s
reviews-v1-657b76fc99-92ctp       2/2     Running   0          8m46s
reviews-v2-5cfcfb547f-8zc94       2/2     Running   0          8m45s
reviews-v3-75b4759787-6kg84       2/2     Running   0          8m45s
```

### verify application is running

```sh
kubectl exec -it $(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}') -c ratings -- curl productpage:9080/productpage | grep -o "<title>.*</title>"
```

you should see similar output below

```sh
<title>Simple Bookstore App</title>
```

## make the application accessbile outside of ICP

```sh
kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
```

### verify gateway is running

```sh
kubectl get gateway
```

### determine ingress IP and ports

to learn about [getting ingress](https://istio.io/docs/tasks/traffic-management/ingress/ingress-control/#determining-the-ingress-ip-and-ports) IP and ports.

```sh
kubectl get svc istio-ingressgateway -n istio-system
```

set the ingress PORTS

```sh
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')
```

set the ingress HOST IP

when you use the following command on ICP it will returns the private IP of a worker node.
```sh
export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
```

to set the ingress host, use the public IP of ICP  e.g. 161.202.177.51
```sh
export INGRESS_HOST=161.202.177.51
```

set the gateway URL

```sh
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
echo $GATEWAY_URL

161.202.177.51:31380
```

Confirm the app is accessible from outside the cluster

```sh
curl -s http://${GATEWAY_URL}/productpage | grep -o "<title>.*</title>"

<title>Simple Bookstore App</title>
```

to access the application from browser

```sh
http://161.202.177.51:31380/productpage
```

refresh the browser a number of times, you will see the reviewer route to different with stars in different colour.

1. NO stars shown - v1
2. BLACK stars - v2
3. RED stars - v3

check out the end to end [architecture](https://istio.io/docs/examples/bookinfo/).

## define default routing rules to control routing

```sh
kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml
```

# clean up the app

```sh
samples/bookinfo/platform/kube/cleanup.sh
```

## To install Knative, first install the CRDs 

```sh
kubectl apply --selector knative.dev/crd-install=true \
   --filename https://github.com/knative/serving/releases/download/v0.7.0/serving.yaml \
   --filename https://github.com/knative/build/releases/download/v0.7.0/build.yaml \
   --filename https://github.com/knative/eventing/releases/download/v0.7.0/release.yaml \
   --filename https://github.com/knative/serving/releases/download/v0.7.0/monitoring.yaml


customresourcedefinition.apiextensions.k8s.io/certificates.networking.internal.knative.dev created
customresourcedefinition.apiextensions.k8s.io/clusteringresses.networking.internal.knative.dev created
customresourcedefinition.apiextensions.k8s.io/configurations.serving.knative.dev created
customresourcedefinition.apiextensions.k8s.io/images.caching.internal.knative.dev created
customresourcedefinition.apiextensions.k8s.io/ingresses.networking.internal.knative.dev created
customresourcedefinition.apiextensions.k8s.io/podautoscalers.autoscaling.internal.knative.dev created
customresourcedefinition.apiextensions.k8s.io/revisions.serving.knative.dev created
customresourcedefinition.apiextensions.k8s.io/routes.serving.knative.dev created
customresourcedefinition.apiextensions.k8s.io/services.serving.knative.dev created
customresourcedefinition.apiextensions.k8s.io/serverlessservices.networking.internal.knative.dev created
customresourcedefinition.apiextensions.k8s.io/builds.build.knative.dev created
customresourcedefinition.apiextensions.k8s.io/buildtemplates.build.knative.dev created
customresourcedefinition.apiextensions.k8s.io/clusterbuildtemplates.build.knative.dev created
customresourcedefinition.apiextensions.k8s.io/images.caching.internal.knative.dev unchanged
customresourcedefinition.apiextensions.k8s.io/apiserversources.sources.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/brokers.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/channels.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/clusterchannelprovisioners.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/containersources.sources.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/cronjobsources.sources.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/eventtypes.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/sequences.messaging.knative.dev created
customresourcedefinition.apiextensions.k8s.io/subscriptions.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/triggers.eventing.knative.dev created
customresourcedefinition.apiextensions.k8s.io/inmemorychannels.messaging.knative.dev created
unable to recognize "https://github.com/knative/serving/releases/download/v0.7.0/serving.yaml": no matches for kind "Image" in version "caching.internal.knative.dev/v1alpha1"
unable to recognize "https://github.com/knative/build/releases/download/v0.7.0/build.yaml": no matches for kind "Image" in version "caching.internal.knative.dev/v1alpha1"
unable to recognize "https://github.com/knative/build/releases/download/v0.7.0/build.yaml": no matches for kind "Image" in version "caching.internal.knative.dev/v1alpha1"
unable to recognize "https://github.com/knative/build/releases/download/v0.7.0/build.yaml": no matches for kind "Image" in version "caching.internal.knative.dev/v1alpha1"
unable to recognize "https://github.com/knative/build/releases/download/v0.7.0/build.yaml": no matches for kind "Image" in version "caching.internal.knative.dev/v1alpha1"
unable to recognize "https://github.com/knative/eventing/releases/download/v0.7.0/release.yaml": no matches for kind "ClusterChannelProvisioner" in version "eventing.knative.dev/v1alpha1"
```

```sh
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.7.0/serving.yaml --selector networking.knative.dev/certificate-provider!=cert-manager \
   --filename https://github.com/knative/build/releases/download/v0.7.0/build.yaml \
   --filename https://github.com/knative/eventing/releases/download/v0.7.0/release.yaml \
   --filename https://github.com/knative/serving/releases/download/v0.7.0/monitoring.yaml
```

monitor until all shows status RUNNING

```sh
   kubectl get pods --namespace knative-serving

 NAME                                READY   STATUS    RESTARTS   AGE
activator-7ccd4596b8-8d9k9          2/2     Running   0          66s
autoscaler-6b4d67c594-ws4jx         2/2     Running   0          66s
controller-fd79f8496-rspf2          1/1     Running   0          66s
networking-istio-55f6f4977c-9wb96   1/1     Running   0          65s
webhook-f94b6bd64-zzbv9             1/1     Running   0          64s

   kubectl get pods --namespace knative-build

build-controller-757f8dfd5d-zmsb5   1/1     Running   0          73s
build-webhook-5c9544b88b-4xwk5      1/1     Running   0          73s

   kubectl get pods --namespace knative-eventing

eventing-controller-99dd9f59-vbsh9              1/1     Running   0          103s
eventing-webhook-67bd87f5c9-w2dqq               1/1     Running   0          103s
imc-controller-7f669fd567-6jr9f                 1/1     Running   0          102s
imc-dispatcher-7c89b8c4f8-4p2st                 1/1     Running   0          101s
in-memory-channel-controller-7fcb7b8659-tmxlb   1/1     Running   0          100s
in-memory-channel-dispatcher-5ccb5568b9-g6xg9   1/1     Running   0          100s
sources-controller-69c7bdf746-lshfr             1/1     Running   0          103s


   kubectl get pods --namespace knative-sources

 No resources found.  
   
   kubectl get pods --namespace knative-monitoring
```

## destroy

```sh
kubectl delete --selector knative.dev/crd-install=true \
   --filename https://github.com/knative/serving/releases/download/v0.7.0/serving.yaml \
   --filename https://github.com/knative/build/releases/download/v0.7.0/build.yaml \
   --filename https://github.com/knative/eventing/releases/download/v0.7.0/release.yaml \
   --filename https://github.com/knative/serving/releases/download/v0.7.0/monitoring.yaml
```

```sh
kubectl delete --filename https://github.com/knative/serving/releases/download/v0.7.0/serving.yaml --selector networking.knative.dev/certificate-provider!=cert-manager \
   --filename https://github.com/knative/build/releases/download/v0.7.0/build.yaml \
   --filename https://github.com/knative/eventing/releases/download/v0.7.0/release.yaml \
   --filename https://github.com/knative/serving/releases/download/v0.7.0/monitoring.yaml
```

## verify all shutdown

```sh
kubectl get virtualservices   #-- there should be no virtual services
kubectl get destinationrules  #-- there should be no destination rules
kubectl get gateway           #-- there should be no gateway
kubectl get pods               #-- the Bookinfo pods should be deleted
```

# Request routing of application version

follow the instruction to test out [request routing](https://istio.io/docs/tasks/traffic-management/request-routing/).


# Install knative

the steps is based on install knative [here](https://knative.dev/docs/install/knative-with-any-k8s/).

# deploy knative app

nodePort
IP: master node IP

```sh
curl -H "Host: helloworld-go.default.example.com" http://161.202.177.51:31380

Hello Go Sample v1!
```

## create istio service account

```sh
kubectl apply -f ../k8s/istio/service-account.yaml
```

you should see similar output as follows

```sh
clusterrolebinding.rbac.authorization.k8s.io/istio-privileged-users created
```
