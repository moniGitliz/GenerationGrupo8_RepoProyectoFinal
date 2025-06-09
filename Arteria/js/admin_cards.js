/**
 * explor_cards.js - Lógica para la página de exploración de obras.
 * Carga las obras desde el backend, ya sea todas o según un término de búsqueda.
 */

// El código se ejecuta cuando el DOM de la página está listo.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtenemos el contenedor donde irán las tarjetas.
    const contenedorObras = document.getElementById('contenedor-obras');
    if (!contenedorObras) {
        console.error("El contenedor de obras no se encontró en el DOM.");
        return;
    }

    // 2. Leemos la URL actual para ver si hay un término de búsqueda.
    const urlParams = new URLSearchParams(window.location.search);
    const terminoBusqueda = urlParams.get('busqueda');

    // 3. Decidimos qué URL del API vamos a llamar.
    let apiUrl;
    if (terminoBusqueda) {
        // Si hay un término de búsqueda, usamos el endpoint de búsqueda.
        apiUrl = `http://localhost:8080/obras/buscar?termino=${encodeURIComponent(terminoBusqueda)}`;
        // Opcional: Podrías mostrar un título como "Resultados para: ..."
    } else {
        // Si no hay búsqueda, traemos todas las obras.
        apiUrl = 'http://localhost:8080/obras';
    }

    // 4. Llamamos al API y renderizamos los resultados.
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red o en el servidor: ${response.status}`);
            }
            return response.json();
        })
        .then(obras => {
            // La función renderObras se encargará de mostrar los datos.
            renderObras(contenedorObras, obras);
        })
        .catch(error => {
            console.error('Error al cargar las obras:', error);
            contenedorObras.innerHTML = '<p class="text-center text-danger">No se pudieron cargar las obras. Por favor, intente más tarde.</p>';
        });
});

/**
 * Limpia el contenedor y renderiza una lista de obras.
 * @param {HTMLElement} container - El elemento contenedor para las tarjetas.
 * @param {Array} obras - El array de objetos de obra recibidos del API.
 */
function renderObras(container, obras) {
    // Primero, limpiamos el contenedor de cualquier contenido hardcoded o anterior.
    container.innerHTML = '';

    // Si no hay obras, mostramos un mensaje.
    if (!obras || obras.length === 0) {
        container.innerHTML = '<p class="text-center">No se encontraron obras que coincidan con tu búsqueda.</p>';
        return;
    }

    // Por cada obra en el array, creamos y añadimos su tarjeta.
    obras.forEach(obra => {
        const cardElement = createCardElement(obra);
        container.appendChild(cardElement);
    });
}

/**
 * Crea el elemento HTML para una sola tarjeta de obra.
 * @param {object} obra - El objeto de obra con todos sus datos.
 * @returns {HTMLElement} - El elemento <a> que contiene la tarjeta.
 */
function createCardElement(obra) {
    const cardLink = document.createElement('a');
    cardLink.className = 'tarjeta-link';
    // Usamos el id real de la obra para el enlace al producto.
    cardLink.href = `producto.html?id=${obra.idObra}`;

    // Formateamos el precio a pesos colombianos.
    const precioFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(obra.precio_obra);

    // Usamos la URL de la imagen principal del objeto 'imagenes'
    const imageUrl = obra.imagenes ? obra.imagenes.imagenPrincipalUrl : 'https://via.placeholder.com/300'; // Una imagen por defecto si no hay

    cardLink.innerHTML = `
        <div class="caja-obra" data-categoria="${obra.categoria.nombreCategoria.toLowerCase()}">
            <img src="${imageUrl}" alt="${obra.nombreObra}" loading="lazy">
            <div class="texto-obra">
                <h3>${obra.nombreObra}</h3>
                <p>${obra.nombreArtista}</p>
                <p class="precio-obra">${precioFormateado}</p>
            </div>
        </div>
    `;
    
    return cardLink;
}