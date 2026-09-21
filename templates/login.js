/**
 * Alquimia Team - Control de Servicio Técnico y Stock
 * Frontend Logic & Login Validation Flow
 * Desarrollado y Acoplado por: Patricia Rodríguez (@patriciarodriguez-1989)
 */


document.addEventListener("DOMContentLoaded", () => {
    // 1. Captura de los elementos del DOM usando los ID definidos por Patricia
    const formulario = document.getElementById("loginForm");
    const campoUsuario = document.getElementById("username");
    const campoContrasena = document.getElementById("password");
    const contenedorCargando = document.getElementById("loadingState");
    const contenedorError = document.getElementById("errorState");
    const botonSubmit = formulario.querySelector("button[type='submit']");

    formulario.addEventListener("submit", async (evento) => {
        // Previene el comportamiento por defecto de HTML5 (recargar la página)
        evento.preventDefault();

        // Ocultar mensajes de error de intentos fallidos anteriores
        contenedorError.classList.add("hidden");
        contenedorError.textContent = "";
        
        const usuarioValor = campoUsuario.value.trim();
        const contrasenaValor = campoContrasena.value;

        // 2. Activar el Estado de Carga (Humane Check) e inhabilitar el botón
        contenedorCargando.classList.remove("hidden");
        if (botonSubmit) {
            botonSubmit.disabled = true;
            botonSubmit.classList.add("opacity-50", "cursor-not-allowed");
        }

        try {
            // 3. Petición asíncrona mediante fetch() hacia la API que armó Carranza
            const respuesta = await fetch("/api/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Captura el token de protección CSRF exigido por la seguridad OWASP de Django
                    "X-CSRFToken": obtenerTokenCSRF('csrftoken')
                },
                body: JSON.stringify({
                    usuario: usuarioValor,
                    contrasena: contrasenaValor
                })
            });

            const datos = await respuesta.json();

            // 4. Control y validación de las respuestas HTTP del Servidor
            if (respuesta.ok) {
                // Credenciales válidas en MySQL: Alerta de bienvenida (Requerido por Daniel)
                alert(`¡Bienvenido de nuevo, ${datos.usuario}!\nAcceso validado para el rol: ${datos.rol}`);
                
                // Redirección dinámica según el rol retornado desde el backend
                window.location.href = datos.redirect_url;
            } else {
                // HU #4: Credenciales incorrectas. Inyecta el error en el contenedor de Patty
                contenedorError.textContent = datos.error || "Usuario o contraseña inválida";
                contenedorError.classList.remove("hidden");
            }

        } catch (error) {
            // Manejo de contingencia por fallas de red o servidor backend desconectado
            contenedorError.textContent = "Error crítico: No se pudo establecer conexión con el servidor de TecnoGest.";
            contenedorError.classList.remove("hidden");
            console.error("Error en la petición de login fetch:", error);
        } finally {
            // 5. Restablecer la interfaz visual a su estado operativo original
            contenedorCargando.classList.add("hidden");
            if (botonSubmit) {
                botonSubmit.disabled = false;
                botonSubmit.classList.remove("opacity-50", "cursor-not-allowed");
            }
        }
    });

    /**
     * Función interna para recuperar el token CSRF desde las cookies de Django
     */
    function obtenerTokenCSRF(nombreCookie) {
        let tokenValor = null;
        if (document.cookie && document.cookie !== '') {
            const listaCookies = document.cookie.split(';');
            for (let i = 0; i < listaCookies.length; i++) {
                const cookie = listaCookies[i].trim();
                if (cookie.substring(0, nombreCookie.length + 1) === (nombreCookie + '=')) {
                    tokenValor = decodeURIComponent(cookie.substring(nombreCookie.length + 1));
                    break;
                }
            }
        }
        return tokenValor;
    }
});
