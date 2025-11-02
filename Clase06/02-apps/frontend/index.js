const express = require("express")
const cors = require("cors")
const path = require("path")
const favicon = require('serve-favicon')

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Serve static files from public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get backend1 address
app.get('/api/config', (req, res) => {
    // In Docker Compose, use the service name as hostname
    res.json({ backend1: process.env.BACKEND1_URL || "http://localhost:4500/api/productos" });
});


// Root endpoint
app.get('/', (req, res) => {
    res.send('Frontend running');
});

// Healthcheck endpoint
app.get('/healthcheck', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Frontend listening on port ${PORT}`);
});
