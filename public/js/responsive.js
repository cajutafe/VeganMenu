const navBarDesktop = document.querySelector(".nav-bar-desktop");
const navBarDesktopClone = navBarDesktop.cloneNode(true);
navBarDesktopClone.classList.remove("nav-bar-desktop", "nav-bar-expand-m", "nav-bar-expand-s");
navBarDesktopClone.classList.add("nav-bar-responsive");
// añadir el clon del nav despues de div "nav-bar"
const navBar = document.querySelector(".nav-bar");
navBar.parentNode.insertBefore(navBarDesktopClone, navBar.nextSibling);
const navBarResponsive = document.querySelector(".nav-bar-responsive");
navBarResponsive.classList.add("d-none");

// burger click 
const burger = document.querySelector(".burger");
burger.classList.add("d-none");
burger.addEventListener("click", () => {
  navBarResponsive.classList.toggle("d-none");
});

// gestion displays desktop/responsive y ocultar nav-bar-responsive cuando pasamos a desktop 
const navBarExpandX = navBarDesktop.classList.contains("nav-bar-expand-x");
const navBarExpandM = navBarDesktop.classList.contains("nav-bar-expand-m");
const navBarExpandS = navBarDesktop.classList.contains("nav-bar-expand-s");
displayToogleNavBar();

function displayToogleNavBar() {
  burger.classList.add("d-none");
  navBarDesktop.style.visibility = "visible";
  // gestion displays desktop/responsive
  if (window.innerWidth < 1200 && navBarExpandX) {
    burger.classList.remove("d-none");
    navBarDesktop.style.visibility = "hidden";
  }
  if (window.innerWidth < 768 && navBarExpandM) {
    burger.classList.remove("d-none");
    navBarDesktop.style.visibility = "hidden";
  }
  if (window.innerWidth < 576 && navBarExpandS) {
    burger.classList.remove("d-none");
    navBarDesktop.style.visibility = "hidden";
  }
  // ocultar nav-bar-responsive cuando pasamos a desktop
  if (window.innerWidth > 1200 && navBarExpandX || window.innerWidth > 768 && navBarExpandM || window.innerWidth > 576 && navBarExpandS) {
    navBarResponsive.classList.add("d-none");
  }
}
window.addEventListener("resize", () => {
  displayToogleNavBar();
});

//Boton inferior registrarse
const btn_reg = document.querySelector(".registro");
btn_reg.addEventListener("click", (e)=>{
  e.preventDefault();
  // console.log(btn_reg);

  location.href = "/users";
})
