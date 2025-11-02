# Certificados

### Certificado privado
```
openssl genrsa -out course19.key 2048
```

### Crear la solicitud
```
openssl req -new -key course19.key -out course19.csr -subj "/CN=course19/O=developers"
```

### Crear el certificado final
```
openssl x509 -req -in course19.csr -CA \\wsl.localhost\docker-desktop\tmp\docker-desktop-root\run\config\pki\ca.crt -CAkey \\wsl.localhost\docker-desktop\tmp\docker-desktop-root\run\config\pki\ca.key -CAcreateserial -out course19.crt --days 365
```