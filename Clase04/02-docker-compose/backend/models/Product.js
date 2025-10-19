const db = require('../config/database');

class Product {
    static getAll(callback) {
        db.query('SELECT * FROM products', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM products WHERE id = ?', [id], callback);
    }

    static create(productData, callback) {
        const { name, description, price, category, stock } = productData;
        db.query(
            'INSERT INTO products (name, description, price, category, stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
            [name, description, price, category, stock],
            callback
        );
    }

    static update(id, productData, callback) {
        const { name, description, price, category, stock } = productData;
        db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ?, stock = ?, updated_at = NOW() WHERE id = ?',
            [name, description, price, category, stock, id],
            callback
        );
    }

    static delete(id, callback) {
        db.query('DELETE FROM products WHERE id = ?', [id], callback);
    }
}

module.exports = Product;