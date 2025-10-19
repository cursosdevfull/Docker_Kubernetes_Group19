# Products Manager - Frontend

Frontend desarrollado con JavaScript vanilla para la gestión de productos. Se conecta al backend API para realizar operaciones CRUD.

## Características

- ✅ **JavaScript Vanilla** - Sin frameworks ni librerías externas
- ✅ **Interfaz Responsive** - Adaptable a dispositivos móviles
- ✅ **CRUD Completo** - Crear, leer, actualizar y eliminar productos
- ✅ **Búsqueda y Filtros** - Buscar por nombre y filtrar por categoría
- ✅ **Validaciones** - Validación de formularios en tiempo real
- ✅ **Notificaciones** - Sistema de notificaciones toast
- ✅ **Confirmaciones** - Modal de confirmación para eliminaciones
- ✅ **Servido por Express** - Usando express.static

## Estructura del Proyecto

```
frontend/
├── public/
│   ├── index.html          # Página principal
│   ├── styles.css          # Estilos CSS
│   └── script.js           # Lógica JavaScript
├── server.js               # Servidor Express
├── package.json            # Dependencias y scripts
└── README.md              # Documentación
```

## Instalación y Ejecución

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en desarrollo:**
```bash
npm run dev
```

3. **Ejecutar en producción:**
```bash
npm start
```

4. **Abrir en el navegador:**
```
http://localhost:4000
```

## Scripts Disponibles

- `npm start` - Ejecutar servidor en producción
- `npm run dev` - Ejecutar servidor en desarrollo con nodemon

## Funcionalidades de la Interfaz

### 🏠 Página Principal
- Dashboard con información general
- Navegación intuitiva
- Diseño moderno y limpio

### ➕ Agregar Productos
- Formulario completo para nuevos productos
- Validaciones en tiempo real
- Campos: nombre, descripción, precio, categoría, stock

### ✏️ Editar Productos
- Edición inline desde la lista
- Formulario pre-rellenado
- Actualización inmediata

### 🗑️ Eliminar Productos
- Confirmación antes de eliminar
- Modal de confirmación
- Eliminación segura

### 🔍 Búsqueda y Filtros
- Búsqueda por nombre o descripción
- Filtro por categoría
- Filtrado en tiempo real

### 📱 Responsive Design
- Adaptable a móviles y tablets
- Grid responsive
- Formularios optimizados para táctil

## Conexión con el Backend

El frontend se conecta al backend a través de la API REST:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Endpoints Utilizados:

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto específico
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

## Tecnologías Utilizadas

### Frontend:
- **HTML5** - Estructura semántica
- **CSS3** - Estilos y diseño responsive
- **JavaScript ES6+** - Lógica de la aplicación
- **Fetch API** - Comunicación con el backend

### Servidor:
- **Node.js** - Runtime
- **Express** - Servidor web
- **express.static** - Servir archivos estáticos

## Características Técnicas

### 🛡️ Seguridad
- Escape de HTML para prevenir XSS
- Validación de datos del lado cliente
- Manejo seguro de errores

### ⚡ Rendimiento
- Debounce en búsqueda para optimizar requests
- Carga asíncrona de datos
- Interfaz reactiva

### 🎨 UX/UI
- Diseño Material Design inspired
- Animaciones suaves
- Feedback visual inmediato
- Estados de carga y error

### 📱 Responsividad
- Grid CSS para layouts flexibles
- Breakpoints para diferentes dispositivos
- Formularios optimizados para móvil

## Estructura de Datos

### Producto:
```javascript
{
  id: number,
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  created_at: string,
  updated_at: string
}
```

## Configuración

### Puerto del Servidor:
Por defecto el frontend corre en el puerto 4000. Puedes cambiarlo modificando la variable `PORT` en `server.js` o usando una variable de entorno:

```bash
PORT=5000 npm start
```

### URL del Backend:
Si el backend está en otro puerto o servidor, modifica la constante `API_BASE_URL` en `script.js`:

```javascript
const API_BASE_URL = 'http://tu-backend-url:puerto/api';
```

## Desarrollo

### Estructura del Código JavaScript:

1. **Configuración inicial** - Variables globales y configuración
2. **Gestión del DOM** - Elementos y event listeners
3. **API Communication** - Funciones para comunicarse con el backend
4. **UI Management** - Funciones para manejar la interfaz
5. **Utilidades** - Funciones helper y validaciones

### Patrones Utilizados:

- **Module Pattern** - Organización del código
- **Event Delegation** - Manejo eficiente de eventos
- **Async/Await** - Operaciones asíncronas
- **Error Handling** - Manejo robusto de errores

## Health Check

El servidor incluye un endpoint de health check:

```
GET /health
```

Respuesta:
```json
{
  "status": "OK",
  "message": "Frontend server is running"
}
```

## Troubleshooting

### Error de CORS:
Si hay problemas de CORS, asegúrate de que el backend tenga CORS habilitado para `http://localhost:4000`.

### Backend no disponible:
La aplicación mostrará mensajes de error si no puede conectarse al backend. Verifica que el backend esté ejecutándose en `http://localhost:3000`.

### Problemas de red:
La aplicación incluye manejo de errores de red y mostrará notificaciones apropiadas al usuario.