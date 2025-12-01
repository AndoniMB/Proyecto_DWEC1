// import jsPDF
const { jsPDF } = window.jspdf;

//meter el idioma en la sesion, esto deberia hacerse en otro archivo
sessionStorage.setItem("idioma","es");

//declarar let infoJugadores = {}; Tener en cuenta que aqui va la informacion de los jugadores y los extras
//al crear las tarjetas/crear la tabla hacer (ejemplo de uso, los valores del objeto, son lo que hay que reemplazar):   
// infoJugadores["linea"] = {
//     posicion:"linea",
//     nombre:"LINEA",
//     tags:["Human","Linea"],
//     limite:16,
//     precio:50,
//     mv:6,
//     fu:3,
//     ag:3,
//     pa:3,
//     ar:9,
//     habilidades:[],
//     pri:["G"],
//     sec:["A","P"]
// };

// variable para almacenar los jugadores y extras seleccionados:
// let mapaElemtosEquipo = new Map(); (key: nombre del elemento, value: cantidad de dicho elemento)
// este mapa guarda informacion sobre todos los elemetnos aniadidos al crear el equipo 
// ejemplo: mapaElemtosEquipo.set("linea",4);

//funcion para generar un pdf del equipo
//nombreEquipo: Nombre del equipo
//mapaElementosEquipo:
//infoJugadores: mapa con informacion de los jugadores y extras
export function generarPDF(nombreEquipo, mapaElemtosEquipo, infoJugadores) {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(18);
  doc.text(`Team: ${nombreEquipo}`, 14, 15);
  // tabla de jugadores
  let dorsal = 1;
  const jugadores = [];
  for (let [nombre, cantidad] of mapaElemtosEquipo.entries()) {
    const j = infoJugadores[nombre];
    // Jugadores = elementos con estadísticas (es decir, mv != "-")
    if (cantidad > 0 && j && j.mv != "-") {
      for (let i = 0; i < cantidad; i++) {
        jugadores.push([
          dorsal,
          j.posicion,
          j.tags.join("\n"),
          generarNombre(),
          j.precio + "k",
          j.mv,
          j.fu,
          j.ag + "+",
          j.pa + "+",
          j.ar + "+",
          j.habilidades.join("\n"),
          j.pri,
          j.sec
        ]);
        dorsal++;
      }
    }
  }
  doc.autoTable({
    startY: 25,
    //cabeceras
    head: [[
      'Back Number',
      'Position',
      'Tags',
      'Name',
      'Price',
      'MV',
      'ST',
      'AG',
      'PA',
      'AR',
      'Skills',
      'Pri',
      'Sec'
    ]],
    //contenido
    body: jugadores,
    theme: 'grid',
    headStyles: { fillColor: [50, 50, 50], textColor: 255 },
    styles: { fontSize: 9, cellPadding: 2 },
    tableWidth: '100%',
    styles: { fontSize: 9, cellPadding: 2 }
  });
  // Tabla de extras
  const extras = [];
  for (let [nombre, cantidad] of mapaElemtosEquipo.entries()) {
    const j = infoJugadores[nombre];
    if (cantidad > 0 && j && j.mv == "-") {
      extras.push([
        j.nombre,
        cantidad,
        j.limite,
        j.precio,
        j.habilidades
      ]);
    }
  }
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [[
      'Extra',        
      'Quantity',     
      'Limit',        
      'Price',        
      'Description'   
    ]],
    body: extras,
    theme: 'grid',
    headStyles: { fillColor: [30, 30, 30], textColor: 255 },
    styles: { fontSize: 9, cellPadding: 2 },
    tableWidth: '100%'
  });
  // guardar el pdf
  doc.save(`${nombreEquipo}.pdf`);
}

//funcion que devuelve un nombre (nombre y mote) aleatorio sacado de 2 arrays constantes (NOMBRES y MOTES)
function generarNombre() {
  const NOMBRES = ["Thorgar",
    "Thorgar",
    "Morgul",
    "Balin",
    "Gorim",
    "Skarn",
    "Fendrel",
    "Ulric",
    "Drakar",
    "Hroth",
    "Varg",
    "Ragnar",
    "Kroth",
    "Dagnar",
    "Thrain",
    "Orgrim",
    "Brugor",
    "Falkor",
    "Gundar",
    "Haldor",
    "Irik",
    "Jorvik",
    "Keldor",
    "Lothar",
    "Morgrim",
    "Nargul",
    "Oskar",
    "Pelor",
    "Quarn",
    "Rethor",
    "Skarok",
    "Thalgrim",
    "Urden",
    "Vorgath",
    "Wulfric",
    "Xandor",
    "Yrgoth",
    "Zarvik",
    "Brogor",
    "Durnan",
    "Eldric",
    "Fargus",
    "Gorath",
    "Hrogar",
    "Ithran",
    "Jarkor",
    "Korrin",
    "Lurgan",
    "Mordek",
    "Norrik",
    "Othran"
  ];
  const MOTES = [
    "\"The Prole\"",
    "\"The Destroyer\"",
    "\"Quick Hands\"",
    "\"The Unstoppable\"",
    "\"Iron Claws\"",
    "\"Deadly Roar\"",
    "\"Fist of Stone\"",
    "\"Night Shadow\"",
    "\"Bloody Fang\"",
    "\"The Invincible\"",
    "\"Eagle Eye\"",
    "\"War Hammer\"",
    "\"Swift Spear\"",
    "\"Night Hunter\"",
    "\"Steel Storm\"",
    "\"Hawk Eye\"",
    "\"Furious Beast\"",
    "\"Lethal Claw\"",
    "\"The Ravager\"",
    "\"Cold Blood\"",
    "\"Iron Fist\"",
    "\"The Relentless\"",
    "\"Dreams Destroyer\"",
    "\"Dark Hawk\"",
    "\"Deadly Lightning\"",
    "\"Stone Shield\"",
    "\"Quick Slash\"",
    "\"Deadly Shadow\"",
    "\"Dragon's Fury\"",
    "\"Silent Destroyer\"",
    "\"Ghost Hand\"",
    "\"Roaring Colossus\"",
    "\"Thunder Fist\"",
    "\"Lone Wolf\"",
    "\"The Voracious\"",
    "\"Deadly Hammer\"",
    "\"Sabre Tooth\"",
    "\"Fury Lightning\"",
    "\"Tiger Eye\"",
    "\"The Violent\"",
    "\"Shadow Claws\"",
    "\"The Thunderer\"",
    "\"Steel Roar\"",
    "\"Swift Saber\"",
    "\"Blade of the Night\"",
    "\"Men Destroyer\"",
    "\"Fist of Steel\"",
    "\"Unstoppable Fury\"",
    "\"The Annihilator\"",
    "\"Lethal Shadow\"",
    "\"Hawk Eye\""
  ];
  return NOMBRES[Math.floor(Math.random() * NOMBRES.length)] + " " + MOTES[Math.floor(Math.random() * MOTES.length)]
}