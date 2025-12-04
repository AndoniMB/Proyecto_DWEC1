//importar generarPDF
import { generarPDF } from "./funcionalidades.js";
//importar las funcionalidades de getEquipos y getJugadoresEquipo
import { getEquipos, getJugadoresEquipo, getEquipo } from "./peticiones.js";

// variable para almacenar los jugadores y extras seleccionados
let mapaElemtosEquipo = new Map();
//guardar el select en variable de ambito global
let select;
//crear mapa de info de jugadores
let infoJugadores = {};  // key = nombre.toLowerCase() 

// variables globales para los indicadores y la imagen
let dineroGastado = 0;
let jugadoresTotales = 0;
let indicadorDinero;
let indicadorJugadores;
let divIndicadores;
let txtErrorTesoreria;
let txtErrorJugadores;

// función para añadir jugador o extra
function aniadirJugador(nombre, cantidadMax, precio, spanCantidad, esExtra = false) {
  let cantidadActual = mapaElemtosEquipo.get(nombre) || 0;
  let limite = parseInt(cantidadMax.split("-")[1]);
  let costo = precio;

  if (!esExtra && jugadoresTotales >= 16) {
    switch (sessionStorage.getItem("idioma")) {
      case "en":
        alert("You can't have more than 16 players in your team.");
        break;
      case "eu":
        alert("Ezin dituzu 16 jokalari baino gehiago izan zure taldean.");
        break;
      case "es":
        alert("No puedes tener más de 16 jugadores en tu equipo.");
        break;
    }
    return;
  }

  if (cantidadActual < limite) {
    mapaElemtosEquipo.set(nombre, cantidadActual + 1);
    spanCantidad.textContent = `${mapaElemtosEquipo.get(nombre)}-${limite}`;

    dineroGastado += costo;
    if (!esExtra) jugadoresTotales++;
    actualizarIndicadores();
  } else {
    switch (sessionStorage.getItem("idioma")) {
      case "en":
        alert(`You can't add more than ${limite} "${nombre}"`);
        break;
      case "eu":
        alert(`Ezin dituzu ${limite} "${nombre}" baino gehiago izan`);
        break;
      case "es":
        alert(`No puedes añadir más de ${limite} "${nombre}"`);
        break;
    }
  }
}

// función para eliminar jugador o extra
function eliminarJugador(nombre, cantidadMax, precio, spanCantidad, esExtra = false) {
  let cantidadActual = mapaElemtosEquipo.get(nombre) || 0;
  let limite = parseInt(cantidadMax.split("-")[1]);
  let costo = precio;

  if (cantidadActual > 0) {
    mapaElemtosEquipo.set(nombre, cantidadActual - 1);
    spanCantidad.textContent = `${mapaElemtosEquipo.get(nombre)}-${limite}`;

    dineroGastado -= costo;
    if (!esExtra) jugadoresTotales--;
    actualizarIndicadores();
  }
}

// función para actualizar indicadores
function actualizarIndicadores() {
  switch (sessionStorage.getItem("idioma")) {
    case "en":
      indicadorDinero.textContent = `Spent treasury: ${dineroGastado}/1000k`;
      indicadorJugadores.textContent = `Players: ${jugadoresTotales}/16`;
      break;
    case "eu":
      indicadorDinero.textContent = `Gastatutako dirua: ${dineroGastado}/1000k`;
      indicadorJugadores.textContent = `Jokalariak: ${jugadoresTotales}/16`;
      break;
    case "es":
      indicadorDinero.textContent = `Tesorería gastada: ${dineroGastado}/1000k`;
      indicadorJugadores.textContent = `Jugadores: ${jugadoresTotales}/16`;
      break;
  }
  indicadorDinero.style.color = dineroGastado > 1000 ? "red" : "black";
  txtErrorTesoreria.style.visibility = dineroGastado > 1000 ? "visible" : "hidden";

  indicadorJugadores.style.color = jugadoresTotales < 11 ? "red" : "black";
  txtErrorJugadores.style.visibility = jugadoresTotales < 11 ? "visible" : "hidden";
}

// función auxiliar para crear tabla de estadísticas
function crearTablaEstadisticas(contenedorEstadisticas, tdMovimiento, tdFuerza, tdAgilidad, tdPase, tdArmadura) {
  const ESTADISTICAS = [
    ["MV", tdMovimiento],
    ["FU", tdFuerza],
    ["AG", tdAgilidad],
    ["PA", tdPase],
    ["AR", tdArmadura]
  ];

  ESTADISTICAS.forEach(([texto, td]) => {
    let tr = document.createElement("tr");
    let label = document.createElement("td");
    label.textContent = texto;
    tr.appendChild(label);
    tr.appendChild(td);
    contenedorEstadisticas.appendChild(tr);
  });
}

// función genérica para crear tarjetas
function crearTarjetaGenerica(section, nombre, tags, limite, precio, mv, fu, ag, pa, ar, habilidades, pri, sec, esExtra = false) {
  let div = document.createElement("div");
  let tdCantidad = document.createElement("span");
  let tdAlineacion = document.createElement("span");
  let tdPrecio = document.createElement("span");
  let tdTags = document.createElement("span");
  let contenedorEstadisticas = document.createElement("table");
  let tdMovimiento = document.createElement("td");
  let tdFuerza = document.createElement("td");
  let tdAgilidad = document.createElement("td");
  let tdPase = document.createElement("td");
  let tdArmadura = document.createElement("td");
  let tdHabilidades = document.createElement("span");
  let btnAniadir = document.createElement("button");
  let btnEliminar = document.createElement("button");

  tdCantidad.textContent = (mapaElemtosEquipo.get(nombre.toLowerCase()) || 0) + `-${limite}`;
  tdAlineacion.textContent = nombre;
  tdTags.textContent = tags;
  tdPrecio.textContent = precio + "k";
  tdMovimiento.textContent = mv || "-";
  tdFuerza.textContent = fu || "-";
  tdAgilidad.textContent = ag + "+" || "-";
  tdPase.textContent = pa + "+" || "-";
  tdArmadura.textContent = ar + "+" || "-";
  tdHabilidades.textContent = habilidades || "-";

  //no se puede llamar a loadLanguage porque funciona por id y el id tiene que ser unico
  switch (sessionStorage.getItem("idioma")) {
    case "en":
      btnAniadir.textContent = "Add";
      btnEliminar.textContent = "Remove";
      break;
    case "eu":
      btnAniadir.textContent = "Gehitu";
      btnEliminar.textContent = "Kendu";
      break;
    case "es":
      btnAniadir.textContent = "Añadir";
      btnEliminar.textContent = "Eliminar";
      break;
  }

  btnAniadir.addEventListener("click", (event) => {
    event.preventDefault();
    aniadirJugador(nombre.toLowerCase(), tdCantidad.textContent, precio, tdCantidad, esExtra);
  });

  btnEliminar.addEventListener("click", (event) => {
    event.preventDefault();
    eliminarJugador(nombre.toLowerCase(), tdCantidad.textContent, precio, tdCantidad, esExtra);
  });

  div.appendChild(tdCantidad);
  div.appendChild(tdTags);
  div.appendChild(tdAlineacion);
  div.appendChild(tdPrecio);

  if (!esExtra) {
    crearTablaEstadisticas(contenedorEstadisticas, tdMovimiento, tdFuerza, tdAgilidad, tdPase, tdArmadura);
    div.appendChild(contenedorEstadisticas);
  }

  tdHabilidades.style.backgroundColor = "white";
  div.appendChild(tdHabilidades);
  div.appendChild(btnAniadir);
  div.appendChild(btnEliminar);
  section.appendChild(div);

  // Aplicar clases y áreas
  div.className = "tarjeta";
  tdTags.style.gridArea = "tags";
  tdTags.style.fontWeight = "bold";
  tdAlineacion.style.gridArea = "tipo";
  tdCantidad.style.gridArea = "cantidad";
  contenedorEstadisticas.style.gridArea = "estadisticas";
  tdHabilidades.style.gridArea = "habilidades";
  tdPrecio.style.gridArea = "precio";
  btnAniadir.style.gridArea = "aniadir";
  btnEliminar.style.gridArea = "eliminar";
  contenedorEstadisticas.className = "equipo";

  infoJugadores[nombre.toLowerCase()] = {
    posicion: nombre,
    tags,
    limite,
    precio,
    mv,
    fu,
    ag,
    pa,
    ar,
    habilidades,
    pri,
    sec
  };
}

async function mostrarEquipo(section, equipo) {
  let jugadores = await getJugadoresEquipo(equipo)
  jugadores.forEach(jugador => {
    crearTarjetaGenerica(section, jugador.posicion, jugador.tags, jugador.cantidad, jugador.coste, jugador.MV, jugador.FU, jugador.AG, jugador.PA, jugador.AR, jugador.Habilidades, jugador.Pri, jugador.Sec, false)
  });
  await mostrarExtras(section, equipo);
}

// extras finales
async function mostrarExtras(section, idEquipo) {
  let equipo = await getEquipo(idEquipo);
  let rerollPrecio = equipo.reroll;
  switch (sessionStorage.getItem("idioma")) {
    case "en":
      crearTarjetaGenerica(section, "Reroll", [], 8, rerollPrecio, "-", "-", "-", "-", "-", ["Repeat a roll"], [], [], true);
      crearTarjetaGenerica(section, "Coaching assistants", [], 6, 10, "-", "-", "-", "-", "-", ["Help on a kickoff roll"], [], [], true);
      crearTarjetaGenerica(section, "Animadoras", [], 6, 10, "-", "-", "-", "-", "-", ["Help on a kickoff roll"], [], [], true);
      crearTarjetaGenerica(section, "Fan Factor", [], 6, 10, "-", "-", "-", "-", "-", ["Help on a kickoff roll and on the income roll"], [], [], true);
      if (equipo.apotecario) {
        crearTarjetaGenerica(section, "Apothecary", [], 1, 50, "-", "-", "-", "-", "-", ["Repeat a injury roll"], [], [], true);
      }
      break;
    case "eu":
      crearTarjetaGenerica(section, "Reroll", [], 8, rerollPrecio, "-", "-", "-", "-", "-", ["Errepikatu dado jaurtiketa"], [], [], true);
      crearTarjetaGenerica(section, "Entrenatzailearen laguntzaileak", [], 6, 10, "-", "-", "-", "-", "-", ["Sake gertaera batean laguntzen dute"], [], [], true);
      crearTarjetaGenerica(section, "Animadoras", [], 6, 10, "-", "-", "-", "-", "-", ["Sake gertaera batean laguntzen dute"], [], [], true);
      crearTarjetaGenerica(section, "Fan Factor", [], 6, 10, "-", "-", "-", "-", "-", ["Sake gertaera batean laguntzen dute baita diru jaurtiketan ere"], [], [], true);
      if (equipo.apotecario) {
        crearTarjetaGenerica(section, "Medikua", [], 1, 50, "-", "-", "-", "-", "-", ["Lesio jaurtiketa bat errepikatu"], [], [], true);
      }
      break;
    case "es":
      crearTarjetaGenerica(section, "Reroll", [], 8, rerollPrecio, "-", "-", "-", "-", "-", ["Repetir tiradas"], [], [], true);
      crearTarjetaGenerica(section, "Ayudantes de entrenador", [], 6, 10, "-", "-", "-", "-", "-", ["Ayudan en una tirada de patada incial"], [], [], true);
      crearTarjetaGenerica(section, "Animadoras", [], 6, 10, "-", "-", "-", "-", "-", ["Ayudan en alguna una de patada incial"], [], [], true);
      crearTarjetaGenerica(section, "Fan Factor", [], 6, 10, "-", "-", "-", "-", "-", ["Ayudan en alguna una de patada inicial y en la tirada de ingresos en liga"], [], [], true);
      if (equipo.apotecario) {
        crearTarjetaGenerica(section, "Apotecario", [], 1, 50, "-", "-", "-", "-", "-", ["Permite repetir una tirada de lesión"], [], [], true);
      }
      break;
  }
}

// función principal
async function mostrarEquipoSeleccionado() {
  let section = document.getElementById("informacionEquipo");
  section.innerHTML = "";

  mapaElemtosEquipo = new Map();
  dineroGastado = 0;
  jugadoresTotales = 0;

  divIndicadores = document.createElement("div");
  divIndicadores.id = "indicadores";

  let divIndicadorTesoreria = document.createElement("div");
  let divIndicadorJugadores = document.createElement("div");

  indicadorDinero = document.createElement("h3");
  indicadorJugadores = document.createElement("h3");
  switch (sessionStorage.getItem("idioma")) {
    case "en":
      indicadorDinero.textContent = `Spent treasury: ${dineroGastado}/1000k`;
      indicadorJugadores.textContent = `Players: ${jugadoresTotales}/16`;
      break;
    case "eu":
      indicadorDinero.textContent = `Gastatutako dirua: ${dineroGastado}/1000k`;
      indicadorJugadores.textContent = `Jokalariak: ${jugadoresTotales}/16`;
      break;
    case "es":
      indicadorDinero.textContent = `Tesorería gastada: ${dineroGastado}/1000k`;
      indicadorJugadores.textContent = `Jugadores: ${jugadoresTotales}/16`;
      break;
  }
  indicadorJugadores.style.color = "red";

  txtErrorTesoreria = document.createElement("span");
  txtErrorTesoreria.textContent = "❗";
  txtErrorTesoreria.className = "animacionError";
  txtErrorTesoreria.style.visibility = "hidden";

  txtErrorJugadores = document.createElement("span");
  txtErrorJugadores.textContent = "❗";
  txtErrorJugadores.className = "animacionError";

  divIndicadorTesoreria.appendChild(indicadorDinero);
  divIndicadorTesoreria.appendChild(txtErrorTesoreria);

  divIndicadorJugadores.appendChild(indicadorJugadores);
  divIndicadorJugadores.appendChild(txtErrorJugadores);

  divIndicadores.appendChild(divIndicadorTesoreria);
  divIndicadores.appendChild(divIndicadorJugadores);
  divIndicadores.className = "superior";
  section.appendChild(divIndicadores);

  await mostrarEquipo(section, select.value);
}

//funcion para cargar el select
async function cargarSelect() {
  select = document.getElementById("equipos");
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

// función para generar el PDF
function accionGenerarPDF(event) {
  event.preventDefault();
  let nombreEquipo = document.getElementById("txtNombreEquipo").value.trim();
  if (nombreEquipo != "") {
    if (dineroGastado <= 1000 && jugadoresTotales >= 11) {
      generarPDF(nombreEquipo, mapaElemtosEquipo, infoJugadores)
    } else {
      switch (sessionStorage.getItem("idioma")) {
        case "en":
          alert("You must have at least 11 players an a max of 1000k of spent trasury.");
          break;
        case "eu":
          alert("11 jokalari gutxienez izan behar dituzu eta gehienez 1000k gastatuta.");
          break;
        case "es":
          alert("Debes tener un mínimo de 11 jugadores y un máximo de 1000k gastados.");
          break;
      }
    }
  } else {
    switch (sessionStorage.getItem("idioma")) {
      case "en":
        alert("You must to write a name for your team.");
        break;
      case "eu":
        alert("Zure taldearen izena idatzi behar duzu.");
        break;
      case "es":
        alert("Debes insertar un nombre para tu equipo.");
        break;
    }
  }

}

// evento para botón
document.getElementById("btnValidar").addEventListener("click", accionGenerarPDF);
cargarPagina()