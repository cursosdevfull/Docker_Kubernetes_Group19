# Apache (Server web)

### Pasos
- Obtener el instalador del sistema operativo (Ubuntu) e instalarlo
- Actualizar los repositorios
- Instalar Apache
- Copiar los archivos desde la carpeta "mi-web" hacia el directorio por defecto de Apache
- Iniciar Apache

### Crear la imagen
```
docker build -t image-apache:1.0 .
```

### Crear imagen usando un Dockerfile en otra carpeta
```
docker build -f 01-apache/Dockerfile -t image-apache:1.0 .
```

### Crear imagen usando un contexto diferente al punto
```
docker build -f 01-apache/Dockerfile -t image-apache:1.0 01-apache
```
### Crear una imagen usando un archivo Dockerfile con otro nombre
```
docker build -f 01-apache/Dockerfile-optimizado -t image-apache:1.0 01-apache
```
