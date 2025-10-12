# Drupal

### Crear la red
```
docker network create net-drupal -d bridge
```

### Crear volúmenes
```
docker volume create vol-drupal-mysql
docker volume create vol-drupal-modules
docker volume create vol-drupal-profiles
docker volume create vol-drupal-sites
docker volume create vol-drupal-themes
```

### Crear contenedor de MySQL
```
docker run -d \
    --name server-mysql \
    -e MYSQL_ROOT_PASSWORD=12345 \
    -e MYSQL_DATABASE=cursosdev \
    -e MYSQL_USER=user \
    -e MYSQL_PASSWORD=12345 \
    -v vol-drupal-mysql:/var/lib/mysql \
    --network net-drupal \
    mysql:8
```

### Crear contenedor de Drupal
```
docker run -d \
    --name server-drupal \
	-v vol-drupal-modules:/var/www/html/modules \
	-v vol-drupal-profiles:/var/www/html/profiles \
	-v vol-drupal-sites:/var/www/html/sites \
	-v vol-drupal-themes:/var/www/html/themes \
    -p 9000:80 \
    --network net-drupal \
    drupal
```
