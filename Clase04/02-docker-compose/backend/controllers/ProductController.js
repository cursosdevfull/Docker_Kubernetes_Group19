const Product = require('../models/Product');

class ProductController {
    static getAllProducts(req, res) {
        Product.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving products', details: err.message });
            }
            res.json({ success: true, data: results });
        });
    }

    static getProductById(req, res) {
        const { id } = req.params;
        Product.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving product', details: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ success: true, data: results[0] });
        });
    }

    static createProduct(req, res) {
        const { name, description, price, category, stock } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }

        const productData = { name, description, price, category, stock };
        Product.create(productData, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating product', details: err.message });
            }
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: { id: results.insertId, ...productData }
            });
        });
    }

    static updateProduct(req, res) {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }

        const productData = { name, description, price, category, stock };
        Product.update(id, productData, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating product', details: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({
                success: true,
                message: 'Product updated successfully',
                data: { id, ...productData }
            });
        });
    }

    static deleteProduct(req, res) {
        const { id } = req.params;
        Product.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting product', details: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ success: true, message: 'Product deleted successfully' });
        });
    }
}

module.exports = ProductController;