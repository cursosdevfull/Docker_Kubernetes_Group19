# React

### Crear el contenedor
```
docker run -d \
    --name server-react \
    --publish published=9000,target=80 \
    --mount type=bind,source=$(pwd -W)/dist,target=/usr/share/nginx/html \
    nginx:alpine
```