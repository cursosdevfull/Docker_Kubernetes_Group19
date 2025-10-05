# Networks

### Listar
```
docker network ls
```

### Crear
```
docker network create <nombre de la red> --driver bridge
docker network create <nombre de la red> -d bridge
```
### Asociar red en la creación de un contenedor
```
docker run -d --name server-nginx --network <nombre de la red> nginx:alpine
```

### Asociar un contenedor existente a una red
```
docker network connect <nombre de la red> <nombre del contenedor>
```
### Crear un contenedor conectado a más de una red
```
docker run -d --name server-web --network net-01 --network net-02 nginx:alpine
```
### Inspeccionar una red
```
docker network inspect net-01
```

### Crear una red con gateway y subnet
```
docker network create net-03 -d bridge --gateway 160.25.0.1 --subnet 160.25.0.0/16
```
### Crear un contenedor con un ip específico
```
docker run -d --name server-web4 --network net-03 --ip 160.25.3.10 nginx:alpine
```

### Desconectar red de un contenedor
```
docker network disconnect <nombre de red> <nombre del contenedor>
```