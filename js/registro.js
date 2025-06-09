
document.getElementById("registro-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;
  const nombre = form.nombre.value.trim();
  const apellido = form.apellido.value.trim();
  const celular = form.celular.value.replace(/\D/g, "");
  const correo = form.correo.value.trim();
  const contraseña = form.contraseña.value;
  const acepto = form.acepto.checked;

   //Alertas
  function mostrarAlerta(mensaje, tipo = "danger") { 
  const contenedor = document.querySelector(".mensaje-Registro");
  contenedor.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  setTimeout(() => {
    const alert = contenedor.querySelector('.alert');
    if (alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }
  }, 4000);
}


  // Validaciones de campos vacíos
  if (!nombre || !apellido || !correo || !celular || !contraseña) {
    mostrarAlerta("Por favor completa todos los campos del formulario.", "warning");
    return;
  }

   // Validar celular
  if (celular.length !== 10) {
    mostrarAlerta("El número de celular debe tener exactamente 10 dígitos.", "warning");
    return;
  }

  if (!acepto) {
    mostrarAlerta("Debes aceptar los términos y la política de privacidad para continuar.", "danger");
    return;
  }

 

  // Validación de contraseña segura
  const contraseñaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!contraseñaValida.test(contraseña)) {
    mostrarAlerta("La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula y un número.", "warning");
    return;
  }

  const confirmar = form.confirmar.value;

    if (contraseña !== confirmar) {
    mostrarAlerta("Las contraseñas no coinciden.", "danger");
    return;
    }

  // Obtener los usuarios actuales (si existen) del localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si ya existe un usuario con el mismo correo
  const usuarioExistente = usuarios.find(user => user.correo === correo);
  if (usuarioExistente) {
    mostrarAlerta("Ya existe un usuario con este correo electrónico.", "danger");
    return;
  }


  // Crear un nuevo usuario
  const usuario = {
    nombre,
    apellido,
    celular,
    correo,
    contraseña
  };

  // Agregar el nuevo usuario al array
  usuarios.push(usuario);



  // Guardar el array de usuarios actualizado en localStorage
 /* localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mostrarAlerta("Registro exitoso", "success");
  form.reset();*/





  //------Prueba para conectar con el backend------------//

  fetch("http://localhost:8080/usuarios/registro", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nombre_usuario: nombre,
    apellido_usuario: apellido,
    telefono_usuario: celular,
    correo_usuario: correo,
    contrasenia_usuario: contraseña
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error("No se pudo registrar el usuario");
    }
    return response.text(); // O response.json() si devuelves JSON
  })
  .then(data => {
    mostrarAlerta("Registro exitoso", "success");
    form.reset();
  })
  .catch(error => {
    console.error("Error:", error);
    mostrarAlerta("Ocurrió un error al registrar el usuario", "danger");
  });
//------Prueba de conectar con el backend------------//




});



//Ojito
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const icon = btn.querySelector('i');
    const esVisible = input.type === 'text';
    input.type = esVisible ? 'password' : 'text';
    icon.classList.toggle('bi-eye-fill');
    icon.classList.toggle('bi-eye-slash');
  });
});



/*//Limpiar LocalStorage (Descomentar el código para limpiar el local Storage)
localStorage.clear();
location.reload();
*/
