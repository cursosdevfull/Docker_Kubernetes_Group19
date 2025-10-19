# Products API - Backend

API REST para gestión de productos construida con Node.js, Express y MySQL.

## Características

- CRUD completo para productos
- Conexión a base de datos MySQL usando mysql2
- Validación de datos
- Manejo de errores
- Endpoints RESTful

## Estructura del Proyecto

```
backend/
├── config/
│   └── database.js          # Configuración de la base de datos
├── controllers/
│   └── ProductController.js # Controlador de productos
├── models/
│   └── Product.js          # Modelo de productos
├── routes/
│   └── products.js         # Rutas de productos
├── sql/
│   ├── create_table.sql    # Script para crear la tabla
│   └── insert_products.sql # Script con 20 productos de ejemplo
├── .env                    # Variables de entorno
├── index.js               # Archivo principal del servidor
└── package.json          # Dependencias y scripts
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Copiar `.env` y ajustar las credenciales de la base de datos
   - Por defecto: host=localhost, port=3306, user=root, password=password, database=products_db

3. Ejecutar scripts de base de datos:
   - `sql/create_table.sql` - Crear base de datos y tabla
   - `sql/insert_products.sql` - Insertar productos de ejemplo

## Scripts Disponibles

- `npm start` - Ejecutar en producción
- `npm run dev` - Ejecutar en desarrollo con nodemon

## API Endpoints

### GET /api/products
Obtener todos los productos
```json
{
  "success": true,
  "data": [...]
}
```

### GET /api/products/:id
Obtener un producto por ID
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Producto ejemplo",
    "description": "Descripción del producto",
    "price": 99.99,
    "category": "Categoría",
    "stock": 10,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /api/products
Crear un nuevo producto
```json
// Request body
{
  "name": "Nuevo producto",
  "description": "Descripción opcional",
  "price": 99.99,
  "category": "Categoría opcional",
  "stock": 10
}

// Response
{
  "success": true,
  "message": "Product created successfully",
  "data": { ... }
}
```

### PUT /api/products/:id
Actualizar un producto existente
```json
// Request body
{
  "name": "Producto actualizado",
  "description": "Nueva descripción",
  "price": 149.99,
  "category": "Nueva categoría",
  "stock": 5
}

// Response
{
  "success": true,
  "message": "Product updated successfully",
  "data": { ... }
}
```

### DELETE /api/products/:id
Eliminar un producto
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Modelo de Datos

### Tabla: products

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT AUTO_INCREMENT | Identificador único |
| name | VARCHAR(255) | Nombre del producto (requerido) |
| description | TEXT | Descripción del producto |
| price | DECIMAL(10,2) | Precio del producto (requerido) |
| category | VARCHAR(100) | Categoría del producto |
| stock | INT | Cantidad en inventario |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de última actualización |

## Validaciones

- `name` y `price` son campos obligatorios
- `price` debe ser un número decimal
- `stock` debe ser un número entero

## Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MySQL2** - Driver de MySQL para Node.js
- **dotenv** - Gestión de variables de entorno
- **cors** - Middleware para habilitar CORS
- **nodemon** - Herramienta de desarrollo para reinicio automático

## Health Check

La aplicación incluye un endpoint de health check:

### GET /health
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Configuración de Base de Datos

Asegúrate de tener MySQL ejecutándose y crear la base de datos con los scripts SQL proporcionados:

```sql
-- Crear base de datos
CREATE DATABASE products_db;

-- Usar la base de datos
USE products_db;

-- Ejecutar create_table.sql
-- Ejecutar insert_products.sql (opcional)
```