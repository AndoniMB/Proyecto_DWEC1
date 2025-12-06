import { getJugadores, getJugador, getEquipos, postJugador, deleteJugador, putJugador } from "./peticiones.js";

let selectAccion = document.getElementById("acciones");
let selectJugadores = document.getElementById("eligeJugador");

let formu = document.getElementById("tablasJugadores");
let btnConfirmar = document.getElementById("btnConfirmar");
btnConfirmar.addEventListener("click", eliminarJugador);

let inputs = document.getElementsByTagName("input");

let btnGuardar = document.getElementById("btnGuardar");

selectAccion.addEventListener("change", cambiarAccion);
selectJugadores.addEventListener("change", cambiarJugador);

async function cambiarAccion() {

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = ""
  }

  await cargarJugadores();

  switch (selectAccion.value) {
    case "crear":
      btnGuardar.removeEventListener("click", modificarJugador);
      formu.style.display = "block";
      selectJugadores.style.display = "none";
      btnConfirmar.style.display = "none";
      btnGuardar.addEventListener("click", aniadirJugador);
      break;
    case "modificar":
      btnGuardar.removeEventListener("click", aniadirJugador);
      selectJugadores.style.display = "block";
      btnConfirmar.style.display = "none";
      await cambiarJugador();
      formu.style.display = "block";
      btnGuardar.addEventListener("click", modificarJugador);
      break;
    case "eliminar":
      formu.style.display = "none";
      selectJugadores.style.display = "block";
      btnConfirmar.style.display = "block";
      break;
  }
}

async function cambiarJugador() {
  
  let jugador = await getJugador(selectJugadores.value);
  let equiposDisp = await getEquipos();
  let equipos = [];

  jugador.Equipos.forEach(eq => {
    for (let i = 0; i < equiposDisp.length; i++) {
      if (eq == equiposDisp[i].id) {
        equipos.push(equiposDisp[i].nombre);
        break;
      }
    }
  });
  
  inputs[0].value = jugador.posicion;
  inputs[1].value = jugador.tags;
  inputs[2].value = jugador.cantidad;
  inputs[3].value = jugador.coste;
  inputs[4].value = jugador.MV;
  inputs[5].value = jugador.FU;
  inputs[6].value = jugador.AG;
  inputs[7].value = jugador.PA;
  inputs[8].value = jugador.AR;
  inputs[9].value = jugador.Habilidades;
  inputs[10].value = jugador.Pri;
  inputs[11].value = jugador.Sec;
  inputs[12].value = equipos;
}

//funcion para cargar el select de jugadores
async function cargarJugadores() {
  let jugadores = await getJugadores();
  jugadores.forEach(jugador => {
    let option = document.createElement("option")
    option.text = jugador.posicion;
    option.value = jugador.id;
    selectJugadores.appendChild(option);
  });
}

async function aniadirJugador() {

  let jugadores = await getJugadores();
  let maxID = -1;
  jugadores.forEach(j => {
    if (parseInt(j.id) > maxID) {
      maxID = parseInt(j.id);
    }
  });

  let equiposDisp = await getEquipos();
  let equiposInput = inputs[12].value.split(",").trim();
  let equipos = [];

  equiposInput.forEach(eq => {
    for (let i = 0; i < equiposDisp.length; i++) {
      if (eq.toLowerCase() == equiposDisp[i].nombre.toLowerCase()) {
        equipos.push(equiposDisp[i].id);
        break;
      }
    }
  });

  let jugador =
  {
    "id": (maxID + 1) + "",
    "posicion": inputs[0].value,
    "tags": inputs[1].value.split(",").trim(),
    "cantidad": inputs[2].value,
    "coste": inputs[3].value,
    "MV": inputs[4].value,
    "FU": inputs[5].value,
    "AG": inputs[6].value,
    "PA": inputs[7].value,
    "AR": inputs[8].value,
    "Habilidades": inputs[9].value.split(",").trim(),
    "Pri": inputs[10].value.split(",").trim(),
    "Sec": inputs[11].value.split(",").trim(),
    "Equipos": equipos
  };

  await postJugador(jugador);

}

async function modificarJugador() {

  let equiposDisp = await getEquipos();
  let equiposInput = inputs[12].value.split(",").trim();
  let equipos = [];

  equiposInput.forEach(eq => {
    for (let i = 0; i < equiposDisp.length; i++) {
      if (eq.toLowerCase() == equiposDisp[i].nombre.toLowerCase()) {
        equipos.push(equiposDisp[i].id);
        break;
      }
    }
  });

  let jugador =
  {
    "id": selectJugadores.value,
    "posicion": inputs[0].value,
    "tags": inputs[1].value.split(",").trim(),
    "cantidad": inputs[2].value,
    "coste": inputs[3].value,
    "MV": inputs[4].value,
    "FU": inputs[5].value,
    "AG": inputs[6].value,
    "PA": inputs[7].value,
    "AR": inputs[8].value,
    "Habilidades": inputs[9].value.split(",").trim(),
    "Pri": inputs[10].value.split(",").trim(),
    "Sec": inputs[11].value.split(",").trim(),
    "Equipos": equipos
  };

  await putJugador(selectJugadores.value, jugador);
  
}



async function eliminarJugador() {
  await deleteJugador(selectJugadores.value);
}
 
cambiarAccion()