// Obtiene obras por categoría desde el backend
async function consultarObrasPorCategoria(idCategoria) {
  if (!idCategoria || idCategoria === 'undefined') {
    console.warn('Categoría inválida, se usará "0" por defecto.');
    idCategoria = '0';
  }

  let url = idCategoria === '0' || idCategoria === 0
    ? 'http://localhost:8080/obras'
    : `http://localhost:8080/obras/byId/${idCategoria}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener obras');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error consultando obras:', error);
    return null;
  }
}

// Consulta lista de categorías
async function consultarCategorias() {
  try {
    const response = await fetch('http://localhost:8080/categoria');
    if (!response.ok) throw new Error('Error al obtener categorías');
    return await response.json();
  } catch (error) {
    console.error('Error consultando categorías:', error);
    return [];
  }
}

// Rellena select de categorías en admin.html
async function cargarListaDesplegableCategorias() {
  const select = document.getElementById('admin-category');
  if (!select) return;

  const categorias = await consultarCategorias();
  categorias.forEach(cat => {
    if (!cat.idCategoria || !cat.nombreCategoria) return;
    const option = document.createElement('option');
    option.value = cat.idCategoria;
    option.textContent = cat.nombreCategoria;
    select.appendChild(option);
  });
}

// Renderiza las tarjetas de obras en el contenedor
function renderizarObras(obras) {
  const contenedor = document.getElementById('contenedor-obras');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  if (!obras || !Array.isArray(obras) || obras.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }

  obras.forEach(obra => {
    const card = document.createElement('a');
    card.className = 'tarjeta-link';
    card.href = `producto.html?id=${obra.id_obra}`;
    card.innerHTML = `
      <div class="caja-obra">
        <img src="${obra.imagenes.imagen_principal_url}" alt="${obra.nombre_obra}" loading="lazy">
        <div class="texto-obra">
          <h3>${obra.nombre_obra}</h3>
          <p>${obra.descripcion_obra}</p>
          <p class="precio-obra">$${obra.precio_obra.toLocaleString('es-CO')}</p>
          <p class="description-card">${obra.descripcion_obra}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// Inicializa la vista de explorar_cards.html con datos desde backend
async function initExplorarCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const idCategoria = urlParams.get('categoria') || '0';

  const obras = await consultarObrasPorCategoria(idCategoria);
  if (obras !== null) renderizarObras(obras);
}

// Intercepta los clics en categorías y evita recargar si ya estás en explorar_cards.html
document.addEventListener('click', async (e) => {
  const link = e.target.closest('a[data-filtro]');
  if (!link) return;

  const idCategoria = link.getAttribute('data-filtro');

  if (window.location.pathname.includes('explorar_cards.html')) {
    e.preventDefault();
    const newUrl = `explorar_cards.html?categoria=${idCategoria}`;
    history.pushState({ categoria: idCategoria }, '', newUrl);

    const obras = await consultarObrasPorCategoria(idCategoria);
    if (obras !== null) renderizarObras(obras);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('explorar_cards.html')) {
    initExplorarCards();
  } else if (window.location.pathname.includes('admin.html')) {
    cargarListaDesplegableCategorias();
  }
});



// Lógica boton de fltrado del manú lateral

const botonFiltro = document.querySelector('.filtro-btn');
  const menuLateral = document.querySelector('.menu-lateral');

  botonFiltro.addEventListener('click', () => {
    menuLateral.classList.toggle('activo');
  });