# Commit

### Crear un contenedor
```
docker run -d --name server-nginx -p 5000:80 nginx:alpine
```

### Convertir un contenedor en una imagen
```
docker commit <nombre o token del contenedor> <nombre de la nueva imagen>
```