# Contextos

### Visualizar la información de los contextos
```
kubectl config view
```
### Crear un contexto
```
kubectl config set-context course19-ctx --user course19 --cluster docker-desktop
```
### Cambiar de contexto
```
kubectl config use-context course19-ctx
```