const house = document.querySelector("#casa-asignada");

// Importa la función mostrarInformacionEstudiante desde hogwarts.js
function mostrarInformacionEstudiante() {
  // Recupera el objeto estudiante del localStorage
  const estudiante = JSON.parse(localStorage.getItem("estudiante"));

  // Verifica si el estudiante existe
  if (estudiante) {
    // Muestra la información en la lista
    const menuInformacion = document.querySelector("#list-information");
    menuInformacion.children[0].textContent = `Nombre: ${estudiante.nombre}`;
    menuInformacion.children[1].textContent = `Familia: ${estudiante.familia}`;
    menuInformacion.children[2].textContent = `Edad: ${estudiante.edad}`;
    menuInformacion.children[3].textContent = `Linaje: ${estudiante.linaje}`;
    menuInformacion.children[4].textContent = `Casa: ${estudiante.casa}`;
    menuInformacion.children[5].textContent = `Patronus: ${estudiante.patronus}`;
    menuInformacion.children[6].textContent = `Cualidad principal: ${estudiante.cualidades}`;
  } else {
    // Manejar el caso en el que el estudiante no existe en localStorage
    console.log("No se encontró información del estudiante en localStorage.");
  }

  house.innerHTML = `<h1>${estudiante.casa}</h1>`;
}

// Llama a la función al cargar el script
mostrarInformacionEstudiante();

const boton = document.querySelector(".btn-clase");

boton.addEventListener("click", (e) => {
  window.location.href = "clase.html";
});
