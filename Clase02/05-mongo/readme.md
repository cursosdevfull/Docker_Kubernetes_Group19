# Mongo

### Server
```
docker run -d --name server-mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=12345 -p 27017:27017 mongo
```

### Client
```
docker run -d --name client-mongo \
    -e ME_CONFIG_BASICAUTH_USERNAME=ui \
    -e ME_CONFIG_BASICAUTH_PASSWORD=12345 \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=12345 \
    -e ME_CONFIG_MONGODB_SERVER=172.17.0.6 \
    -p 8060:8081 \
    mongo-express:1.0.2-20-alpine3.19
```