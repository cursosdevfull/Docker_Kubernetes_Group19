# MySQL

### Crear un contenedor con volumen host
```
docker run -d \
    --name server-mysql \
    -e MYSQL_ROOT_PASSWORD=12345 \
    -v $(pwd -W)/data:/var/lib/mysql \
    mysql:8
```