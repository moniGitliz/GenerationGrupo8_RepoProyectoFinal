/**
 * header_footer.js - Script principal para la inicialización
 * de componentes compartidos como el header y el footer.
 */

// =================================================================
// PUNTO DE ENTRADA PRINCIPAL
// Todo se ejecuta después de que el HTML básico de la página ha cargado.
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Cargamos los componentes HTML y luego inicializamos los scripts que dependen de ellos.
  loadHeaderAndFooter();
  
  // Configuramos event listeners que no dependen del header/footer.
  setupGlobalEventListeners();
});


// =================================================================
// CARGA DE COMPONENTES HTML
// =================================================================

/**
 * Carga el header y el footer desde archivos HTML externos.
 * Una vez cargado el header, inicializa todos los scripts que lo necesitan.
 */
async function loadHeaderAndFooter() {
  try {
    // Cargamos el header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      const response = await fetch('../html/header.html');
      if (!response.ok) throw new Error('Header no encontrado');
      headerContainer.innerHTML = await response.text();
      
      // Una vez que el header está en el DOM, inicializamos sus componentes.
      // Esta es la clave para evitar errores de "elemento no encontrado".
      initializeHeaderComponents();
    }

    // Cargamos el footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      const response = await fetch('../html/footer.html');
      if (!response.ok) throw new Error('Footer no encontrado');
      footerContainer.innerHTML = await response.text();
    }
  } catch (error) {
    console.error('Error al cargar header o footer:', error);
  }
}


// =================================================================
// INICIALIZACIÓN DE SCRIPTS
// =================================================================

/**
 * Función central que llama a todos los scripts que dependen del header.
 */
function initializeHeaderComponents() {
  // Lógica para los menús desplegables del header (hamburguesa, búsqueda, perfil)
  inicializarTogglesHeader();

  // Lógica para la barra de búsqueda (desktop y móvil)
  inicializarBusqueda();

    inicializarFiltrosCategoria();
  
  // Lógica para actualizar el contador del carrito
  updateCartCounter();

  

  // Importamos y ejecutamos dinámicamente el script del menú de perfil
  // que maneja el estado de login/logout.
  import('./navbar-profile.js')
    .then(({ initProfileMenu }) => {
      if (initProfileMenu) initProfileMenu();
    })
    .catch(err => console.error('Error al cargar navbar-profile.js:', err));
}

/**
 * Configura los botones "Ver más" y otros listeners globales.
 */
function setupGlobalEventListeners() {
  // La delegación de eventos es más eficiente que añadir un listener a cada botón.
  document.body.addEventListener('click', function(event) {
    // Lógica para el botón "Ver más / Ver menos"
    if (event.target.classList.contains('ver-mas-btn')) {
      const expanded = event.target.nextElementSibling;
      if (expanded) {
        const isVisible = expanded.style.display === 'block';
        expanded.style.display = isVisible ? 'none' : 'block';
        event.target.textContent = isVisible ? 'Ver más' : 'Ver menos';
      }
    }
  });
}


// =================================================================
// FUNCIONES DE UTILIDAD Y COMPONENTES
// =================================================================

/**
 * Añade los event listeners a los enlaces de categoría para que funcionen como filtros.
 */
function inicializarFiltrosCategoria() {
  const linksCategoria = document.querySelectorAll('#hdrMenuCategorias .nav-link');
  
  linksCategoria.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevenir la navegación por defecto
      const urlDestino = this.getAttribute('href');
      if (urlDestino) {
        window.location.href = urlDestino; // Redirigir a la página de exploración con el filtro
      }
    });
  });
}


/**
 * Maneja la interactividad de los menús desplegables del header.
 */
function inicializarTogglesHeader() {
  const menuCat = document.getElementById('hdrMenuCategorias');
  const searchBar = document.getElementById('hdrMobileSearchBar');
  const profileMenu = document.getElementById('hdrProfileMenu');
  const profileBtn = document.getElementById('hdrProfileBtn'); // Necesitamos el botón de perfil también

  if (!menuCat || !searchBar || !profileMenu || !profileBtn) {
    console.error("Falta uno o más elementos del header para inicializar los toggles.");
    return;
  }
  
  // Esta función ahora sí cierra TODOS los menús.
  const closeAllMenus = () => {
    menuCat.classList.remove('mostrar');
    searchBar.classList.remove('activa');
    profileMenu.classList.remove('open');
    profileBtn.setAttribute('aria-expanded', 'false');
  };

  document.addEventListener('click', function (e) {
    const isProfileBtn = e.target.closest('#hdrProfileBtn');
    const isCatBtn = e.target.closest('#hdrMenuToggle');
    const isSearchBtn = e.target.closest('#hdrMobileSearchToggle');
    
    // Si se hizo clic en uno de los botones para abrir/cerrar
    if (isProfileBtn || isCatBtn || isSearchBtn) {
      e.stopPropagation();
      
      let wasOpen = false;
      if (isProfileBtn) wasOpen = profileMenu.classList.contains('open');
      if (isCatBtn) wasOpen = menuCat.classList.contains('mostrar');
      if (isSearchBtn) wasOpen = searchBar.classList.contains('activa');
      
      // Siempre cerramos todo primero.
      closeAllMenus();
      
      // Si el menú no estaba abierto, lo abrimos.
      if (!wasOpen) {
        if(isProfileBtn) {
            profileMenu.classList.add('open');
            profileBtn.setAttribute('aria-expanded', 'true');
        }
        if(isCatBtn) menuCat.classList.add('mostrar');
        if(isSearchBtn) searchBar.classList.add('activa');
      }
      return;
    }
    
    // Si el clic fue fuera de cualquiera de los menús abiertos, cerramos todo.
    const clickedInsideAnyMenu = e.target.closest('#hdrProfileMenu, #hdrMenuCategorias, #hdrMobileSearchBar');
    if (!clickedInsideAnyMenu) {
      closeAllMenus();
    }
  });
}
/**
 * Configura los formularios de búsqueda de escritorio y móvil.
 */
function inicializarBusqueda() {
    // La selección del formulario de escritorio no cambia.
    const searchFormDesktop = document.getElementById('search-form-desktop');
    const searchInputDesktop = document.getElementById('search-input-desktop');

    // ---> CAMBIO EN LA SELECCIÓN DE ELEMENTOS MÓVILES <---
    // Buscamos el div contenedor por su id, y luego el form y el input dentro de él.
    const searchFormMobile = document.querySelector('#hdrMobileSearchBar form');
    const searchInputMobile = document.querySelector('#hdrMobileSearchBar input[type="search"]');
    // ---------------------------------------------------------

    const handleSearch = (event, inputElement) => {
        event.preventDefault();
        const terminoBusqueda = inputElement.value.trim();
        if (terminoBusqueda) {
            window.location.href = `../html/explorar_cards.html?busqueda=${encodeURIComponent(terminoBusqueda)}`;
        }
    };

    // La lógica para añadir los listeners no cambia.
    if (searchFormDesktop && searchInputDesktop) {
        searchFormDesktop.addEventListener('submit', (e) => handleSearch(e, searchInputDesktop));
    }

    if (searchFormMobile && searchInputMobile) {
        searchFormMobile.addEventListener('submit', (e) => handleSearch(e, searchInputMobile));
    }
}

/**
 * Actualiza el contador de ítems en el ícono del carrito.
 */
function updateCartCounter() {
  const cartCounter = document.getElementById('cart-counter');
  if (!cartCounter) return;

  try {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = cart.reduce((total, item) => total + (item.cantidad || 1), 0);
    
    cartCounter.textContent = totalItems > 99 ? '99+' : totalItems;
    cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
  } catch (error) {
    console.error('Error en updateCartCounter:', error);
  }
}