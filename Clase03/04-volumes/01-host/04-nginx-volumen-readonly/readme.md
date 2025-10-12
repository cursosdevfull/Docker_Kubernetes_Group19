# NGINX Personalizado

```
docker run -d \
    --name server-nginx \
    -p 9000:80 \
    -v $(pwd -W)/html:/app:ro \
    -v $(pwd -W)/config/nginx.conf:/etc/nginx/conf.d/default.conf:ro \
    nginx:alpine
```