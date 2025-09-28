# Clase 01 - Introducción a Docker

Esta sección contiene material sobre los fundamentos de Docker, incluyendo el manejo de contenedores, imágenes y la implementación de servicios comunes.

## Contenido

### Conceptos Básicos
- [Contenedores](containers.md): Comandos esenciales para gestionar contenedores Docker
- [Imágenes](images.md): Comandos para trabajar con imágenes Docker

### Servicios implementados con Docker
- [RabbitMQ](01-rabbitmq/readme.md): Implementación de un servidor RabbitMQ
- [SonarQube](02-sonarqube/readme.md): Implementación de un servidor SonarQube
- [NATS](03-nats/readme.md): Implementación de un servidor NATS
- [Jenkins](04-jenkins/readme.md): Implementación de un servidor Jenkins

## Resumen de comandos importantes

### Gestión de contenedores
```bash
# Listar contenedores en ejecución
docker ps

# Listar todos los contenedores (incluidos los detenidos)
docker ps -a

# Crear un contenedor con mapeo de puertos
docker run -d --name server-nginx -p 9000:80 nginx:alpine

# Detener un contenedor
docker stop <nombre_contenedor>

# Eliminar un contenedor
docker rm <nombre_contenedor>

# Eliminar un contenedor en ejecución
docker rm -f <nombre_contenedor>

# Inspeccionar un contenedor
docker inspect <nombre_contenedor>
```

### Gestión de imágenes
```bash
# Listar imágenes
docker images

# Descargar una imagen
docker pull <nombre_imagen>:<tag>

# Inspeccionar una imagen
docker image inspect <nombre_imagen>:<tag>

# Eliminar una imagen
docker rmi <nombre_imagen>:<tag>
```

## Ejemplos de implementación

### RabbitMQ
```bash
docker run -d --name server-rabbitmq -p 9000:15672 -p 8080:5672 rabbitmq:management-alpine
```

### SonarQube
```bash
docker run --name server-sonarqube -p 9000:9000 -p 9092:9092 sonarqube:community
```

### NATS
```bash
docker run -d --name server-nats -p 9000:8222 -p 8000:4222 nats:alpine
```
