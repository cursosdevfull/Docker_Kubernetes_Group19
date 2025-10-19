-- Script para insertar 20 productos de ejemplo
USE db_products;

INSERT INTO products (name, description, price, category, stock) VALUES
('Laptop Gaming ASUS ROG', 'Laptop de alta gama para gaming con RTX 4060, 16GB RAM, SSD 512GB', 1299.99, 'Electrónicos', 15),
('iPhone 15 Pro', 'Smartphone Apple con chip A17 Pro, 128GB de almacenamiento', 999.99, 'Electrónicos', 25),
('Mesa de Oficina Ergonómica', 'Mesa ajustable en altura para trabajo desde casa', 299.99, 'Muebles', 8),
('Silla Gaming RGB', 'Silla ergonómica con iluminación LED y soporte lumbar', 199.99, 'Muebles', 12),
('Auriculares Sony WH-1000XM5', 'Auriculares inalámbricos con cancelación de ruido', 349.99, 'Electrónicos', 30),
('Teclado Mecánico RGB', 'Teclado gaming con switches Cherry MX Blue', 129.99, 'Electrónicos', 20),
('Monitor 4K 27 pulgadas', 'Monitor profesional para diseño y gaming', 449.99, 'Electrónicos', 10),
('Cafetera Espresso DeLonghi', 'Máquina de café espresso automática', 789.99, 'Electrodomésticos', 6),
('Licuadora Vitamix', 'Licuadora profesional de alta potencia', 399.99, 'Electrodomésticos', 14),
('Aspiradora Robot Roomba', 'Robot aspirador inteligente con mapeo láser', 599.99, 'Electrodomésticos', 18),
('Camiseta Nike Dri-FIT', 'Camiseta deportiva de secado rápido', 29.99, 'Ropa', 50),
('Zapatillas Adidas Ultraboost', 'Zapatillas para running con tecnología Boost', 189.99, 'Ropa', 35),
('Jeans Levis 501', 'Pantalones vaqueros clásicos de corte recto', 89.99, 'Ropa', 40),
('Chaqueta North Face', 'Chaqueta impermeable para actividades al aire libre', 199.99, 'Ropa', 22),
('Libro "Clean Code"', 'Guía para escribir código limpio y mantenible', 39.99, 'Libros', 100),
('Novela "Cien años de soledad"', 'Obra maestra de Gabriel García Márquez', 19.99, 'Libros', 75),
('Cookbook "Salt, Fat, Acid, Heat"', 'Libro de cocina con técnicas fundamentales', 29.99, 'Libros', 45),
('Planificador 2024', 'Agenda anual con diseño minimalista', 24.99, 'Papelería', 60),
('Set de Bolígrafos Pilot', 'Conjunto de 12 bolígrafos de gel de colores', 15.99, 'Papelería', 80),
('Cuaderno Moleskine', 'Cuaderno de tapa dura con hojas punteadas', 19.99, 'Papelería', 90);