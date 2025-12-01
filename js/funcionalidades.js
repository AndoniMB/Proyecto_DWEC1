// import jsPDF
const { jsPDF } = window.jspdf;

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
  doc.text(`Equipo: ${nombreEquipo}`, 14, 15);
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
      'Dorsal',
      'Posición',
      'Tags',
      'Nombre',
      'Precio',
      'MV',
      'FU',
      'AG',
      'PA',
      'AR',
      'Habilidades',
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
      'Cantidad',
      'Límite',
      'Precio',
      'Descripción'
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
  const MOTES = ["\"La Prole\"",
    "\"El Destructor\"",
    "\"Manos Rápidas\"",
    "\"El Imparable\"",
    "\"Garras de Hierro\"",
    "\"Rugido Mortal\"",
    "\"Puño de Piedra\"",
    "\"Sombra Nocturna\"",
    "\"Colmillo Sangriento\"",
    "\"El Invencible\"",
    "\"Ojo de Águila\"",
    "\"Martillo de Guerra\"",
    "\"Lanza Rápida\"",
    "\"Cazador Nocturno\"",
    "\"Tormenta de Acero\"",
    "\"Ojo de Halcón\"",
    "\"Bestia Furiosa\"",
    "\"Garra Letal\"",
    "\"El Arrasador\"",
    "\"Sangre Fría\"",
    "\"Puño de Hierro\"",
    "\"El Implacable\"",
    "\"Destructor de Sueños\"",
    "\"Halcón Oscuro\"",
    "\"Rayo Mortal\"",
    "\"Escudo de Piedra\"",
    "\"Corte Rápido\"",
    "\"Sombra Mortal\"",
    "\"Furia de Dragón\"",
    "\"Destructor Silencioso\"",
    "\"Mano Fantasma\"",
    "\"Coloso Rugiente\"",
    "\"Puño de Trueno\"",
    "\"Lobo Solitario\"",
    "\"El Voraz\"",
    "\"Martillo Mortal\"",
    "\"Diente de Sable\"",
    "\"Rayo de Furia\"",
    "\"Ojo de Tigre\"",
    "\"El Violento\"",
    "\"Garras de Sombra\"",
    "\"El Atronador\"",
    "\"Rugido de Acero\"",
    "\"Sable Veloz\"",
    "\"Filo de la Noche\"",
    "\"Destructor de Hombres\"",
    "\"Puño de Acero\"",
    "\"Furia Imparable\"",
    "\"El Aniquilador\"",
    "\"Sombra Letal\"",
    "\"Ojo de Halcón\""
  ];
  return NOMBRES[Math.floor(Math.random() * NOMBRES.length)] + " " + MOTES[Math.floor(Math.random() * MOTES.length)]
}