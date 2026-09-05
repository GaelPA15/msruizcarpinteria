document.addEventListener("DOMContentLoaded", () => {
  const productos = document.querySelectorAll(".producto");

  // Por si en el futuro agregas una imagen nueva y olvidas poner el botón,
  // este código lo agrega automáticamente.
  productos.forEach((producto) => {
    const imagen = producto.querySelector("img");
    if (!imagen) return;

    let boton = producto.querySelector(".ver-imagen");
    if (!boton) {
      boton = document.createElement("button");
      boton.type = "button";
      boton.className = "ver-imagen";
      boton.textContent = "Ver imagen completa";
      imagen.insertAdjacentElement("afterend", boton);
    }
  });

  // Crear el visor una sola vez.
  const visor = document.createElement("div");
  visor.className = "visor-imagen";
  visor.setAttribute("aria-hidden", "true");
  visor.innerHTML = `
    <div class="visor-contenido" role="dialog" aria-modal="true" aria-labelledby="visorTitulo">
      <button class="visor-cerrar" type="button" aria-label="Cerrar visor">×</button>

      <div class="visor-foto">
        <img class="visor-foto-img" src="" alt="">
      </div>

      <div class="visor-info">
        <h2 id="visorTitulo"></h2>
        <p class="visor-descripcion"></p>
        <button class="visor-volver" type="button">← Volver a ver lo demás</button>
      </div>
    </div>
  `;
  document.body.appendChild(visor);

  const foto = visor.querySelector(".visor-foto-img");
  const titulo = visor.querySelector("#visorTitulo");
  const descripcion = visor.querySelector(".visor-descripcion");
  const cerrarBtn = visor.querySelector(".visor-cerrar");
  const volverBtn = visor.querySelector(".visor-volver");

  let ultimoBoton = null;

  function abrirVisor(producto, boton) {
    const imagen = producto.querySelector("img");
    const encabezado = producto.querySelector(".descripcion h3, .descripcion h4");
    const texto = producto.querySelector(".descripcion p");

    if (!imagen) return;

    ultimoBoton = boton;
    foto.src = imagen.getAttribute("src") || imagen.src;
    foto.alt = imagen.getAttribute("alt") || "Imagen del trabajo";
    titulo.textContent = encabezado ? encabezado.textContent.trim() : foto.alt;
    descripcion.textContent = texto ? texto.textContent.trim() : "";

    visor.classList.add("activo");
    visor.setAttribute("aria-hidden", "false");
    document.body.classList.add("visor-abierto");
    cerrarBtn.focus();
  }

  function cerrarVisor() {
    visor.classList.remove("activo");
    visor.setAttribute("aria-hidden", "true");
    document.body.classList.remove("visor-abierto");
    foto.src = "";

    if (ultimoBoton) {
      ultimoBoton.focus();
    }
  }

  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".ver-imagen");
    if (!boton) return;

    const producto = boton.closest(".producto");
    if (!producto) return;

    abrirVisor(producto, boton);
  });

  cerrarBtn.addEventListener("click", cerrarVisor);
  volverBtn.addEventListener("click", cerrarVisor);

  visor.addEventListener("click", (evento) => {
    if (evento.target === visor) {
      cerrarVisor();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && visor.classList.contains("activo")) {
      cerrarVisor();
    }
  });
});
