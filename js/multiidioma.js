let strings = {};  // aquí se guardarán los textos cargados

export async function loadLanguage(lang) {
    //validar que el idioma existe
    if(lang==null){
        lang="es";
    }
    //meter el idioma en la sesion
    sessionStorage.setItem("idioma",lang);

    // carga el idioma seleccionado
    const res = await fetch(`../lang/${lang}.json`);
    const localStrings = await res.json();

    // carga español como fallback
    const fallbackRes = await fetch("../lang/es.json");
    const fallbackStrings = await fallbackRes.json();

    // mezcla: si falta algo en el idioma elegido, usa español
    strings = { ...fallbackStrings, ...localStrings };
    applyStrings();
}

function applyStrings() {
    const ids = Object.keys(strings);

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = strings[id];
        }
    });
}