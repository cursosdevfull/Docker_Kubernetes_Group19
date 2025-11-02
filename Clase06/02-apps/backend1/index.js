
const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const axios = require("axios")

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4500;

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'db',
    port: process.env.DB_PORT || 3306
};

// Root endpoint
app.get('/', (req, res) => {
    res.send('Backend1 running');
});

// Healthcheck endpoint
app.get('/healthcheck', (req, res) => {
    res.json({ status: 'ok' });
});

// Endpoint to create table and insert products
app.get('/api/init-products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        await connection.execute(`CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255),
      precio DECIMAL(10,2),
      descripcion TEXT
    )`);
        // Insert 10 products with real data
        const products = [
            ['iPhone 15 Pro', 999.99, 'Smartphone Apple con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.1 pulgadas'],
            ['Samsung Galaxy S24', 799.99, 'Teléfono Android con procesador Snapdragon 8 Gen 3, cámara triple de 50MP y pantalla Dynamic AMOLED 2X'],
            ['MacBook Air M3', 1299.99, 'Laptop ultra delgada con chip Apple M3, pantalla Liquid Retina de 13.6 pulgadas y hasta 18 horas de batería'],
            ['Sony WH-1000XM5', 399.99, 'Auriculares inalámbricos con cancelación de ruido líder en la industria y calidad de sonido premium'],
            ['Nintendo Switch OLED', 349.99, 'Consola de videojuegos híbrida con pantalla OLED de 7 pulgadas y controles Joy-Con desmontables'],
            ['iPad Pro 12.9"', 1099.99, 'Tablet profesional con chip M2, pantalla Liquid Retina XDR y compatibilidad con Apple Pencil'],
            ['AirPods Pro 2', 249.99, 'Auriculares inalámbricos con cancelación activa de ruido, audio espacial y estuche de carga MagSafe'],
            ['Dell XPS 13', 999.99, 'Laptop ultrabook con procesador Intel Core i7, 16GB RAM y pantalla InfinityEdge de 13.4 pulgadas'],
            ['Apple Watch Series 9', 399.99, 'Smartwatch con GPS, monitor de salud avanzado, pantalla Always-On Retina y resistencia al agua'],
            ['Google Pixel 8 Pro', 899.99, 'Smartphone Android con cámara AI avanzada, procesador Google Tensor G3 y pantalla LTPO OLED de 6.7 pulgadas']
        ];
        await connection.query('DELETE FROM productos');
        await connection.query('ALTER TABLE productos AUTO_INCREMENT = 1');
        for (const [nombre, precio, descripcion] of products) {
            await connection.execute('INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)', [nombre, precio, descripcion]);
        }
        await connection.end();
        res.json({ status: 'ok', message: 'Tabla creada y productos insertados' });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Endpoint to get products (half from backend1, half from backend2)
app.get('/api/productos', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT * FROM productos LIMIT 5');
        await connection.end();
        // Get the rest from backend2
        const { data } = await axios.get(process.env.BACKEND2_URL || "http://localhost:5000/api/productos");
        res.json([...rows, ...data]);
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend1 listening on port ${PORT}`);
});
