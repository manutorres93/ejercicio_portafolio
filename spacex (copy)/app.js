/* ------------SELECTORES--------- */

const contenedorCards = document.querySelector("#container");
const tbody = document.querySelector(".modal-body");


const url = "https://api.spacexdata.com/v3/launches";

/* ----------ADD EVENT LISTENERS ---------- */

document.addEventListener("DOMContentLoaded", () => {
  getData(); //Funcion que me trae la información de toda la API
  informacionModal();
});


/* --------CONSUMIR DE LA API--------- */


/* fetch con async await */

async function getData() {
  try {
    const response = await fetch(url); //conexion al recurso
    const datos = await response.json(); //consumo del recurso

    mostrarCards(datos);
  } catch (error) {
    alert('Algo ha salido mal')
  }
}

//Función que llena las cards
function mostrarCards(datos) {
  

  datos.forEach((iterador) => {
    const { links: {mission_patch}, launch_year, mission_name, flight_number } = iterador; //Tr
   /*  const { mission_patch } = iterador.links; */ //Esto es lo mismo de arriba de mission_patch
  /*  const {land_success} = data.rocket.first_stage.cores[0]; */

    const bootsCard = document.createElement("div"); //creo div
    bootsCard.classList.add("contenedor-card")

    //agrego al div la card
    bootsCard.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${mission_patch}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${mission_name}</h5>
          <p class="card-text">Año de lanzamiento:${launch_year}</p>
          <!-- Button trigger modal -->
          <button type="button" id='btn-modal' class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" numeroVuelo=${flight_number}>
                Ver detalles
                </button>
                
        </div>
        </div>

  `;
  //al contenedor le agrego las cards rellenadas. Hay otra forma de hacerlo que es crendo el div y sumándole el div creado a lo que hay. Revisar código de llamada a APIs
    contenedorCards.appendChild(bootsCard);
  });
}


//Función que al hacer click me carga la información que guardé en el botón
function informacionModal() {
  contenedorCards.addEventListener("click", cargarModal);
}

  function cargarModal(iterador) {
    
    //recupero el valor que guradé en el boton para cada card
    const numberFlight = iterador.target.getAttribute("numeroVuelo");

    //Función que recupera de un segundo API
    getDataFlight(numberFlight);
  }

async function getDataFlight(numberFlight) {
  try {
    const response = await fetch(
      `https://api.spacexdata.com/v3/launches/${numberFlight}`
    ); //conexion al recurso
    const datos = await response.json(); //consumo del recurso, datos es un array tipo JSON
    

    getModalInformation(datos);
  } catch (error) {}
}

function getModalInformation(information) {
  const { rocket_name, rocket_type } = information.rocket;
  const { launch_success} = information;
  const { land_success } = information.rocket.first_stage.cores[0]; //nunca se usa pero me coje oq ue hay dentro de un array que esta dentro de un objeto
  const {youtube_id}=information.links

  tbody.innerHTML=`
  <td>
  <iframe width="465" height="315" src="https://www.youtube.com/embed/${youtube_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </td>

  <table class="table">
              <thead>
                  <tr>
                      <th>Cohete:</th>
                      <td id="rocketName"> ${rocket_name} </td>
                      
                  </tr>
                  <tr>
                      <th>Tipo Cohete:</th>
                      <th id="rocketType">${rocket_type} </th>
                  </tr>
                  <tr>
                      <th>Exito Lanzamiento:</th>
                      <th id="launchSuccess">${launch_success}</th>
                  </tr>
              </thead>
          </table>


  
  `
/* 
const rowModal = document.createElement("tr");

  rowModal.innerHTML = `
   
  <td>
  <iframe width="465" height="315" src="https://www.youtube.com/embed/${youtube_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </td>
 
   `;

  tbody.appendChild(rowModal);

  document.querySelector('#rocketName').textContent= rocket_name
  document.querySelector('#rocketType').textContent= rocket_type
  document.querySelector('#launchSuccess').textContent=land_success
 */
}
