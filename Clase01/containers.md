# Contenedores

### Listar contenedores que se están ejecutando
```
docker ps
```

### Listar contenedores
```
docker ps -a
```
### Filtrar contenedores
```
docker ps -a | grep hello
```
### Crear un contenedor con mapeo de puertos y con nombre
```
docker run -d --name server-nginx -p 9000:80 nginx:alpine
```
### Eliminar contenedor
```
docker rm <nombre contenedor>
```
### Detener contenedor
```
docker stop <nombre contenedor>
```
### Forzar la eliminación de un contenedor
```
docker rm -f <nombre contenedor>
```
### Eliminar varios contenedores
```
docker rm -f <nombre contenedor 1> <nombre contenedor2> <nombre contenedor3>
```
### Inspeccionar un contenedor
```
docker inspect <nombre contenedor>
```