/**
 * navbar-profile.js
 * -----------------
 * Este script se encarga de una sola cosa: preparar y renderizar el contenido
 * del menú desplegable de perfil de usuario. No maneja los clics para
 * abrir o cerrar el menú, solo decide qué enlaces mostrar.
 */

/**
 * Función principal que se exporta y se llama desde header_footer.js.
 * Lee el estado de la sesión desde localStorage y muestra el menú correspondiente.
 */
export function initProfileMenu() {
    // --- 1. OBTENCIÓN DE ELEMENTOS DEL DOM ---
    // Se buscan los elementos necesarios: el botón de perfil, el contenedor del menú
    // y las dos plantillas HTML (para usuario logueado y no logueado).
    const btn = document.getElementById('hdrProfileBtn');
    const menu = document.getElementById('hdrProfileMenu');
    const tplIn = document.getElementById('tpl-profile-logged-in');
    const tplOut = document.getElementById('tpl-profile-logged-out');

    // Si alguno de los elementos cruciales no existe, la función se detiene para evitar errores.
    if (!btn || !menu || !tplIn || !tplOut) return;

    // --- 2. LECTURA DEL ESTADO DE LA SESIÓN ---
    // Se revisa el localStorage para saber si el usuario está logueado y cuál es su rol.
    const logged = localStorage.getItem('loggedIn') === 'true';
    const userRole = localStorage.getItem('role');

    // --- 3. FUNCIÓN DE RENDERIZADO ---
    // Esta función interna se encarga de limpiar y "dibujar" el menú.
    const render = () => {
        // Se vacía el menú para evitar contenido duplicado.
        menu.innerHTML = '';
        
        // Se elige qué plantilla usar (tplIn si está logueado, tplOut si no)
        // y se clona su contenido para poder insertarlo en la página.
        const menuContent = (logged ? tplIn : tplOut).content.cloneNode(true);

        // --- LÓGICA SOLO PARA USUARIOS LOGUEADOS ---
        if (logged) {
            // Se busca el enlace del panel de administrador dentro del contenido clonado.
            const adminLink = menuContent.querySelector('#admin-panel-link');
            // Si el enlace existe y el rol del usuario es 'admin', se hace visible.
            if (adminLink && userRole === 'admin') {
                adminLink.style.display = 'list-item';
            }

            // Se busca el botón de "Cerrar sesión".
            const logoutButton = menuContent.querySelector('[data-action="logout"]');
            if (logoutButton) {
                // Se le añade un evento de clic para manejar el cierre de sesión.
                logoutButton.addEventListener('click', e => {
                    e.preventDefault();
                    // Se limpia toda la información de sesión del localStorage.
                    localStorage.removeItem('loggedIn');
                    localStorage.removeItem('role');
                    localStorage.removeItem('token');
                    // Se redirige al usuario a la página de inicio.
                    window.location.href = 'index.html';
                });
            }
        }

        // Finalmente, se inserta el contenido del menú (ya preparado) en el DOM.
        menu.appendChild(menuContent);
    };

    // Se llama a la función de renderizado para que el menú se muestre al cargar la página.
    render();
}