# Postgres

### Server
```
docker run -d --name server-postgres -e POSTGRES_DB=cursosdev -e POSTGRES_USER=user -e POSTGRES_PASSWORD=12345 -p 5432:5432 postgres:13.22-alpine3.21
```

### Client
```
docker run -d --name client-postgres -e PGADMIN_DEFAULT_EMAIL=sergiohidalgocaceres@gmail.com -e PGADMIN_DEFAULT_PASSWORD=12345 -p 8070:80 dpage/pgadmin4:9
```