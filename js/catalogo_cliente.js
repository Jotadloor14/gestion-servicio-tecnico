
document.addEventListener("DOMContentLoaded", () => {

    // DATOS FICTICIOS PARA PROBAR EL FRONTEND
    // José Daniel reemplazará estos datos al integrar el sistema.

    const productos = [
        {
            id: 1,
            nombre: "Audífonos",
            categoria: "Audífonos",
            precio: 2.30,
            stock: 5,
            icono: "🎧"
        },
        {
            id: 2,
            nombre: "Estuche",
            categoria: "Estuches",
            precio: 4.00,
            stock: 20,
            icono: "📱"
        },
        {
            id: 3,
            nombre: "Mica protectora",
            categoria: "Micas",
            precio: 3.00,
            stock: 8,
            icono: "🛡️"
        },
        {
            id: 4,
            nombre: "Cargador",
            categoria: "Cargadores",
            precio: 10.50,
            stock: 6,
            icono: "🔌"
        },
        {
            id: 5,
            nombre: "Cable USB",
            categoria: "Cables",
            precio: 4.50,
            stock: 9,
            icono: "🔗"
        },
        {
            id: 6,
            nombre: "Parlante",
            categoria: "Otros",
            precio: 5.00,
            stock: 2,
            icono: "🔊"
        }
    ];

    const contenedor = document.getElementById("productos");
    const buscador = document.getElementById("buscar-producto");
    const filtro = document.getElementById("filtro-categoria");
    const categorias = document.querySelectorAll(".categoria");
    const contador = document.getElementById("contador");
    const sinResultados = document.getElementById("sin-resultados");

    const modal = document.getElementById("modal");
    const cerrarModal = document.getElementById("cerrar-modal");

    const formatoPrecio = (precio) => "$" + precio.toFixed(2);

    function mostrarProductos() {
        const busqueda = buscador.value.trim().toLowerCase();
        const categoriaSeleccionada = filtro.value;

        const filtrados = productos.filter(producto => {
            const coincideNombre = producto.nombre
                .toLowerCase()
                .includes(busqueda);

            const coincideCategoria =
                categoriaSeleccionada === "Todos" ||
                producto.categoria === categoriaSeleccionada;

            return coincideNombre && coincideCategoria;
        });

        contenedor.innerHTML = "";

        filtrados.forEach(producto => {
            const tarjeta = document.createElement("article");
            tarjeta.className = "producto";

            const imagen = document.createElement("div");
            imagen.className = "producto-imagen";
            imagen.textContent = producto.icono;

            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;

            const precio = document.createElement("p");
            precio.className = "precio";
            precio.textContent = formatoPrecio(producto.precio);

            const stock = document.createElement("p");
            stock.className = producto.stock > 0
                ? "stock"
                : "stock agotado";

            stock.textContent = producto.stock > 0
                ? "Stock: " + producto.stock
                : "Agotado / Sin stock";

            const boton = document.createElement("button");
            boton.className = "ver-detalle";
            boton.type = "button";
            boton.textContent = "Ver detalle";

            boton.addEventListener("click", () => {
                mostrarDetalle(producto);
            });

            tarjeta.append(imagen, nombre, precio, stock, boton);
            contenedor.appendChild(tarjeta);
        });

        contador.textContent =
            "Productos encontrados: " + filtrados.length +
            " (demostración)";

        sinResultados.hidden = filtrados.length !== 0;
    }

    function seleccionarCategoria(categoria) {
        filtro.value = categoria;

        categorias.forEach(boton => {
            boton.classList.toggle(
                "activa",
                boton.dataset.categoria === categoria
            );
        });

        mostrarProductos();
    }

    function mostrarDetalle(producto) {
        document.getElementById("detalle-imagen").textContent =
            producto.icono;

        document.getElementById("detalle-titulo").textContent =
            producto.nombre;

        document.getElementById("detalle-categoria").textContent =
            "Categoría: " + producto.categoria;

        document.getElementById("detalle-precio").textContent =
            formatoPrecio(producto.precio);

        document.getElementById("detalle-stock").textContent =
            producto.stock > 0
                ? "Stock disponible: " + producto.stock
                : "Agotado / Sin stock";

        modal.hidden = false;
        cerrarModal.focus();
    }

    function ocultarDetalle() {
        modal.hidden = true;
    }

    buscador.addEventListener("input", mostrarProductos);

    filtro.addEventListener("change", () => {
        seleccionarCategoria(filtro.value);
    });

    categorias.forEach(boton => {
        boton.addEventListener("click", () => {
            seleccionarCategoria(boton.dataset.categoria);
        });
    });

    cerrarModal.addEventListener("click", ocultarDetalle);

    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            ocultarDetalle();
        }
    });

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && !modal.hidden) {
            ocultarDetalle();
        }
    });

    // MENÚ PARA CELULARES
    const menuBoton = document.getElementById("menu-boton");
    const navegacion = document.getElementById("navegacion");

    menuBoton.addEventListener("click", () => {
        const abierto = navegacion.classList.toggle("abierta");
        menuBoton.setAttribute("aria-expanded", String(abierto));
    });

    mostrarProductos();
});
