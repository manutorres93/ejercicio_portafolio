console.log("clase");

const clases = {
  transformaciones: "Profesor Kevin Slughorn",
  herbologia: "Profesor Maria Umbridge",
  pociones: "Profesor Liliana McGonagall",
  encantamientos: "Profesora Jackie",
  defensaContraLasArtesOscuras: "Profesor Robinson Snape ",
  animalesMagicos: "Profesor David Filch",
  historiaDeMagia: "Profesor Ronald Sprout",
};

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
}

// Llama a la función al cargar el script
mostrarInformacionEstudiante();

const boton = document.querySelector(".btn-clase");

boton.addEventListener("click", (e) => {
  boton.disabled = true;
  const patronus = defensaContraLasArtesOscuras.generarAnimalPatronus();
  const menuInformacion = document.querySelector("#list-information");
  menuInformacion.children[5].textContent = `Patronus: ${patronus}`;
/* 
  setTimeout(() => {
    boton.disabled = false;
  }, 1000); */
});

const defensaContraLasArtesOscuras = {
  profesor: clases.defensaContraLasArtesOscuras,
  hora: "10 AM",
  animalPatronus: [
    "Ciervo",
    "Aguila",
    "Dragon",
    "Fenix",
    "Tlacuache",
    "Libelula",
  ],
  generarAnimalPatronus: function () {
    let indiceAleatorio = Math.floor(
      Math.random() * defensaContraLasArtesOscuras.animalPatronus.length
    );
    return this.animalPatronus[indiceAleatorio];
  },
};
