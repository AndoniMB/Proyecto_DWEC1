//imports
import { getEquipos,getJugadoresEquipo,getEquipo } from "./peticiones.js";
import { loadLanguage } from "./multiidioma.js";

//acceder al select
let select=document.getElementById("selectEquipos");

//funcion para añadir las cabeceras de la tabla
function aniadeCabeceras(tr){
    let tdCantidad=document.createElement("th");
    tdCantidad.id="cantidad";
    tr.appendChild(tdCantidad);
    let tdAlineacion=document.createElement("th");
    tdAlineacion.id="alineacion";
    tr.appendChild(tdAlineacion);
    let tdTags=document.createElement("th");
    tdTags.id="tags";
    tr.appendChild(tdTags);
    let tdPrecio=document.createElement("th");
    tdPrecio.id="precio";
    tr.appendChild(tdPrecio);
    let tdMovimiento=document.createElement("th");
    tdMovimiento.id="mv";
    tr.appendChild(tdMovimiento);
    let tdFuerza=document.createElement("th");
    tdFuerza.id="fu";
    tr.appendChild(tdFuerza);
    let tdAgilidad=document.createElement("th");
    tdAgilidad.id="ag";
    tr.appendChild(tdAgilidad);
    let tdPase=document.createElement("th");
    tdPase.id="ps";
    tr.appendChild(tdPase);
    let tdArmadura=document.createElement("th");
    tdArmadura.id="ar";
    tr.appendChild(tdArmadura);
    let tdHabilidades=document.createElement("th");
    tdHabilidades.id="habilidades";
    tr.appendChild(tdHabilidades);
    let tdPrincipal=document.createElement("th");
    tdPrincipal.id="pri";
    tr.appendChild(tdPrincipal);
    let tdSecundaria=document.createElement("th");
    tdSecundaria.id="sec";
    tr.appendChild(tdSecundaria);
}

//crear la funcion para crear la tabla
async function mostrarEquipoSeleccionado(event){
    let section=document.getElementById("informacionEquipo");
    section.innerHTML="";
    let tabla=document.createElement("table");
    let tr=document.createElement("tr");
    aniadeCabeceras(tr);
    tabla.appendChild(tr);
    let reroll=document.createElement("p");
    let apotecario=document.createElement("p");
    let normasEspeciales=document.createElement("p");

    let jugadores=await getJugadoresEquipo(select.value)
    let equipo= await getEquipo(select.value);
    jugadores.forEach(jugador => {
        aniadirATabla(tabla,jugador);
        
    });
    switch (sessionStorage.getItem("idioma")) {
        case "en":
            reroll.textContent="Reroll: 0-8 "+equipo.reroll+"k";
            if(equipo.apotecario){

            }else{

            }
            apotecario.textContent="Apothecary: "+equipo.apotecario;
            if(equipo.normasEspeciales.length==0){
                normasEspeciales.textContent="The team doesn't have speacial rules";
            }else{
                normasEspeciales.textContent="Special rules: "+equipo.normasEspeciales.join(", ");
            }
          break;
        case "eu":
            reroll.textContent="Reroll: 0-8 "+equipo.reroll+"k";
            if(equipo.apotecario){
                apotecario.textContent="Medikua: bai";
            }else{
                apotecario.textContent="Medikua: ez";
            }
            if(equipo.normasEspeciales.length==0){
                normasEspeciales.textContent="Ez ditu arau berezirik";
            }else{
                normasEspeciales.textContent="Arau bereziak: "+equipo.normasEspeciales.join(", ");
            }
          break;
        case "es":
            reroll.textContent="Reroll: 0-8 "+equipo.reroll+"k";
            if(equipo.apotecario){
                apotecario.textContent="Apotecario: si";
            }else{
                apotecario.textContent="Apotecario: no";
            }
            if(equipo.normasEspeciales.length==0){
                normasEspeciales.textContent="No tiene normas especiales";
            }else{
                normasEspeciales.textContent="Normas Especiales: "+equipo.normasEspeciales.join(", ");
            }
          break;
      }

    tabla.className="equipo";
    tabla.classList.add("ocupaTodo")
    section.appendChild(tabla);
    section.appendChild(reroll);
    section.appendChild(apotecario);
    section.appendChild(normasEspeciales);
    loadLanguage(sessionStorage.getItem("idioma"))
}

//funcion para aniadir un jugador a la tabla
function aniadirATabla(tabla,jugador){
    let tr=document.createElement("tr");
    let tdCantidad=document.createElement("td");
    let tdAlineacion=document.createElement("td");
    let tdTags=document.createElement("td");
    let tdPrecio=document.createElement("td");
    let tdMovimiento=document.createElement("td");
    let tdFuerza=document.createElement("td");
    let tdAgilidad=document.createElement("td");
    let tdPase=document.createElement("td");
    let tdArmadura=document.createElement("td");
    let tdHabilidades=document.createElement("td");
    let tdPrincipal=document.createElement("td");
    let tdSecundaria=document.createElement("td");
    tdCantidad.textContent="0-"+jugador.cantidad;
    tdAlineacion.textContent=jugador.posicion;
    tdTags.innerHTML="·"+jugador.tags.join("<br>·");
    tdPrecio.textContent=jugador.coste+"k";
    tdMovimiento.textContent=jugador.MV;
    tdFuerza.textContent=jugador.FU;
    tdAgilidad.textContent=jugador.AG+"+";
    tdPase.textContent=jugador.PA+"+";
    tdArmadura.textContent=jugador.AR+"+";
    if (jugador.Habilidades[0] == "-") {
      tdHabilidades.innerHTML = "-";
    } else {
      tdHabilidades.innerHTML = "·" + jugador.Habilidades.join("<br>·");
    }
    // tdHabilidades.innerHTML=jugador.Habilidades.join("<br>");
    tdPrincipal.textContent=jugador.Pri;
    tdSecundaria.textContent=jugador.Sec;
    tr.appendChild(tdCantidad);
    tr.appendChild(tdAlineacion);
    tr.appendChild(tdTags);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdMovimiento);
    tr.appendChild(tdFuerza);
    tr.appendChild(tdAgilidad);
    tr.appendChild(tdPase);
    tr.appendChild(tdArmadura);
    tr.appendChild(tdHabilidades);
    tr.appendChild(tdPrincipal);
    tr.appendChild(tdSecundaria);
    tabla.appendChild(tr);
}

//funcion para ir a crear el equipo
function crearEqipo(event){
    location="../html/crearEquipo.html";
}

//funcion para cargar el select
async function cargarSelect() {
  let equipos = await getEquipos();
  equipos.forEach(equipo => {
    let option = document.createElement("option")
    option.text = equipo.nombre;
    option.value = equipo.id;
    select.appendChild(option);
  });
  select.addEventListener("change", mostrarEquipoSeleccionado);
}

//funcion para cargar la pagina
async function cargarPagina() {
  await cargarSelect();
  await mostrarEquipoSeleccionado();
}
document.getElementById("btnCrearEquipo").addEventListener("click",crearEqipo)
cargarPagina();