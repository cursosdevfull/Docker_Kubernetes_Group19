# MySQL

### Server
```
docker run -d --name server-mysql -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=cursosdev -e MYSQL_USER=user -e MYSQL_PASSWORD=12345 -p 3310:3306 mysql:8
```
### Client
```
docker run -d --name client-mysql -e PMA_ARBITRARY=1 -p 8090:80 phpmyadmin
docker run -d --name client-mysql -e PMA_HOST=172.17.0.2 -e PMA_USER=user -e PMA_PASSWORD=12345 -p 8090:80 phpmyadmin
```