
document.addEventListener("DOMContentLoaded", () => {

    // DATOS DEL CARRUSEL
    const slides = [
        {
            icono: "🔧",
            titulo: "Reparación de equipos",
            descripcion: "Atención y seguimiento de tus reparaciones."
        },
        {
            icono: "📱",
            titulo: "Accesorios tecnológicos",
            descripcion: "Consulta nuestro catálogo y disponibilidad."
        },
        {
            icono: "🛡️",
            titulo: "Servicio de confianza",
            descripcion: "Información clara durante todo el proceso."
        }
    ];

    // ELEMENTOS DEL CARRUSEL
    const puntos = document.querySelectorAll(".punto");

    const icono = document.getElementById("imagen-icono");
    const titulo = document.getElementById("imagen-titulo");
    const descripcion = document.getElementById("imagen-descripcion");

    // CAMBIAR DIAPOSITIVAS
    function mostrarSlide(indice) {

        const slide = slides[indice];

        icono.textContent = slide.icono;
        titulo.textContent = slide.titulo;
        descripcion.textContent = slide.descripcion;

        puntos.forEach((punto, i) => {
            punto.classList.toggle("activo", i === indice);
        });

    }

    puntos.forEach((punto) => {

        punto.addEventListener("click", () => {

            const indice = Number(punto.dataset.slide);

            mostrarSlide(indice);

        });

    });

    // MENÚ PARA CELULARES
    const menuBoton = document.getElementById("menu-boton");
    const navegacion = document.getElementById("navegacion");

    menuBoton.addEventListener("click", () => {

        const abierto = navegacion.classList.toggle("abierta");

        menuBoton.setAttribute(
            "aria-expanded",
            String(abierto)
        );

    });

});
