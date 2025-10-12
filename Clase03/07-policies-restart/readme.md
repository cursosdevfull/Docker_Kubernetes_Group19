# Policies Restart

### Reinicia en caso ocurra un error o una falla
```
docker run -d \
    --name server-nginx \
    --restart on-failure \
    nginx:alpine \
    sh -c "exit 1"
```

### Reinicia siempre a menos que lo detenga manualmente
```
docker run -d \
    --name server-nginx \
    --restart unless-stopped \
    nginx:alpine \
    sh -c "sleep 5; exit 1"
```

### Reinicia siempre
```
docker run -d \
    --name server-nginx \
    --restart always \
    nginx:alpine \
    sh -c "sleep 5; exit 1"
```