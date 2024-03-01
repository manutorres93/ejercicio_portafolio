//llenado del select

const categoriesSelect= document.querySelector('#categories')
const divCards=document.querySelector('#container')

document.addEventListener('DOMContentLoaded', ()=>{
    callingApi()
})

//llamar datos de la Api
async function callingApi() {

    try {
        const response= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')

       //console.log(response);
        const dataInResponse= await response.json()

       //console.log(dataInResponse);

        fillSelect(dataInResponse.categories) // De esta forma accedo al array Search que tiene objetos adentro, hay otra forma, ver en peliculas
        
    } catch (error) {
        alert('algo ha salido mal')
        
    }

    
}

//pintar selector
function fillSelect(data){   

    data.forEach(iterador => {

        const {strCategory}=iterador
        console.log(iterador.strCategory);

        categoriesSelect.innerHTML+= 
        ` 
        <option value="${strCategory}">${strCategory}</option>
        
        `
      
    });
}

//cuando le doy clic al select recupera el valor del value del option
categoriesSelect.addEventListener('input', (e)=>{
    const categorieSelected= e.target.value

    showDishes(categorieSelected)
})


//Traigo la informacion de la api pasandole una categoria especifica
async function showDishes(selectedCat){
    try {
       const response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCat}`) 
       const dataCategorie= await response.json()
       showDishesHtml(dataCategorie)

    } catch (error) {
        alert('algo salio mal')
    }
}

function showDishesHtml(data) {
    
    let dataDishes= data.meals

    divCards.innerHTML=''

    dataDishes.forEach(dish => {
        const {strMeal,strMealThumb }= dish

        divCards.innerHTML+=
        `
        <div class="card">
            <img src=${strMealThumb} alt="">
            <p>Titulo: ${strMeal}</p>
        </div>
        
        `
    });
}