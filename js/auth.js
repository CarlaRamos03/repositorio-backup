// auth.js
// --- Manejo de Login + Sesión usando la API pública de DummyJSON ---

// --- LOGIN (usando fetch) ---
async function iniciarSesion(usuario, clave) {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: usuario,
                password: clave
            })
        });

        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }

        const data = await response.json();

        // Guardar sesión en el navegador
        sessionStorage.setItem('usuarioLogeado', data.username);
        sessionStorage.setItem('token', data.token);

        // Redirigir a la página de administración
        window.location.href = 'administracion.html';

    } catch (error) {
        const loginError = document.getElementById('login-error');
        if (loginError) {
            loginError.textContent = 'Usuario o contraseña incorrectos';
        }
        console.error('Error de inicio de sesión:', error);
    }
}

// --- VERIFICAR SESIÓN ---
function verificarSesion() {
    if (!window.location.href.includes('login.html')) {
        const usuarioLogeado = sessionStorage.getItem('usuarioLogeado');
        if (!usuarioLogeado) {
            // Si no hay sesión, redirigir al login
            window.location.href = 'login.html';
        } else {
            // Mostrar bienvenida y botón de logout
            const navbar = document.querySelector('.navbar-nav');
            if (navbar && !document.getElementById('logout-btn')) {
                const liBienvenida = document.createElement('li');
                liBienvenida.classList.add('nav-item');
                liBienvenida.innerHTML = `
                    <span class="nav-link text-dark">Bienvenido, ${usuarioLogeado}</span>
                `;
                navbar.appendChild(liBienvenida);

                const liLogout = document.createElement('li');
                liLogout.classList.add('nav-item');
                liLogout.innerHTML = `
                    <button id="logout-btn" class="btn btn-outline-danger btn-sm ms-2">
                        Cerrar sesión
                    </button>
                `;
                navbar.appendChild(liLogout);

                // Evento para cerrar sesión
                document.getElementById('logout-btn').addEventListener('click', cerrarSesion);
            }
        }
    }
}

// --- CERRAR SESIÓN ---
function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// --- EVENTO DE LOGIN ---
const formularioLogin = document.getElementById('form');
if (formularioLogin) {
    formularioLogin.addEventListener('submit', function (event) {
        event.preventDefault();
        const usuario = document.getElementById('usuario').value.trim();
        const clave = document.getElementById('clave').value.trim();
        iniciarSesion(usuario, clave);
    });
}

// Verifica sesión en todas las páginas (excepto login)
verificarSesion();
