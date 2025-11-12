// Evitar que se ejecute en login.html
if (!window.location.href.includes('login.html')) {
    const usuarioLogeado = sessionStorage.getItem('usuarioLogeado');

    if (!usuarioLogeado) {
        // Redirige al login si no hay sesión
        window.location.href = 'login.html';
    } else {
        // Mostrar nombre del usuario en la navbar
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            const li = document.createElement('li');
            li.classList.add('nav-item');
            li.innerHTML = `<span class="nav-link text-dark">Bienvenido, ${usuarioLogeado}</span>`;
            navbar.appendChild(li);
        }
    }
}

// --- Manejar cierre de sesión ---
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('usuarioLogeado'); // eliminar sesión
        window.location.href = 'login.html'; // volver al login
    });
}
