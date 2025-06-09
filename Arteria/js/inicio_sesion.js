document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form'); 

    // --- FUNCIÓN DE ALERTA (MOVIMOS SU DEFINICIÓN AQUÍ PARA QUE ESTÉ DISPONIBLE) ---
    function mostrarAlerta(mensaje, tipo = "danger") {
        const contenedor = document.querySelector(".mensaje-inicio");
        if (!contenedor) return; // Salir si no se encuentra el contenedor

        contenedor.innerHTML = `
          <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
    
        setTimeout(() => {
          const alert = contenedor.querySelector('.alert');
          if (alert) {
            // Usar el método de Bootstrap para cerrar la alerta si está disponible
            if (typeof bootstrap !== 'undefined') {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            } else {
                alert.remove(); // Fallback si Bootstrap no está listo
            }
          }
        }, 4000);
    }

    // --- LÓGICA DEL ENVÍO DEL FORMULARIO ---
    if (formulario) {
        formulario.addEventListener('submit', function (e) {
            e.preventDefault();
        
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
        
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
        
            if (!email || !password) {
                mostrarAlerta("Por favor completa todos los campos del formulario.", "warning");
                return;
            }
        
            
            // Enviar al backend
            fetch("http://localhost:8080/usuarios/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                correoUsuario: email,
                contrasenia_usuario: password
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.text(); // El backend devuelve el token como texto plano
                } else {
                    // Si las credenciales son inválidas, el backend devuelve un 401
                    throw new Error("Credenciales inválidas");
                }
            })
            .then(token => {
                // --- ¡LÓGICA DE ÉXITO FUSIONADA! ---
                mostrarAlerta("¡Inicio de sesión exitoso!", "success");
                
                // GUARDAMOS EL TOKEN RECIBIDO DEL BACKEND
                localStorage.setItem('token', token); 
                localStorage.setItem('loggedIn', 'true');
                
                const userRole = (email === "arteriacol@gmail.com") ? 'admin' : 'user';
                localStorage.setItem('role', userRole);
        
                // LÓGICA DE REDIRECCIÓN
                setTimeout(() => {
                    if (userRole === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 1500);
            })
            .catch(error => {
                // --- MANEJO DE ERRORES ---
                mostrarAlerta("Correo electrónico o contraseña incorrectos.", "danger");
                console.error('Error en el inicio de sesión:', error);
            });
        });
    }

    // --- LÓGICA DEL OJITO PARA LA CONTRASEÑA (SE MANTIENE IGUAL) ---
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
});