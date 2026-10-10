let totalReportes = 0;
let acumuladoMetas = 0.0;

document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.getElementById('rep-nombre');
    const inputAnio = document.getElementById('rep-anio');
    const inputMeta = document.getElementById('rep-meta');
    const inputUsuario = document.getElementById('rep-usuario');
    const btnGuardar = document.getElementById('btn-generar-reporte');

    // 1. Filtrar Letras (Nombre del Reporte)
    inputNombre.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 2. Filtrar Números (Año)
    inputAnio.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 3. Filtrar Números (Meta)
    inputMeta.addEventListener("keypress", (e) => {
        let permitidos = "0123456789.";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 4. Filtrar Letras (Usuario Solicitante)
    inputUsuario.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // Inyección y cálculo real
    btnGuardar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const anio = inputAnio.value.trim();
        const meta = parseFloat(inputMeta.value.trim());
        const usuario = inputUsuario.value.trim();

        if (!nombre || !anio || isNaN(meta) || !usuario) {
            alert("Patricia, por favor llena todos los parámetros para procesar el balance fiscal.");
            return;
        }

        const filaVacia = document.getElementById('fila-vacia-reportes');
        if (filaVacia) filaVacia.remove();

        // Obtener fecha real del sistema para auditoría de producción
        const fechaActual = new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const tbody = document.getElementById('cuerpo-tabla-reportes');
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td style="font-family: monospace; color: #64748b;">${fechaActual}</td>
            <td style="font-weight: bold; color: #0c4a6e; text-transform: uppercase;">${nombre}</td>
            <td style="font-family: monospace; font-weight: bold;">${anio}</td>
            <td style="font-weight: 800; color: #16a34a;">$${meta.toFixed(2)}</td>
            <td style="font-weight: 600; color: #475569;">${usuario}</td>
        `;

        tbody.appendChild(fila);

        // Operaciones de balances globales
        totalReportes++;
        acumuladoMetas += meta;

        document.getElementById('txt-total-reportes').innerText = totalReportes;
        document.getElementById('txt-meta-global').innerText = `$${acumuladoMetas.toFixed(2)}`;

        // Limpiar formulario
        inputNombre.value = "";
        inputAnio.value = "";
        inputMeta.value = "";
        inputUsuario.value = "";
    });
});
