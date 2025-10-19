// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Estado de la aplicación
let products = [];
let editingProductId = null;

// Elementos del DOM
const productForm = document.getElementById('product-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const refreshBtn = document.getElementById('refresh-btn');
const productsContainer = document.getElementById('products-container');
const loadingDiv = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const confirmModal = document.getElementById('confirm-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Variables para el modal de confirmación
let productToDelete = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    loadProducts();
});

// Configurar event listeners
function setupEventListeners() {
    productForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    searchInput.addEventListener('input', debounce(filterProducts, 300));
    categoryFilter.addEventListener('change', filterProducts);
    refreshBtn.addEventListener('click', loadProducts);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', closeConfirmModal);

    // Cerrar modal al hacer clic fuera
    confirmModal.addEventListener('click', function (e) {
        if (e.target === confirmModal) {
            closeConfirmModal();
        }
    });
}

// Función debounce para optimizar la búsqueda
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cargar productos desde la API
async function loadProducts() {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(`${API_BASE_URL}/products`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
            products = data.data;
            updateCategoryFilter();
            renderProducts(products);
            showToast('Productos cargados exitosamente', 'success');
        } else {
            throw new Error('Formato de respuesta inválido');
        }

    } catch (error) {
        console.error('Error loading products:', error);
        showError(`Error al cargar productos: ${error.message}`);
        products = [];
        renderProducts([]);
    } finally {
        showLoading(false);
    }
}

// Mostrar/ocultar loading
function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
}

// Mostrar error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Ocultar error
function hideError() {
    errorMessage.style.display = 'none';
}

// Renderizar productos
function renderProducts(productsToRender) {
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = `
            <div class="empty-state">
                <h3>📦 No hay productos</h3>
                <p>No se encontraron productos para mostrar.</p>
                <button onclick="loadProducts()" class="btn btn-primary">🔄 Recargar</button>
            </div>
        `;
        return;
    }

    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    productsContainer.innerHTML = '';
    productsContainer.appendChild(productsGrid);
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const stockClass = getStockClass(product.stock);
    const formattedPrice = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(product.price);

    card.innerHTML = `
        <h3>${escapeHtml(product.name)}</h3>
        <div class="price">${formattedPrice}</div>
        ${product.category ? `<span class="category">${escapeHtml(product.category)}</span>` : ''}
        <div class="stock ${stockClass}">
            📦 Stock: ${product.stock} unidades
        </div>
        ${product.description ? `<div class="description">${escapeHtml(product.description)}</div>` : ''}
        <div class="product-actions">
            <button onclick="editProduct(${product.id})" class="btn btn-warning">
                ✏️ Editar
            </button>
            <button onclick="showDeleteConfirm(${product.id}, '${escapeHtml(product.name)}')" class="btn btn-danger">
                🗑️ Eliminar
            </button>
        </div>
    `;

    return card;
}

// Obtener clase CSS para el stock
function getStockClass(stock) {
    if (stock === 0) return 'low';
    if (stock <= 10) return 'medium';
    return 'high';
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Manejar envío del formulario
async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(productForm);
    const productData = {
        name: formData.get('name').trim(),
        description: formData.get('description').trim(),
        price: parseFloat(formData.get('price')),
        category: formData.get('category').trim(),
        stock: parseInt(formData.get('stock')) || 0
    };

    // Validaciones
    if (!productData.name) {
        showToast('El nombre del producto es obligatorio', 'error');
        return;
    }

    if (!productData.price || productData.price <= 0) {
        showToast('El precio debe ser mayor que 0', 'error');
        return;
    }

    try {
        if (editingProductId) {
            await updateProduct(editingProductId, productData);
        } else {
            await createProduct(productData);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast(`Error: ${error.message}`, 'error');
    }
}

// Crear nuevo producto
async function createProduct(productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            showToast('Producto creado exitosamente', 'success');
            resetForm();
            loadProducts();
        } else {
            throw new Error(data.error || 'Error al crear producto');
        }

    } catch (error) {
        throw new Error(`Error al crear producto: ${error.message}`);
    }
}

// Actualizar producto existente
async function updateProduct(id, productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            showToast('Producto actualizado exitosamente', 'success');
            resetForm();
            loadProducts();
        } else {
            throw new Error(data.error || 'Error al actualizar producto');
        }

    } catch (error) {
        throw new Error(`Error al actualizar producto: ${error.message}`);
    }
}

// Editar producto
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) {
        showToast('Producto no encontrado', 'error');
        return;
    }

    // Llenar el formulario con los datos del producto
    document.getElementById('product-id').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description || '';
    document.getElementById('price').value = product.price;
    document.getElementById('category').value = product.category || '';
    document.getElementById('stock').value = product.stock;

    // Cambiar el estado del formulario
    editingProductId = id;
    formTitle.textContent = '✏️ Editar Producto';
    submitBtn.textContent = '💾 Actualizar Producto';
    cancelBtn.style.display = 'inline-block';

    // Scroll al formulario
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// Mostrar confirmación de eliminación
function showDeleteConfirm(id, name) {
    productToDelete = id;
    document.getElementById('confirm-message').textContent =
        `¿Estás seguro de que quieres eliminar el producto "${name}"?`;
    confirmModal.style.display = 'flex';
}

// Cerrar modal de confirmación
function closeConfirmModal() {
    confirmModal.style.display = 'none';
    productToDelete = null;
}

// Confirmar eliminación
async function confirmDelete() {
    if (!productToDelete) return;

    try {
        const response = await fetch(`${API_BASE_URL}/products/${productToDelete}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            showToast('Producto eliminado exitosamente', 'success');
            loadProducts();
        } else {
            throw new Error(data.error || 'Error al eliminar producto');
        }

    } catch (error) {
        console.error('Error deleting product:', error);
        showToast(`Error al eliminar producto: ${error.message}`, 'error');
    } finally {
        closeConfirmModal();
    }
}

// Resetear formulario
function resetForm() {
    productForm.reset();
    editingProductId = null;
    formTitle.textContent = '➕ Agregar Nuevo Producto';
    submitBtn.textContent = '➕ Agregar Producto';
    cancelBtn.style.display = 'none';
    document.getElementById('product-id').value = '';
}

// Filtrar productos
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let filteredProducts = products;

    // Filtrar por búsqueda
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }

    // Filtrar por categoría
    if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product =>
            product.category && product.category === selectedCategory
        );
    }

    renderProducts(filteredProducts);
}

// Actualizar filtro de categorías
function updateCategoryFilter() {
    const categories = [...new Set(products
        .map(product => product.category)
        .filter(category => category && category.trim())
    )].sort();

    const currentValue = categoryFilter.value;
    categoryFilter.innerHTML = '<option value="">Todas las categorías</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        if (category === currentValue) {
            option.selected = true;
        }
        categoryFilter.appendChild(option);
    });
}

// Mostrar toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Función global para debug (opcional)
window.debug = {
    products: () => products,
    api: API_BASE_URL,
    reload: loadProducts
};