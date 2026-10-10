// Contadores de control global de la pantalla
let totalOrdenes = 0;
let pendientes = 0;

// Esperar a que el HTML cargue por completo para asignar los eventos reales
document.addEventListener("DOMContentLoaded", () => {
    
    // Capturar inputs del formulario
    const inputCliente = document.getElementById('reg-cliente');
    const inputTelefono = document.getElementById('reg-telefono');
    const inputFalla = document.getElementById('reg-falla');
    const inputAbono = document.getElementById('reg-abono');
    const btnGuardar = document.getElementById('btn-guardar-registro');

    // 1. Parámetro estricto: Bloquear números en el campo Cliente
    inputCliente.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) {
            e.preventDefault();
        }
    });

    // 2. Parámetro estricto: Bloquear números en el campo Falla Reportada
    inputFalla.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) {
            e.preventDefault();
        }
    });

    // 3. Parámetro estricto: Bloquear letras en el campo Teléfono
    inputTelefono.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) {
            e.preventDefault();
        }
    });

    // 4. Parámetro estricto: Bloquear letras en el campo Abono
    inputAbono.addEventListener("keypress", (e) => {
        let permitidos = "0123456789.";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) {
            e.preventDefault();
        }
    });

    // 5. Función principal para procesar e inyectar el registro real en la tabla
    btnGuardar.addEventListener("click", () => {
        const cliente = inputCliente.value.trim();
        const telefono = inputTelefono.value.trim();
        const equipo = document.getElementById('reg-equipo').value.trim();
        const falla = inputFalla.value.trim();
        const abono = inputAbono.value.trim();

        // Validación de campos vacíos
        if (!cliente || !telefono || !equipo || !falla || !abono) {
            alert("Por favor Patricia, llena todos los parámetros obligatorios con el formato correcto.");
            return;
        }

        // Quitar la fila de aviso "Tabla vacía" si existe
        const filaVacia = document.getElementById('fila-vacia-registro');
        if (filaVacia) {
            filaVacia.remove();
        }

        // Crear una nueva fila real estructurada de base de datos
        const tbody = document.getElementById('cuerpo-tabla-real');
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td style="font-weight: bold; color: #0c4a6e;">${cliente}</td>
            <td style="font-family: monospace;">${telefono}</td>
            <td>${equipo}</td>
            <td><span style="background-color: #f0f9ff; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 12px;">${falla}</span></td>
            <td style="font-weight: 800; color: #16a34a;">$${parseFloat(abono).toFixed(2)}</td>
        `;

        // Inyectar el bloque de datos a la tabla
        tbody.appendChild(fila);

        // Actualizar tarjetas numéricas en tiempo real
        totalOrdenes++;
        pendientes++;
        document.getElementById('txt-totales').innerText = totalOrdenes;
        document.getElementById('txt-pendientes').innerText = pendientes;

        // Limpiar completamente el formulario para una nueva inserción
        inputCliente.value = "";
        inputTelefono.value = "";
        document.getElementById('reg-equipo').value = "";
        inputFalla.value = "";
        inputAbono.value = "";
    });
});
