let strings = {};  // aquí se guardarán los textos cargados

export async function loadLanguage(lang) {

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
    // ejemplo de aplicación en HTML
    document.getElementById("nombre").innerText = strings.nombre;
    document.getElementById("edad").innerText = strings.edad;
    document.getElementById("pako").innerText = strings.pako;
}