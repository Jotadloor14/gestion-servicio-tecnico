let totalItems = 0;
let alertasBajoStock = 0;
let valorTotalInventario = 0.0;

document.addEventListener("DOMContentLoaded", () => {
    const inputSku = document.getElementById('inv-sku');
    const inputNombre = document.getElementById('inv-nombre');
    const inputStock = document.getElementById('inv-stock');
    const inputPrecio = document.getElementById('inv-precio');
    const inputProveedor = document.getElementById('inv-proveedor');
    const btnGuardar = document.getElementById('btn-guardar-inventario');

    // 1. Filtrar Números (SKU)
    inputSku.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 2. Filtrar Letras (Nombre del Componente)
    inputNombre.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú0123456789-";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 3. Filtrar Números (Stock)
    inputStock.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 4. Filtrar Números (Precio)
    inputPrecio.addEventListener("keypress", (e) => {
        let permitidos = "0123456789.";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 5. Filtrar Letras (Proveedor)
    inputProveedor.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // Procesamiento e inyección real a la tabla
    btnGuardar.addEventListener("click", () => {
        const sku = inputSku.value.trim();
        const nombre = inputNombre.value.trim();
        const stock = parseInt(inputStock.value.trim());
        const precio = parseFloat(inputPrecio.value.trim());
        const proveedor = inputProveedor.value.trim();

        if (!sku || !nombre || isNaN(stock) || isNaN(precio) || !proveedor) {
            alert("Patricia, por favor llena todos los parámetros correctamente.");
            return;
        }

        const filaVacia = document.getElementById('fila-vacia-inventario');
        if (filaVacia) filaVacia.remove();

        const tbody = document.getElementById('cuerpo-tabla-inventario');
        const fila = document.createElement('tr');

        // Determinar alerta de bajo stock (Si hay menos de 5 unidades)
        let stockEstilo = "";
        if (stock < 5) {
            stockEstilo = `background-color: #fef2f2; color: #ef4444; padding: 2px 6px; border-radius: 4px; font-weight: bold;`;
            alertasBajoStock++;
        } else {
            stockEstilo = `background-color: #f0f9ff; color: #0284c7; padding: 2px 6px; border-radius: 4px; font-weight: bold;`;
        }

        fila.innerHTML = `
            <td style="font-family: monospace; color: #64748b;">${sku}</td>
            <td style="font-weight: bold; color: #0c4a6e;">${nombre}</td>
            <td><span style="${stockEstilo}">${stock} uds</span></td>
            <td style="font-weight: bold; color: #475569;">$${precio.toFixed(2)}</td>
            <td>${proveedor}</td>
        `;

        tbody.appendChild(fila);

        // Operaciones de inventario totalizadas
        totalItems++;
        valorTotalInventario += (stock * precio);

        document.getElementById('txt-total-items').innerText = totalItems;
        document.getElementById('txt-bajo-stock').innerText = alertasBajoStock;
        document.getElementById('txt-valor-inventario').innerText = `$${valorTotalInventario.toFixed(2)}`;

        // Limpiar formulario
        inputSku.value = "";
        inputNombre.value = "";
        inputStock.value = "";
        inputPrecio.value = "";
        inputProveedor.value = "";
    });
});
