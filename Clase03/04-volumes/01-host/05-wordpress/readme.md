# Wordpress

### Crear una red
```
docker network create net-wp -d bridge
```

### Contenedor de MySQL
```
docker run -d \
    --name server-mysql \
    -e MYSQL_ROOT_PASSWORD=12345 \
    -e MYSQL_DATABASE=cursosdev \
    -e MYSQL_USER=user \
    -e MYSQL_PASSWORD=12345 \
    -v $(pwd -W)/data:/var/lib/mysql \
    --network net-wp \
    mysql:8
```

### Contenedor de Wordpress
```
docker run -d \
    --name server-wordpress \
    -e WORDPRESS_DB_HOST=server-mysql \
    -e WORDPRESS_DB_USER=user \
    -e WORDPRESS_DB_PASSWORD=12345 \
    -e WORDPRESS_DB_NAME=cursosdev \
    -p 9000:80 \
    -v $(pwd -W)/wp:/var/www/html \
    --network net-wp \
    wordpress
```