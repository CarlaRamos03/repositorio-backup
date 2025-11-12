// gestion_usuarios.js
const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");

async function cargarUsuarios() {
  try {
    const respuesta = await fetch("https://dummyjson.com/users");
    const datos = await respuesta.json();
    const usuarios = datos.users;

    // 🔹 Verificamos quién está logueado
    const rol = sessionStorage.getItem('rol');

    // 🔹 Agregamos columna "Contraseña" solo si es superadmin
    const cabecera = document.querySelector("#tablaUsuarios thead tr");
    if (cabecera && rol === "superadmin" && !document.querySelector("#columnaPass")) {
      const th = document.createElement("th");
      th.id = "columnaPass";
      th.textContent = "Contraseña";
      cabecera.appendChild(th);
    }

    tablaUsuarios.innerHTML = "";

    usuarios.forEach(usuario => {
      const fila = document.createElement("tr");

      let contenido = `
        <td>${usuario.firstName}</td>
        <td>${usuario.lastName}</td>
        <td>${usuario.username}</td>
        <td>${usuario.email}</td>
        <td>${usuario.phone}</td>
      `;

      // 🔹 Solo el superadmin ve las contraseñas
      if (rol === "superadmin" && usuario.password) {
        contenido += `<td>${usuario.password}</td>`;
      } else if (rol === "superadmin") {
        contenido += `<td class="text-muted">N/A</td>`;
      }

      fila.innerHTML = contenido;
      tablaUsuarios.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    tablaUsuarios.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-danger">
          ❌ Error al cargar los usuarios. Intente nuevamente más tarde.
        </td>
      </tr>`;
  }
}

cargarUsuarios();
