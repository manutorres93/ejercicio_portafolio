/* Actividades Modulo 3
Paso 1
Eres estudiante de Hogwarts, tienes la edad suficiente para entrar a estudiar,
tienes padres, y un linaje de sangre, aun no sabes tu casa, ni tu animal patronus,
también tienes cualidades, que son muy importantes para que el sombrero
seleccionador te asigne una casa.
Crear un objeto, con Nombre, edad, familia, linaje, casa, animal patronus,
cualidades, debes tener en tus cualidades solo los 3 de alguna de las casas:
“Valor, fuerza, audacia"
"Justicia, Lealtad, Paciencia"
“Creatividad, Erudición, Inteligencia"
"Ambición, Determinación, Astucia"
Linajes: Mestizo, muggle, Sangre pura */

const linaje = ["Sangre pura", "Mestizo", "Muggle"];

for (let i = 0; i < linaje.length; i++) {
  const opcionLinaje = document.createElement("option");
  opcionLinaje.value = linaje[i];
  opcionLinaje.textContent = linaje[i];

  console.log(opcionLinaje.value);

  document.querySelector("#linaje").appendChild(opcionLinaje);
}

const cualidad = [
  "Valor",
  "Fuerza",
  "Audacia",
  "Justicia",
  "Lealtad",
  "Paciencia",
  "Creatividad",
  "Erudición",
  "Inteligencia",
  "Ambición",
  "Determinación",
  "Astucia",
];

for (let i = 0; i < cualidad.length; i++) {
  const opcionCualidad = document.createElement("option");
  opcionCualidad.value = cualidad[i];
  opcionCualidad.textContent = cualidad[i];

  document.querySelector("#cualidad").appendChild(opcionCualidad);
}

const estudiante = {
  nombre: "",
  edad: 0,
  familia: "",
  linaje: "",
  casa: "Aun no tienes casa. Ve a la cena",
  patronus: "Aun no tienes patronus. Ve a clase de Defensa contra las Artes oscuras",
  cualidades: "",
};

const nombreEstudiante = document.querySelector("#nombre");
const edadEstudiante = document.querySelector("#edad");
const familiaEstudiante = document.querySelector("#familia");
const linajeEstudiante = document.querySelector("#linaje");
const cualidadEstudiante = document.querySelector("#cualidad");

nombreEstudiante.addEventListener("input", (e) => {
  estudiante.nombre = e.target.value;
  actualizarEstudiante(); // Llamar a la función que imprime el estudiante
});

familiaEstudiante.addEventListener("input", (e) => {
  estudiante.familia = e.target.value;
  actualizarEstudiante(); // Llamar a la función que imprime el estudiante
});

edadEstudiante.addEventListener("input", (e) => {
  estudiante.edad = e.target.value;
  actualizarEstudiante(); // Llamar a la función que imprime el estudiante
});

linajeEstudiante.addEventListener("input", (e) => {
  estudiante.linaje = e.target.value;
  actualizarEstudiante(); // Llamar a la función que imprime el estudiante
});

cualidadEstudiante.addEventListener("input", (e) => {
  estudiante.cualidades = e.target.value;
  actualizarEstudiante(); // Llamar a la función que imprime el estudiante
  seleccionCasa();
});

function seleccionCasa() {
  const estCualidad = estudiante.cualidades;
  if (
    estCualidad === "Valor" ||
    estCualidad === "Fuerza" ||
    estCualidad === "Audacia"
  ) {
    estudiante.casa = "Gryffindor";
  } else if (
    estCualidad === "Justicia" ||
    estCualidad === "Lealtad" ||
    estCualidad === "Paciencia"
  ) {
    estudiante.casa = "Hufflepuff";
  } else if (
    estCualidad === "Creatividad" ||
    estCualidad === "Erudición" ||
    estCualidad === "Inteligencia"
  ) {
    estudiante.casa = "Ravenclaw";
  } else {
    estudiante.casa = "Slytherin";
  }
}

function actualizarEstudiante() {
  console.log(estudiante);
  const menuInformacion = document.querySelector("#list-information");
  menuInformacion.children[0].textContent = `Nombre: ${estudiante.nombre}`;
  menuInformacion.children[1].textContent = `Familia: ${estudiante.familia}`;
  menuInformacion.children[2].textContent = `Edad: ${estudiante.edad}`;
  menuInformacion.children[3].textContent = `Linaje: ${estudiante.linaje}`;
  menuInformacion.children[4].textContent = `Casa: ${estudiante.casa}`;
  menuInformacion.children[5].textContent = `Patronus: ${estudiante.patronus}`;
  menuInformacion.children[6].textContent = `Cualidad principal: ${estudiante.cualidades}`;
}

const boton = document.querySelector(".btn-casa");

boton.addEventListener("click", (e) => {
  guardarEstudiante();
});



function guardarEstudiante() {
  // Puedes realizar alguna acción aquí, como enviar el objeto estudiante a un servidor o realizar más validaciones
  console.log("Estudiante guardado:", estudiante);
  localStorage.setItem("estudiante", JSON.stringify(estudiante));
  window.location.href = "cena.html";
}

//console.log(estudiante);

/* Paso 2
Es una año difícil en Hogwarts, ya que corren rumores que el innombrable ha vuelto,
y el y el famoso Harry Potter también ha ingresado contigo ¡¡¡
Crear Objeto de clases:
tus clases y tus profesores:
transformaciones: "Profesor Kevin Slughorn",
herbologia: "Profesor Maria Umbridge",
pociones: "Profesor Liliana McGonagall",
encantamientos: "Profesora Jackie",
defensaContraLasArtesOscuras: "Profesor Robinson Snape ",
animalesMagicos: "Profesor David Filch",
historiaDeMagia: "Profesor Ronald Sprout" */



/* so 3
Inicia un nuevo día, es el día del sombrero seleccionador¡¡
hay una gran cena de bienvenida, estas tu con todos tus compas, según tu linaje y
cualidades, el sombrero seleccionador te asignara una casa 
Crear un objeto que sirva para escoger la casa al que pertenece el estudiante, será
condicional según tus cualidades y linaje.
Gryffindor ("Valor, fuerza, audacia"
Linaje: Mestizo, muggle, Sangre pura )
Hufflepuff("Justicia, Lealtad, Paciencia"
Linaje: Mestizo, muggle)
Ravenclaw(“Creatividad, Erudición, Inteligencia"
Linaje: Mestizo, muggle, Sangre pura)
Slytherin ("Ambición, Determinación, Astucia"
Linaje: "Sangre Pura")*/

const sombreroSelecciona = () => {
  if (
    estudiante.cualidades === "Ambición, Determinación, Astucia" &&
    estudiante.linaje === "sangre pura"
  ) {
    estudiante.casa = "Slytherin";
  } else if (estudiante.cualidades === "Valor, fuerza, audacia") {
    estudiante.casa = "Gryffindor ";
  } else if (
    estudiante.cualidades === "Justicia, Lealtad, Paciencia" &&
    (estudiante.linaje === "mestizo" || estudiante.linaje === "muggle")
  ) {
    estudiante.casa = "Hufflepuff";
  } else if (estudiante.cualidades === "Creatividad, Erudición, Inteligencia") {
    estudiante.casa = "Ravenclaw";
  }

  return estudiante.casa;
};

estudiante.casa = sombreroSelecciona();

/* Paso 4
primer día de clases: vas temprano a clase de transformaciones, en clase de 
transformaciones que es un objeto, con transformaciones con boggarts, 
«Altera la habilidad de un boggart para cambiar de forma y provoca risa para derrotarlo.» 
esto se logra con el encantamiento "Riddikulus".
- Definir la clase de Transformaciones
En este paso, estás creando un objeto llamado claseTransformaciones que representa
 la clase de Transformaciones. Estableces el nombre del profesor, el horario y una propiedad
  para rastrear la transformación de los boggarts.
- Paso 2: Crear una función para realizar la transformación con "Riddikulus"
Aquí defines una función realizarTransformacionRiddikulus dentro de claseTransformaciones. 
Esta función verifica si hay un boggart presente y, si es así, realiza la transformación con 
el encantamiento "Riddikulus".
- Paso 3: Crear una función para enfrentar un boggart
Aquí defines otra función enfrentarBoggart dentro de claseTransformaciones. 
Esta función toma un boggart como argumento, muestra un mensaje con la forma original del boggart,
realiza la transformación y muestra el resultado.
- Paso 4: Uso y llamada a las funciones
En este paso, creas un objeto boggartEjemplo y luego llamas a la función enfrentarBoggart
 de claseTransformaciones para enfrentar el boggart */

let claseTransformaciones = {
  nombreProfesor: clases.transformaciones,
  horario: "10-12",
  riddikulus: function (boggart) {
    if (boggart === true) {
      return true;
    } else {
      return false;
    }
  },
  enfrentarBoggart: function (boggartOriginal) {
    let boggart = boggartOriginal;
    console.log(`la forma original es de ${boggart}`);

    boggart = "payaso";

    return `la forma final es ${boggart}`;
  },
};

let boggartEjemplo = {
  nombreBoggart: "soledad",
};

console.log(
  claseTransformaciones.enfrentarBoggart(boggartEjemplo.nombreBoggart)
);

/* puedes ir agregando las demás clases, pero es importante que vayas a la clase de defensa contra 
las artes oscuras, para puedas defenderte de los dementores que han escapado de Azkaban.
crear un objeto con nombre defensaContraLasArtesOscuras con la función de generar un animal
 de patronus, lo genere random y llenar la variable, de la propiedad animalPatronus. 
 Crear función donde aparece un dementor, y si el estudiante tiene ya su animal patronus 
 detiene el dementor, si no, el estudiante será absorbido, y será llevado a la enfermería */

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


