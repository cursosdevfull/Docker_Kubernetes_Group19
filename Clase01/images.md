# Imágenes

### Listar
```
docker images
docker image ls
```
### Filtrar lista de imágenes
```
docker images | grep nginx
docker image ls | grep nginx
```
### Inspeccionar una imagen
```
docker image inspect nginx:alpine
```
### Descargar una imagen
```
docker pull <nombre de la imagen>:<tag o versión de la imagen>
```
### Descargar imagen desde un repositorio diferente a Docker Hub
```
docker pull public.ecr.aws/lambda/nodejs:22
```
### Eliminar una imagen
```
docker rmi <nombre de la imagen>:<tag de la imagen>
docker rmi -f <nombre de la imagen>:<tag de la imagen>
``` 