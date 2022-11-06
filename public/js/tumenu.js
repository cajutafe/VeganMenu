//AJAX API RANDOM

fetch ('https://random-data-api.com/api/food/random_food?size=50')
    .then(response => response.json())
    .then(foodAPI => menu_semanalAPI(foodAPI))
    .catch(error => console.log(error))



function menu_semanalAPI(menuSemanal){
    const desayuno = document.querySelector(".desayuno");
    // console.log(desayuno);
    const img_desayuno = document.querySelector(".img_desayuno");
    //  console.log(img_desayuno);
     const nom_desayuno = document.querySelector(".nom_desayuno");
    //  console.log(nom_desayuno);
    const comida = document.querySelector(".comida");
    // console.log(comida);
    const img_comida = document.querySelector(".img_comida");
    //  console.log(img_comida);
     const nom_comida = document.querySelector(".nom_comida");
    //  console.log(nom_comida);
    const cena = document.querySelector(".cena");
    // console.log(cena);
    const img_cena = document.querySelector(".img_cena");
    //  console.log(img_cena);
     const nom_cena = document.querySelector(".nom_cena");
    //  console.log(nom_cena);

    menu.forEach(menuDiario =>{
        const plato = menuDiario.dish
        const img = menuDiario.img
    })
}


//Boton nuevo menu
const btn_nuevoMenu = document.querySelector(".nuevo_menu");
btn_nuevoMenu.addEventListener("click", (e)=>{
    e.preventDefault();
})