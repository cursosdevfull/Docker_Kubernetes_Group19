# Healthchecks

### NGINX
```
docker run -d \
    --name server-nginx \
    --health-cmd="curl http://localhost" \
    --health-interval=2s \
    --health-retries=3 \
    --health-timeout=3s \
    --health-start-period=10s \
    nginx:alpine
```

### MySQL
```
docker run -d \
    --name server-mysql \
    -e MYSQL_ROOT_PASSWORD=12345 \
    --health-cmd="mysqladmin ping -h localhost" \
    --health-interval=2s \
    --health-retries=3 \
    --health-timeout=3s \
    --health-start-period=10s \
    mysql:8
```