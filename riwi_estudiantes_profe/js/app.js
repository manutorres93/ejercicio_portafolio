console.log(coders);


/* Crear dinámicamente los valores del select con nombres de coders */

coders.forEach((coder) => {
  const opcion = document.createElement("option"); //esta incompleto porque tiene que tener el value y el
  opcion.value = coder.nombre;
  opcion.textContent = coder.nombre;
  //hasta aqui esta en el DOM, pero no lo he vinculado con nada
  document.querySelector("#nombre").appendChild(opcion);
}); 

/* Llenar dinámicamente de edades el selct respectivo */

const max = 45;
const min = max - 30;

for (let i = min; i < max + 1; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  document.querySelector("#edad").appendChild(option);
}

/* event listeners */

document.addEventListener("DOMContentLoaded", () => {
  showCoders(coders);

  console.log(criteriosSeleccionados);

  selectCoder()

  /* persistencia: llamar al arrayCards, que es le que tenemos dentro de locallStorage */

  arrayCards= JSON.parse(localStorage.getItem('contratados'))
  injectingCoderHtml()

});

/* Funcion para intectar directamente al html las cards */

/* function showCoders(coders){ //ser eecibe como parametro la lista de coderss
    const contenedorTarjetas= document.querySelector('#tarjetas') //selector


    coders.forEach((iterador)=>{
        const coderHtml = document.createElement('p')
        coderHtml.innerHTML= `  <div class="card" style="width: 18rem">
        <img  src="img/${iterador.imagen}" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">${iterador.nombre}</h5>
          <p class="card-text">
           ${iterador.detalle}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
        </ul>
      </div>`;

      contenedorTarjetas.appendChild(coderHtml)
    })
} */

function showCoders(coders) {
  //ser eecibe como parametro la lista de coderss
 
  const contenedorTarjetas = document.querySelector("#tarjetas"); //selector

  limpiar()



  if (coders.length>0) {

    coders.forEach((iterador) => {
      /* Destrcuturing. Sacando las propiedades del objeto y convirtiendolas en variables */
  
      const { imagen, nombre, detalle,promedio ,especialidad,expertoTecnologia,edad, clanRiwi,id} = iterador; //es de iterador porque en esa vuelta iterador va a ser igual a ese objeto
  
      const coderHtml = document.createElement("p");
      coderHtml.innerHTML = `  
      <div class="card" style="width: 18rem">
        <img  src="img/${imagen}" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">
           ${detalle}
          </p>
        
        
          </div>
        <ul class="list-group list-group-flush">
           
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"
          img="${imagen}"  prom='${promedio}' esp=${especialidad} tec='${expertoTecnologia}' edad="${edad}" clan="${clanRiwi}" nombre="${nombre}">
            Detalle
          </button>
          <a href="#" class="btn btn-success boton" id="${id}">Hire</a>
        </ul>
      </div>

 

     
      
      `;

      /* En este caso img, prom, esp, tec son atributos */
  
      contenedorTarjetas.appendChild(coderHtml);
    });
  } else {
    const mensaje =document.createElement('p')
  
      mensaje.innerHTML=`<p>Result not found</p>`
  
      contenedorTarjetas.appendChild(mensaje)
  }






  
 
}

/* Objeto donde voy a guardar cada una de las opciones seleccionadas por el usuario */

const criteriosSeleccionados={
  nombre:'',
  edad: '',
  minPromedio:'',
  maxPromedio:'',
  clanRiwi:'',
  nivelIngles:'',
  especialidad:'',
  expertoTecnologia:''
}

let nombreBuscado=''

/* Estos selectores por lo general van es arriba. Selectores */

const nombreCoder =document.querySelector('#nombre')
const edadCoder=document.querySelector('#edad')
const minimoPromedio= document.querySelector('#minimo')
const maximoPromedio= document.querySelector('#maximo')
const clanRiwi= document.querySelector('#clanRiwi')
const nivelIngles= document.querySelector('#nivelIngles')
const especialidad= document.querySelector('#especialidad')
const expertoTecnologia= document.querySelector('#expertoTecnologia')


const buscarCoder= document.querySelector('#busqueda')

/* Hice todos estos selectores para agregar un evento . Event listener para los filtros*/

nombreCoder.addEventListener('input', (e)=>{

/*   console.log(e.target); */


  criteriosSeleccionados.nombre= e.target.value
  /* Funcion para filtrar coder */
  filtrarCoder();

})


edadCoder.addEventListener('input', (e)=>{

  criteriosSeleccionados.edad= e.target.value

  
  filtrarCoder();


})

minimoPromedio.addEventListener('input', (e)=>{

  criteriosSeleccionados.minPromedio= e.target.value
  filtrarCoder();


})

maximoPromedio.addEventListener('input', (e)=>{

  criteriosSeleccionados.maxPromedio= e.target.value
  filtrarCoder();


})

clanRiwi.addEventListener('input', (e)=>{

  criteriosSeleccionados.clanRiwi= e.target.value
  filtrarCoder();


})

nivelIngles.addEventListener('input', (e)=>{

  criteriosSeleccionados.nivelIngles= e.target.value
  filtrarCoder();


})

especialidad.addEventListener('input', (e)=>{

  criteriosSeleccionados.especialidad= e.target.value
  filtrarCoder();


})

expertoTecnologia.addEventListener('input', (e)=>{

  criteriosSeleccionados.expertoTecnologia= e.target.value
  filtrarCoder();


})



buscarCoder.addEventListener('input', (e)=>{
  criteriosSeleccionados.nombre= e.target.value
  filtrarCoder()
})



/* Declaración de función de alto nivel . Esta serà la función padre contenedora*/

function filtrarCoder(){

  const resultado = coders.
  filter(filtrarNombre).
  filter(filtrarEdad).filter(filtrarMinPromedio).filter(filtrarMaxPromedio).
  filter(filtrarClan).
  filter(filtrarNivelIngles)//el argumento es un llamado a otra funciòn

  console.log(resultado);

  showCoders(resultado)

/* Esta es otra forma de hacer la validacion para el not found

if(resultado.length){
    showCoders(resultado)

  }else{
    console.log('No se encontro resultados');
  } */
}

/* Declaracion de funcion filtrar nombre. Esta sera la 'hija'*/

function filtrarNombre(coder){
    if (criteriosSeleccionados.nombre){
      return coder.nombre === criteriosSeleccionados.nombre
    }else{
      return coder
    }
}

/* El coder o iterador en estas funciones vienen del iterador  */


function filtrarEdad(coder){
  if (criteriosSeleccionados.edad){
    return coder.edad ===Number (criteriosSeleccionados.edad)
  }else{
    return coder
  }
}

function filtrarMinPromedio(iterador){
  if(criteriosSeleccionados.minPromedio){
    return iterador.promedio>= criteriosSeleccionados.minPromedio //aqui es iterador.promedio porque saco la propiedad de 'iterador'e iterador es una variable x que está refiriendose al objeto de la bd donde está la propiedad 'promedio'
  }else{
    return iterador
  }
}


function filtrarMaxPromedio(coder){
  if(criteriosSeleccionados.maxPromedio){
    return coder.promedio<= criteriosSeleccionados.maxPromedio //aqui es iterador.promedio porque saco la propiedad de 'iterador'e iterador es una variable x que está refiriendose al objeto de la bd donde está la propiedad 'promedio'
  }else{
    return coder
  }
}

function filtrarClan(coder){
  if (criteriosSeleccionados.clanRiwi){
    return coder.clanRiwi === criteriosSeleccionados.clanRiwi
  }else{
    return coder
  }
}

function filtrarNivelIngles(coder){
  if (criteriosSeleccionados.nivelIngles){
    return coder.nivelIngles === criteriosSeleccionados.nivelIngles
  }else{
    return coder
  }
}

/* function filtrarNivelIngles(coder){
  if (criteriosSeleccionados.nivelIngles){
    return coder.nivelIngles === criteriosSeleccionados.nivelIngles
  }else{
    return coder
  }
} */

function limpiar(){


  let m= document.querySelectorAll('p') //m es un array porque el query selector all devuelve muchos

  for (let a = 0; a < m.length; a++){
    m[a].remove()
  }
  

}

/* 1. Defino el selector:
const buscarCoder= document.querySelector('#busqueda')


2. Defino el addEventListener 
buscarCoder.addEventListener('input', (e)=>{
  criteriosSeleccionados.nombre= e.target.value
  filtrarCoder()
})


o

1. Defino el selector
const buscarCoder= document.querySelector('#busqueda')
2. Creo funcion
function filtrarCoderNOmbre(){}
3. Defino evento.
buscarCoder.addEventListener('input', (e)=>{
  criteriosSeleccionados.nombre= e.target.value
  filtrarCoder()
})*/





/* Aqui tengo que llamar al elemento tbody que es donde voy a rellenar l ainformacion 
y crear las filas*/

const tbody= document.querySelector('tbody')
const rowModal=document.createElement('tr')
/* const title=document.querySelector('.modal-title') */
const title=document.querySelector('#exampleModalLongTitle')

function selectCoder(){
  
  /* Aqui tenemos el contenedor */
  const coderDetails= document.querySelector('#tarjetas')


  /* Hay que agregarle un event listener */

  coderDetails.addEventListener('click',loadDetails)


}

/* Creo la funcion loadDetails */

function loadDetails(e){
  /* necesito recuperar el valor del atributo de la destructuracion . La idea es usr el mismo nombre de la variable*/
  const imagen = e.target.getAttribute('img')
  const prom= e.target.getAttribute('prom')
  const speciality= e.target.getAttribute('esp')
  const tech=e.target.getAttribute('tec')
  const clan=e.target.getAttribute('clan')
  const edad=e.target.getAttribute('edad')
  const nombre=e.target.getAttribute('nombre')

  rowModal.innerHTML=`
  <td>
  <img src='img/${imagen}' width="180px">
  </td>
  <td>
  <p>${clan}</p>
  </td>
  <td>
  <p>${edad}</p>
  </td>
  <td>
  <p>${prom>4?'Es apto para trabajar':'No es apto para trabajar'}</p>
  </td>
  <td>
  <p>${speciality}</p>
  </td>
  <td>
  <p>${tech}</p>
  </td>
 
  `;

  title.textContent = nombre;
/*   title.innerHTML=`<h5>${nombre}</h5>`

  titleCont.appendChild(title) */

  tbody.appendChild(rowModal)
}


/* MODULO DE CONTRATACION HIRE */

/* selectores */

const cards =document.querySelector('#tarjetas')
const tbodie= document.querySelector('#tbodie')
const deleteListCards= document.querySelector('#deleteListCards')
const deleteAllButton= document.querySelector('#cleanCart')

/* event listeners */

cards.addEventListener('click', selectCards)
deleteListCards.addEventListener('click', deleteCards)
deleteAllButton.addEventListener('click', deleteAll)



/* Declaro la funcion */

function selectCards(e){
  /* prevenir el evento por defecto tienen los enlaces que es que se suba */
  e.preventDefault()


/* Para que las cosas pasen solo cuando le doy al boton hire que tiene la calss boton */
  if(e.target.classList.contains('boton')){
    /* Nececito seleccionar al elemento padre  */
    const selectedCoder= e.target.parentElement.parentElement
    console.log(selectedCoder);

    /* Creo la funcion para darle tratamiento fuera de este lugar. Le paso selectedCoder porque este tiene toda la info */
    details(selectedCoder)
  }

  }


  /* Declaro array para llenar las cards */

  let arrayCards =[]

  /* Creo funcion --- */

  function details(selectedCoder){
    const coderDetalle= {

      /* especificar los valores de cada elemento para pasarselo a la propiedad del objeto coderDetalle
      en selectedCorder ya tengo la card entonces por eso no tengo que irme hasta el document query selectos 
      
      puedo usar img y h5 porque son valores unicos dentro de lla card*/

      imagen: selectedCoder.querySelector('img').src,
      nombre: selectedCoder.querySelector('h5').textContent,
      detalle: selectedCoder.querySelector('p').textContent,
      id: selectedCoder.querySelector('.boton').getAttribute('id'), //id para eliminar

    }

    arrayCards=[...arrayCards, coderDetalle] /* Split operator que me permite copiar lo que hay antes , añadiendole lo que se le estàá apsandp */

    console.table(arrayCards);
/* hasta aqui tengo los elemnetos en el array cards */

    injectingCoderHtml();
    

   
  }



  function deleteCards(e){
    /* Creo un array que quede con todos loos coders a los que no le di click */
    if (e.target.classList.contains('deleteCards')) {
      const coderToErase= e.target.getAttribute('id')
      console.log(coderToErase);
      arrayCards= arrayCards.filter((coderErased)=>
        coderErased.id!==coderToErase
      )
      injectingCoderHtml()
    }

  }

  /* con esto ya necesito es inyectarlo en el HTML  */
  function injectingCoderHtml(){
    cleanHtml()
  arrayCards.forEach((card)=>{
  /* Lo primero que hay que haer es que hay que destructurar el array porque adentro hay objetos.  */

  const{imagen, nombre, detalle, id}=card /* Recordar que la fuente es el iterador en este caso, card */

  /* Debo realiar una fila por cada objeto */

  const row = document.createElement('tr')

  row.innerHTML=`
  <td>
  <img src='${imagen}' width="200px">
  </td>
  <td> 
          <p>${nombre}</p>
      </td>
      <td>
          <p>${detalle}</p>
      </td>

      <td>
          <a href="#" class = "deleteCards btn btn-danger" id=${id}> X </a>
      </td>`

  tbodie.appendChild(row)
  addStorage()
})



  }

  function cleanHtml(){
    tbodie.innerHTML =""
  }

  function deleteAll(){
    cleanHtml()
  }


  /* PERSISTENCIA */

 function addStorage(){
  const codersContratados = JSON.stringify(arrayCards)      
  localStorage.setItem('contratados', codersContratados)
  
 }

 





