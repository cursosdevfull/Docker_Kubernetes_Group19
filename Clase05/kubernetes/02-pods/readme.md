# Pods

### Crear un pod
```
kubectl run server-web --image=nginx:alpine
```

### Listar los pods
```
kubectl get pods
kubectl get po
```

### Port forward
```
kubectl port-forward <nombre del pod> <puerto host>:<puerto del pod>
```

### Ejecutar un manifiesto
```
kubectl apply -f <nombre carpeta>/<nombre del manifiesto>
```

### Eliminar un pod
```
kubectl delete pod pod-nginx
kubectl delete -f <nombre carpeta>/<nombre del manifiesto>
```

### Obtener información de un pod
```
kubectl describe po rs-nginx-blmmv
```

### Listar pods mostrando sus etiquetas
```
kubectl get po --show-labels
```

### Acceder al contenedor de un pod
```
kubectl exec -it server-temp -- sh
kubectl exec -it server-temp -c server-temp -- sh
```

### Logs de un pod
```
kubectl logs <nombre del pod>
```