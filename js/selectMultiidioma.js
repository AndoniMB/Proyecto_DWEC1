import { loadLanguage } from "./multiidioma.js";

// acceder al select
let idiomaSelect = document.getElementById("multiidioma");

//guardar el idioma
let idiomaGuardado = sessionStorage.getItem("idioma") || "es";

//cambiar el select para elegir el idioma
idiomaSelect.value = idiomaGuardado;

loadLanguage(idiomaGuardado);

function cambiarIdioma() {
    let idiomaSeleccionado = idiomaSelect.value;

    // guardar idioma en sesion
    sessionStorage.setItem("idioma", idiomaSeleccionado);

    // recargar pagina
    window.location.reload();
}

// evento del select
idiomaSelect.addEventListener("change", cambiarIdioma);