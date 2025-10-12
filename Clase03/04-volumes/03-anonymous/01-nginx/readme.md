# NGINX con volumen anónimo
```
docker run -d \
    --name server-nginx \
    -p 9000:80 \
    -v /usr/share/nginx/html \
    nginx:alpine
```