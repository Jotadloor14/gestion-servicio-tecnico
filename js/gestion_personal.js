let totalPersonal = 0;
let tecnicosActivos = 0;

document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.getElementById('per-nombre');
    const inputCedula = document.getElementById('per-cedula');
    const inputTelefono = document.getElementById('per-telefono');
    const inputCargo = document.getElementById('per-cargo');
    const inputCorreo = document.getElementById('per-correo');
    const btnGuardar = document.getElementById('btn-guardar-personal');

    // 1. Filtrar Letras Obligatorio (Nombre)
    inputNombre.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 2. Filtrar Letras Obligatorio (Cargo)
    inputCargo.addEventListener("keypress", (e) => {
        let permitidos = " abcdefghijklmnñopqrstuvwxyzáéíóú";
        let tecla = String.fromCharCode(e.keyCode || e.which).toLowerCase();
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 3. Filtrar Números Obligatorio (Cédula)
    inputCedula.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 4. Filtrar Números Obligatorio (Teléfono)
    inputTelefono.addEventListener("keypress", (e) => {
        let permitidos = "0123456789";
        let tecla = String.fromCharCode(e.keyCode || e.which);
        if (permitidos.indexOf(tecla) === -1) e.preventDefault();
    });

    // 5. Inyección dinámica a la tabla
    btnGuardar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const cedula = inputCedula.value.trim();
        const telefono = inputTelefono.value.trim();
        const cargo = inputCargo.value.trim();
        const correo = inputCorreo.value.trim();

        if (!nombre || !cedula || !telefono || !cargo || !correo) {
            alert("Por favor Patricia, completa todos los campos del personal de forma correcta.");
            return;
        }

        const filaVacia = document.getElementById('fila-vacia-personal');
        if (filaVacia) filaVacia.remove();

        const tbody = document.getElementById('cuerpo-tabla-personal');
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td style="font-weight: bold; color: #0c4a6e;">${nombre}</td>
            <td style="font-family: monospace;">${cedula}</td>
            <td style="font-family: monospace;">${telefono}</td>
            <td><span style="background-color: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 12px;">${cargo}</span></td>
            <td>${correo}</td>
        `;

        tbody.appendChild(fila);

        // Sumar contadores dinámicos
        totalPersonal++;
        if (cargo.toLowerCase().includes("tecnico") || cargo.toLowerCase().includes("técnico")) {
            tecnicosActivos++;
        }

        document.getElementById('txt-total-personal').innerText = totalPersonal;
        document.getElementById('txt-tecnicos-activos').innerText = tecnicosActivos;

        // Limpiar formulario
        inputNombre.value = "";
        inputCedula.value = "";
        inputTelefono.value = "";
        inputCargo.value = "";
        inputCorreo.value = "";
    });
});
