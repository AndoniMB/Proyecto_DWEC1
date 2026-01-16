let strings = {};

async function cargar() {
    const res = await fetch(`../json/archivo.json`);
    const localStrings = await res.json();

    strings = {...localStrings };
    document.getElementById("dios").textContent=strings["dios"];
    document.getElementById("mensaje").textContent=strings["mensaje"];
    document.getElementById("augurio").textContent=strings["augurio"];

}

await cargar()