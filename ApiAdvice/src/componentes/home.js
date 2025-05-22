export default async function mostrarHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Consejo del día</h2>
    <div id="consejo" style="margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9; font-size: 1.2em;">
      Cargando consejo...
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <button id="nuevoConsejo" style="padding: 10px 20px; font-size: 1em;">Obtener otro consejo</button>
    </div>
  `;

  const contenedor = document.getElementById("consejo");
  const boton = document.getElementById("nuevoConsejo");

  async function obtenerConsejo() {
    try {
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-cache", // Para evitar que repita el mismo consejo
      });
      const json = await res.json();
      contenedor.innerText = `"${json.slip.advice}"`;
    } catch (error) {
      contenedor.innerText = "Error al obtener el consejo: " + error.message;
    }
  }

  // Cargar el primer consejo
  obtenerConsejo();

  // Nuevo consejo al hacer clic
  boton.addEventListener("click", obtenerConsejo);
}
