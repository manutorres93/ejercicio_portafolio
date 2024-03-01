/* Creación del objeto  */

const pisos = {
  piso1: {
    caneca1: 0,
    caneca2: 0,
    caneca3: 0,
  },
  piso2: {
    caneca1: 0,
    caneca2: 0,
    caneca3: 0,
  },
  piso3: {
    caneca1: 0,
    caneca2: 0,
    caneca3: 0,
  },
};

// selectores

let body = document.querySelector("body");
let btnSave = document.querySelector("#btnSubmit");
let cantidad = document.querySelector("#cantidad");
const pisoGuardar = document.querySelector("#select_floor");
const canecaAprovechable = document.querySelector("#aprovechables");
const canecaOrganicos = document.querySelector("#organicos");
const canecaNoAprovechable = document.querySelector("#no_aprovechables");
const numeroCambio1 = document.querySelector(".container_rubbish");

//Variables usadas
let cantidadIngresada = 0;
let valorGuardadoCaneca = 0;

//Eventlisteners

pisoGuardar.addEventListener("input", (e) => {
  const pisoSelect = "piso" + e.target.value;
  leerObjetoStorage(pisoSelect);
  cambiarColor(pisoSelect);
});

cantidad.addEventListener("input", (e) => {
  cantidadIngresada = Number(e.target.value);
  return cantidadIngresada;
});

canecaAprovechable.addEventListener("click", () => {
  valorGuardadoCaneca = 1;
  return valorGuardadoCaneca;
});
canecaOrganicos.addEventListener("click", () => {
  valorGuardadoCaneca = 2;
  return valorGuardadoCaneca;
});
canecaNoAprovechable.addEventListener("click", () => {
  valorGuardadoCaneca = 3;
  return valorGuardadoCaneca;
});

btnSave.addEventListener("click", () => {
  sumarCant();
});

//funciones

function sumarCant() {
  const pisoSeleccionado = "piso" + pisoGuardar.value;

  const canecaSeleccionada = "caneca" + valorGuardadoCaneca;

  console.log(pisos[pisoSeleccionado]);

  let totalBasuraCaneca = pisos[pisoSeleccionado][canecaSeleccionada];

  totalBasuraCaneca = totalBasuraCaneca + cantidadIngresada;

  pisos[pisoSeleccionado][canecaSeleccionada] = totalBasuraCaneca;

  console.log(pisos);

  
  if (totalBasuraCaneca <= 500) {
    let pisosStorage = JSON.stringify(pisos);
    localStorage.setItem("cantidad_basura", pisosStorage);
  } else {
    totalBasuraCaneca = totalBasuraCaneca - cantidadIngresada;
   
    alert("No cabe más basura");
  }
  cambiaValor(totalBasuraCaneca, valorGuardadoCaneca);
  
  return pisoSeleccionado;
}

function cambiaValor(totalBasuraCaneca, numeroCaneca) {
  const pisoSeleccionado = "piso" + pisoGuardar.value;

  const selectorCaneca =
    numeroCambio1.children[numeroCaneca - 1].children[0].children[0];
  selectorCaneca.innerHTML = `<span>${totalBasuraCaneca}/500</span>`;
  cambiarColor(pisoSeleccionado);
}

function leerObjetoStorage(numeroPiso) {
  for (let index = 1; index <= 3; index++) {
    const canecaSeleccionada = "caneca" + index;
    const totalBasuraCaneca = pisos[numeroPiso][canecaSeleccionada];
    cambiaValor(totalBasuraCaneca, index);
  }
}

function cambiarColor(numeroPiso) {
  const cambiarFondo = document.body;

  let totalBasuraCanecas = 0;

  for (let index = 1; index <= 3; index++) {
    const canecaSeleccionada = "caneca" + index;
    totalBasuraCanecas =
      totalBasuraCanecas + pisos[numeroPiso][canecaSeleccionada];
  }
  console.log(totalBasuraCanecas);
  console.log("hola");

  let porcentaje = (totalBasuraCanecas * 100) / 1500;

  if (porcentaje > 0 && porcentaje < 25) {
    cambiarFondo.style.backgroundColor = "red";
  } else if (porcentaje >= 25 && porcentaje < 75) {
    cambiarFondo.style.backgroundColor = "orange";
  } else if (porcentaje > 75) {
    cambiarFondo.style.backgroundColor = "green";
  } else {
    cambiarFondo.style.backgroundColor = "black";
  }
}
