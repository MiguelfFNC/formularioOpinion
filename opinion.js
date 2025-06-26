const form = document.getElementById("Form-Opinion");
const tbody = document.getElementById("Tabla-Cuerpo");

function cargarOpiniones() {
    const contenido = localStorage.getItem("Opiniones");
    if (contenido) {
        return JSON.parse(contenido);
    } else {
        return [];
    }
}
function guardarOpiniones(opinion) {
    localStorage.setItem("Opiniones", JSON.stringify(opinion));
}

function CargarTabla() {
    const opiniones = cargarOpiniones();
    tbody.innerHTML = "";

    opiniones.forEach((opinion) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td>${opinion.Servicio}</td>
        <td>${opinion.registra}</td>
        <td>${opinion.comentario}</td>

        `;
        tbody.appendChild(fila);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const Servicio = form.Evaluacion.value;
    const registra = form.registra.value;
    const comentario = form.comentario.value.trim();
    
    if (!Servicio || !registra || !comentario) return;

    const opiniones = cargarOpiniones();
    opiniones.push({ Servicio, registra, comentario });
    
    guardarOpiniones(opiniones);
    CargarTabla();
    form.reset();
});

document.addEventListener("DOMContentLoaded", CargarTabla);