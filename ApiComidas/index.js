// console.log("Hola Mundo!");

const categoriasBtn = document.querySelector('#categorias');
const categoSelect = document.querySelector('#catego');
const pintImag = document.querySelector('.contenido');

console.log(categoriasBtn);

/* utilizar Api */
function llenarSelect() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => {
            return response.json();
        })
        .then(listaMenuCategorias => {
            /* console.log("Estas son las catergorias", listaMenuCategorias); */
            llenarSelector(listaMenuCategorias.categories)
            /* console.log(listaMenuCategorias.categories); */
        })
}

let escogerMenu;
llenarSelect();


/* pintar selector */
function llenarSelector(categorias) {

    categorias.forEach(cat => {
        const { strCategory } = cat;
        console.log(cat.strCategory); 
        categoSelect.innerHTML += `
        <option value=${strCategory}>${strCategory}</option>
        `;
    });
}

/* Obtener las comidas de la categoría seleccionada por el usuario */
function getComida(comida) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${comida}`)
        .then(rta => {
            return rta.json();
        })
        .then(cardsComida => {
            /* console.log("Estas son las catergorias", listaMenuCategorias); */
            // console.log(cardsComida.meals);
            pintComidas(cardsComida.meals);
        })
}

/* Pintar las comidas de acuerdo a la categoria */
function pintComidas(comidas) {
    pintImag.innerHTML = "";
    comidas.forEach(comida => {
        const { strMeal, strMealThumb } = comida;
        // console.log(strMeal);
        // console.log(strMealThumb);
        pintImag.innerHTML += `
        <section class="card">
            <img src=${strMealThumb} alt="">
            <p>Titulo: ${strMeal}</p>
        </section>
        `;

    })
}

/* Eventos */

categoSelect.addEventListener('input', () => {
    // console.log(categoSelect.value);
    escogerMenu = categoSelect.value;
    getComida(escogerMenu);
})