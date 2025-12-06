import { patchEquipo,getEquipos,getEquipo } from "./peticiones.js";

let selectEquipos = document.getElementById("equiposReroll");
let nuevoReroll = document.getElementById("nuevoReroll");
let btnEditar=document.getElementById("btnReroll");

btnEditar.addEventListener("click", modificarReroll)

async function modificarReroll(){

    let equipo =
    {
        reroll: nuevoReroll.value
    };

    await patchEquipo(selectEquipos.value, equipo);

}

async function cargarInput(){
    let equipo=await getEquipo(selectEquipos.value)
    nuevoReroll.value= equipo.reroll
}

async function cargarSelect() {
  let equipos = await getEquipos();
  equipos.forEach(equipo => {
    let option = document.createElement("option")
    option.text = equipo.nombre;
    option.value = equipo.id;
    selectEquipos.appendChild(option);
  });
    selectEquipos.addEventListener("change", cargarInput);
    cargarInput()
}

cargarSelect();