window.addEventListener('DOMContentLoaded', () => {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');
  const btnExplorar = document.getElementById('btn-carrito-vacio');
  const btnComprar = document.getElementById('btn-comprar');

  // Obtener carrito de localStorage
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Mostrar mensaje si el carrito está vacío
  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<p class="py-3 text-dark">Tu carrito está vacío.</p>';
    btnExplorar.style.display = 'block';
    totalSpan.textContent = '0';
    btnComprar.disabled = true;
    return;
  } else {
    btnExplorar.style.display = 'none';
    btnComprar.disabled = false;
  }

  // Generar HTML para cada producto
  listaCarrito.innerHTML = '';
  let total = 0;
  
  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    
    const itemHTML = `
      <li class="producto-carrito d-flex align-items-center gap-3 border-bottom py-3">
        <div class="d-flex align-items-center gap-3 flex-grow-1">
          <img src="${producto.imagen}" alt="${producto.nombre}" 
               class="img-thumbnail" style="width: 80px; height: auto;">
          <div class="flex-grow-1">
            <h5 class="mb-1">${producto.nombre}</h5>
            <p class="mb-0 text-dark">${producto.artista} - ${producto.tipo}</p>
            <p class="mb-0 text-dark">Tamaño: ${producto.tamano}</p>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <div class="input-group" style="width: 120px;">
            <button class="btn btn-outline-secondary btn-cantidad" type="button" 
                    data-index="${index}" data-action="decrement">-</button>
            <input type="text" class="form-control text-center cantidad-input" 
                   value="${producto.cantidad}" readonly>
            <button class="btn btn-outline-secondary btn-cantidad" type="button" 
                    data-index="${index}" data-action="increment">+</button>
          </div>
          <p class="mb-0 fw-bold text-dark" style="width: 100px;">
            $${subtotal.toLocaleString('es-CO')}
          </p>
          <button class="btn btn-outline-danger btn-eliminar" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </li>
    `;
    
    listaCarrito.innerHTML += itemHTML;
  });

  // Actualizar total
  totalSpan.textContent = total.toLocaleString('es-CO');

  // Manejar eventos de los botones
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', eliminarProducto);
  });

  document.querySelectorAll('.btn-cantidad').forEach(btn => {
    btn.addEventListener('click', actualizarCantidad);
  });

  // Función para eliminar producto
  function eliminarProducto(e) {
    const index = e.currentTarget.dataset.index;
    carrito.splice(index, 1);
    actualizarCarrito();
  }

  // Función para actualizar cantidad
  function actualizarCantidad(e) {
    const index = e.currentTarget.dataset.index;
    const action = e.currentTarget.dataset.action;
    
    if (action === 'increment') {
      carrito[index].cantidad += 1;
    } else if (action === 'decrement' && carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    }
    
    actualizarCarrito();
  }

  // Función para actualizar el carrito
  function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload(); // Recargar para actualizar la vista
  }

  // Manejar el botón de comprar
  btnComprar.addEventListener('click', () => {
    // Aquí puedes redirigir a la página de pago
    alert('Redirigiendo al proceso de pago...');
    // window.location.href = 'pago.html';
  });
});
// Actualizar el contador en el header después de cualquier cambio
function actualizarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  updateCartCounter(); // <-- Añade esta línea
  location.reload();
}