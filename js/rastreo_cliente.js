
document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DEL FORMULARIO
    const formulario = document.getElementById("form-rastreo");
    const codigoInput = document.getElementById("codigo");
    const mensaje = document.getElementById("mensaje");
    const resultado = document.getElementById("resultado");

    // ESTADOS DE REPARACIÓN
    const estados = [
        "Recibido",
        "En reparación",
        "Listo para entrega",
        "Entregado"
    ];

    // ESTADO TEMPORAL DE DEMOSTRACIÓN
    // 0 = Recibido
    // 1 = En reparación
    // 2 = Listo para entrega
    // 3 = Entregado

    const estadoDemo = 1;

    // ACTUALIZAR LOS CÍRCULOS DEL SEGUIMIENTO
    function actualizarProgreso(indice) {

        const pasos = document.querySelectorAll(".paso");

        pasos.forEach((paso, i) => {

            paso.classList.remove("completado", "actual");

            const circulo = paso.querySelector(".circulo");

            if (i < indice) {

                paso.classList.add("completado");
                circulo.textContent = "✓";

            } else if (i === indice) {

                paso.classList.add("actual");
                circulo.textContent = "✓";

            } else {

                circulo.textContent = String(i + 1);

            }

        });

    }

    // PERMITIR SOLO NÚMEROS Y MÁXIMO 7 DÍGITOS
    codigoInput.addEventListener("input", () => {

        codigoInput.value = codigoInput.value
            .replace(/\D/g, "")
            .slice(0, 7);

    });

    // CONSULTAR EL CÓDIGO DE REPARACIÓN
    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        const codigo = codigoInput.value.trim();

        resultado.hidden = true;
        mensaje.textContent = "";

        // VALIDACIÓN DEL CÓDIGO
        if (!/^\d{7}$/.test(codigo)) {

            mensaje.textContent =
                "Debes ingresar un código de exactamente 7 números.";

            return;
        }

        // MOSTRAR ESTADO DE DEMOSTRACIÓN
        actualizarProgreso(estadoDemo);

        // INFORMACIÓN DEL EQUIPO
        document.getElementById("equipo").textContent =
            "Teléfono (demostración)";

        document.getElementById("modelo").textContent =
            "Modelo de ejemplo";

        document.getElementById("estado-actual").textContent =
            estados[estadoDemo];

        // INFORMACIÓN ADICIONAL
        document.getElementById("fecha-recepcion").textContent =
            "Pendiente de conexión";

        document.getElementById("tecnico").textContent =
            "Pendiente de asignación";

        document.getElementById("observaciones").textContent =
            "Información de demostración. La reparación real se consultará cuando esté conectado el sistema.";

        // MOSTRAR RESULTADO
        resultado.hidden = false;

        // DESPLAZAR HACIA EL RESULTADO
        resultado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

    // MENÚ DE NAVEGACIÓN PARA CELULARES
    const menuBoton = document.getElementById("menu-boton");
    const navegacion = document.getElementById("navegacion");

    if (menuBoton && navegacion) {

        menuBoton.addEventListener("click", () => {

            const abierto =
                navegacion.classList.toggle("abierta");

            menuBoton.setAttribute(
                "aria-expanded",
                String(abierto)
            );

        });

    }

    // LA NAVEGACIÓN A ACCESORIOS SE REALIZA
    // DIRECTAMENTE DESDE EL HTML.
    // NO SE NECESITAN ALERTAS NI REDIRECCIONES JS.

});
