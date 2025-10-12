# Segregación por red

### Crear las redes
```
docker network create net-app01 -d bridge
docker network create net-app02 -d bridge
```

### Crear los contenedores
```
docker run -d --name frontend -p 8050:80 --network net-app01 nginx:alpine
docker run -d --name backend --network net-app01 --network net-app02 nginx:alpine
docker run -d --name database --network net-app02 nginx:alpine
```


- Crear 3 contenedores: frontend, backend, database (usar nginx)
- Frontend solo puede ver a backend
- Database solo puede ver a backend
- Backend puede ver a frontend y a backend
- Cualquier aplicación solo podrá conectarse al frontend y no a backend ni database