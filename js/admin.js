// ------------------------------------------------------------------
//  ADMIN – Gestión de productos ADMIN:J MONI
// ------------------------------------------------------------------

// Persistencia -----------------------------------------------------
//let productList = JSON.parse(localStorage.getItem('productList')) || [];

// Elementos del DOM ------------------------------------------------
const form             = document.getElementById('admin-product-form');
const categorySelect   = document.getElementById('admin-category');
const otherWrapper     = document.getElementById('admin-category-other-wrapper');
const otherInput       = document.getElementById('admin-category-other');
const alertArea        = document.getElementById('admin-alert-area');

// Helpers ----------------------------------------------------------
/**
* Muestra una alerta Bootstrap (success | danger | info | warning)
* y la descarta automáticamente después de 3 s.
*/
function showAlert (msg, type = 'success') {
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  // Autodescartar
  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance(alertArea.querySelector('.alert'));
    alert.close();
  }, 3000);
}

// Lógica “Otro (especificar)” -------------------------------------
// categorySelect.addEventListener('change', () => {
//   const isOther = categorySelect.value === 'otro';
//   otherWrapper.classList.toggle('show', isOther);
//   otherInput.required = isOther;
//   if (!isOther) otherInput.value = '';
// });

// Envío de formulario ---------------------------------------------
form.addEventListener('submit', function (event) {
  event.preventDefault();

      // Captura de valores
    const artistName = document.getElementById('admin-artist-name').value.trim();
    const artName = document.getElementById('admin-art-name').value.trim();
    const urlImg = document.getElementById('admin-url-img').value.trim();
    const thumb1 = document.getElementById('admin-thumb1').value.trim(); // AGREGADO SERGIO
    const thumb2 = document.getElementById('admin-thumb2').value.trim(); // AGREGADO SERGIO
    const thumb3 = document.getElementById('admin-thumb3').value.trim(); // AGREGADO SERGIO
    const price = parseFloat(document.getElementById('admin-product-price').value);
    const artDescription = document.getElementById('admin-art-description').value.trim();

    // Categoría (gestiona “Otro”)
      const category = categorySelect.value;
                      


    // Validación                              (!Thumb1-3 AGREGADO SERGIO)
    if (!artistName || !artName || !urlImg || !thumb1 || !thumb2 || !thumb3 || isNaN(price) || !artDescription|| !category) {
      showAlert('Por favor, completa todos los campos.', 'danger');
    return;
    }

    // Creación del objeto para almacenar, con miniaturas
    const newProductStorage = {
        "nombre_obra": artName,
        "descripcion_obra": artDescription,
        "precio_obra": price,
        "estado_obra": true,
        "nombre_artista": artistName,
        "categoria": {
          "idCategoria": Number(category)
        },
        "imagenes": {
          "imagen_principal_url":urlImg,
          "miniatura_1_url": thumb1,
          "miniatura_2_url": thumb2,
          "miniatura_3_url": thumb3
        }
    };


    fetch('http://localhost:8080/obras/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProductStorage)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar la obra');
      }
      return response.text(); // O response.text() si el back no devuelve JSON
    })
    .then(data => {
      console.log('Obra guardada:', data);
       showAlert('Producto agregado correctamente');
       form.reset();
      categorySelect.value = '';
      console.log('Producto agregado:', newProductStorage);
      setTimeout(function() {
      location.reload();
    }, 4000);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al guardar la Obra.');
    });
});




