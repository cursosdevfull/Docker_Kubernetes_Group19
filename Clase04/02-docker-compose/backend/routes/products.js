const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// GET /api/products - Obtener todos los productos
router.get('/', ProductController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', ProductController.getProductById);

// POST /api/products - Crear un nuevo producto
router.post('/', ProductController.createProduct);

// PUT /api/products/:id - Actualizar un producto
router.put('/:id', ProductController.updateProduct);

// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;