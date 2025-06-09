

// ==================== CONSULTAR CATEGORÍAS ====================
async function consultarCategorias() {
  try {
    const response = await fetch("http://localhost:8080/categoria");
    if (!response.ok) throw new Error("No se pudo obtener las categorías");
    return await response.json();
  } catch (error) {
    console.error("Error al consultar categorías:", error);
    return [];
  }
}

// ==================== CREAR CATEGORÍAS ====================
function createCategories(listCategorias, selector, esFooter = false, esMedium = false) {
  const container = document.querySelector(selector);
  if (!container || !Array.isArray(listCategorias)) return;
  container.innerHTML = '';

  if(!esFooter && !esMedium){
    container.innerHTML = `<li class="nav-item">
					<a class="nav-link" href="./explorar_cards.html?categoria=0" data-filtro=0>Explorar</a>
				</li>`;
  }

  listCategorias.forEach(cat => {
    if (!cat.idCategoria) return; // Evita errores si la categoría es inválida
    const link = document.createElement('a');
    link.textContent = cat.nombreCategoria;
    link.setAttribute('data-filtro', cat.idCategoria);
    link.href = `./explorar_cards.html?categoria=${cat.idCategoria}`;
    link.className = esFooter ? '' : esMedium ? 'home-categories-link' : 'nav-link';

    if(esFooter){
      container.appendChild(link);
    }else if(esMedium){
      const wrapper = document.createElement('li');
      wrapper.appendChild(link);
      container.appendChild(wrapper);
    }else{
      const wrapper = document.createElement('li');
      wrapper.className = 'nav-item';
      wrapper.appendChild(link);
      container.appendChild(wrapper);
    }
  });
}

// ==================== CARGAR CATEGORÍAS DINÁMICAS ====================
async function cargarCategoriasDinamicas() {
  const categorias = await consultarCategorias();
  createCategories(categorias, '#hdrMenuCategorias');
  createCategories(categorias, '.categories-links-footer', true);
  createCategories(categorias, '.categories-links-medium', false, true);
}






// ---------- CARGAR HEADER ----------
fetch('../html/header.html')
  .then(response => response.text())
  .then(data => {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;
    
    // Guardar posición actual del scroll
    const scrollPosition = window.scrollY;
    
    headerContainer.innerHTML = data;
    
    // Restaurar scroll después de cargar el header
    window.scrollTo(0, scrollPosition);
    
    inicializarHeader();
    activarFiltroCategorias();
    initProfileMenu();  
    updateCartCounter();

    import('./navbar-profile.js')
    .then(({ initProfileMenu }) => initProfileMenu())
    .catch(err => console.error('navbar-profile.js no se pudo cargar', err));
    
    // Delegación de eventos mejorada
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href]');
      if (!link || !headerContainer.contains(link)) return;
      
      if (link.href.startsWith('http') || link.getAttribute('href').startsWith('#')) return;
      
      e.preventDefault();
      window.location.href = link.getAttribute('href');
    });
  })
  .catch(error => console.error('Error loading header:', error));



// ==================== CARGA FOOTER ====================
fetch('../html/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = data;
      cargarCategoriasDinamicas();
    }
  })
  .catch(error => console.error('Error loading footer:', error));


  
// ==================== CONTADOR DE CARRITO (VERSIÓN SEGURA) ====================
function updateCartCounter() {
  const cartCounter = document.getElementById('cart-counter');
  if (!cartCounter) {
    console.warn('Contador no encontrado, reintentando...');
    setTimeout(updateCartCounter, 500); // Reintentar después de 500ms
    return;
  }

  try {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = cart.reduce((total, item) => total + (item.cantidad || 1), 0);
    
    cartCounter.textContent = totalItems > 99 ? '99+' : totalItems;
    cartCounter.classList.toggle('show', totalItems > 0);
  } catch (error) {
    console.error('Error en updateCartCounter:', error);
  }
}

// Llamar inicialmente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si los contenedores existen
  if (!document.getElementById('header-container') || !document.getElementById('footer-container')) {
    console.error('Contenedores principales no encontrados');
    return;
  }
  
  // Actualizar carrito solo una vez al inicio
  updateCartCounter();
  
  // Configurar botones "Ver más"
  document.querySelectorAll('.ver-mas-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const expanded = this.nextElementSibling;
      if (!expanded) return;
      
      const isVisible = expanded.style.display === 'block';
      expanded.style.display = isVisible ? 'none' : 'block';
      this.textContent = isVisible ? 'Ver más' : 'Ver menos';
    });
  });
});

// ---------- FUNCIONES ORIGINALES (SIN MODIFICAR) ----------
function inicializarHeader() {
   const menuCat      = document.getElementById('hdrMenuCategorias');
   const searchBar    = document.getElementById('hdrMobileSearchBar');
   const profileBtn   = document.getElementById('hdrProfileBtn');  
    const profileMenu  = document.getElementById('hdrProfileMenu');

   function closeAll() {
     menuCat.classList.remove('mostrar');
     searchBar.classList.remove('activa');
     profileMenu.classList.remove('open');   }

  document.addEventListener('click', function (e) {
     const isProfileBtn = !!e.target.closest('#hdrProfileBtn');
     const isCatBtn     = !!e.target.closest('#hdrMenuToggle');
     const isSearchBtn  = !!e.target.closest('#hdrMobileSearchToggle');

     // 1) Perfil
     if (isProfileBtn) {
       e.stopPropagation();
       const wasOpen = profileMenu.classList.contains('open');
       closeAll();
      if (!wasOpen) profileMenu.classList.add('open');
       return;
     }

     // 2) Hamburguesa (categorías)
     if (isCatBtn) {       e.preventDefault();
       const wasOpen = menuCat.classList.contains('mostrar');
       closeAll();
       if (!wasOpen) menuCat.classList.add('mostrar');
       return;
     }

     // 3) Lupa móvil (búsqueda)
     if (isSearchBtn) {
      e.preventDefault();
       const wasOpen = searchBar.classList.contains('activa');
      closeAll();
       if (!wasOpen) searchBar.classList.add('activa');
       return;
     }
    
     // 4) Clic fuera de cualquier toggle → cierro todo
     closeAll();
   });
 }

function activarFiltroCategorias() {
  // ... (tu código original)
}

function initProfileMenu() {
  // ... (tu código original)
}


