let contadorOrdenes = 0;
let acumuladoDinero = 0.0;

document.addEventListener("DOMContentLoaded", () => {
    const inputNumero = document.getElementById('ord-numero');
    const inputCliente = document.getElementById('ord-cliente');
    const inputEquipo = document.getElementById('ord-equipo');
    const inputFalla = document.getElementById('ord-falla');
    const inputPrecio = document.getElementById('ord-precio');
    const inputAbono = document.getElementById('ord-abono');
    const btnGuardar = document.getElementById('btn-guardar-orden');

    // 1. Filtrar Números (Número de Orden)
    inputNumero.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 2. Filtrar Letras (Cliente)
    inputCliente.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 3. Filtrar Letras (Falla Diagnocada)
    inputFalla.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 4. Filtrar Números (Precio)
    inputPrecio.addEventListener("keypress", (e) => {
        let permitidos = "0123456789.";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 5. Filtrar Números (Abono)
    inputAbono.addEventListener("keypress", (e) => {
        let permitidos = "0123456789.";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // Procesamiento e inyección real a la tabla
    btnGuardar.addEventListener("click", () => {
        const numero = inputNumero.value.trim();
        const cliente = inputCliente.value.trim();
        const equipo = inputEquipo.value.trim();
        const falla = inputFalla.value.trim();
        const precio = inputPrecio.value.trim();
        const abono = inputAbono.value.trim();

        if (!numero || !cliente || !equipo || !falla || !precio || !abono) {
            alert("Patricia, por favor llena todos los parámetros operativos de la orden.");
            return;
        }

        const filaVacia = document.getElementById('fila-vacia-ordenes');
        if (filaVacia) filaVacia.remove();

        const tbody = document.getElementById('cuerpo-tabla-ordenes');
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td style="font-family: monospace; font-weight: bold; color: #0284c7;">#${numero}</td>
            <td style="font-weight: bold; color: #0c4a6e;">${cliente}</td>
            <td>${equipo}</td>
            <td><span style="background-color: #fffbeb; color: #d97706; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 12px;">${falla}</span></td>
            <td style="font-weight: bold; color: #475569;">$${parseFloat(precio).toFixed(2)}</td>
            <td style="font-weight: 800; color: #16a34a;">$${parseFloat(abono).toFixed(2)}</td>
        `;

        tbody.appendChild(fila);

        // Operaciones de negocio dinámicas (Suma de caja en vivo)
        contadorOrdenes++;
        acumuladoDinero += parseFloat(abono);

        document.getElementById('txt-total-ordenes').innerText = contadorOrdenes;
        document.getElementById('txt-en-proceso').innerText = contadorOrdenes;
        document.getElementById('txt-monto-total').innerText = `$${acumuladoDinero.toFixed(2)}`;

        // Limpiar formulario para la siguiente orden
        inputNumero.value = "";
        inputCliente.value = "";
        inputEquipo.value = "";
        inputFalla.value = "";
        inputPrecio.value = "";
        inputAbono.value = "";
    });
});
