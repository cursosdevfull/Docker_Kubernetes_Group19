async function getUrlBackend() {
    try {
        const response = await fetch("/api/config").then(res => res.json())
        return response.backend1
    } catch (error) {
        throw new Error("Error /api/config", error);

    }
}

function renderProductsTable(products) {
    const app = document.getElementById('app');

    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
    `;

    products.forEach(product => {
        tableHTML += `
            <tr>
                <td>${product.id}</td>
                <td class="producto-nombre">${product.nombre}</td>
                <td class="precio">$${parseFloat(product.precio).toFixed(2)}</td>
                <td class="descripcion">${product.descripcion || 'Sin descripción'}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    app.innerHTML = tableHTML;
}

async function loadProducts() {
    try {
        const backendUrl = await getUrlBackend()
        const products = await fetch(backendUrl).then(res => res.json())

        renderProductsTable(products);
    } catch (error) {
        console.error("Error loading products:", error);
        document.getElementById('app').innerHTML = '<div class="error">Error cargando productos. Asegúrate de que el backend esté ejecutándose y la base de datos esté inicializada.</div>';
    }
}

loadProducts()