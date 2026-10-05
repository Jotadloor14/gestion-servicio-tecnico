document.addEventListener("DOMContentLoaded", () => {
    const inputBuscar = document.getElementById('txt-buscar-orden');
    const btnBuscar = document.getElementById('btn-buscar-orden');
    const sectionResultado = document.getElementById('result-section');

    const inputNombre = document.getElementById('cli-nombre');
    const inputTelefono = document.getElementById('cli-telefono');
    const btnMensaje = document.getElementById('btn-enviar-mensaje');

    // 1. Parámetro rígido: El buscador solo acepta NÚMEROS (Bloquea letras)
    inputBuscar.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) {
            e.preventDefault();
        }
    });

    // 2. Parámetro rígido: El nombre solo acepta LETRAS
    inputNombre.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) {
            e.preventDefault();
        }
    });

    // 3. Parámetro rígido: El teléfono de contacto solo acepta NÚMEROS
    inputTelefono.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) {
            e.preventDefault();
        }
    });

    // 4. Acción de simulación de búsqueda en caliente
    btnBuscar.addEventListener("click", () => {
        const orden = inputBuscar.value.trim();

        if (!orden) {
            alert("Por favor, ingresa un número de orden válido para consultar.");
            return;
        }

        // Simula la aparición de los detalles del equipo quitando la clase hidden
        document.getElementById('res-orden').innerText = `#${orden}`;
        sectionResultado.classList.remove('hidden');
    });

    // 5. Envío de mensaje corto de soporte
    btnMensaje.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const telefono = inputTelefono.value.trim();

        if (!nombre || !telefono) {
            alert("Por favor, llena los datos de contacto para procesar tu consulta.");
            return;
        }

        alert(`¡Gracias ${nombre}! Tu consulta corta ha sido registrada. Un técnico te contactará al número ${telefono}.`);
        inputNombre.value = "";
        inputTelefono.value = "";
    });
});
