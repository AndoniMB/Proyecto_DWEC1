//funcion que realiza una peticion get de los equipos y devuelve un array de objetos con campos
//(id (string),nombre (string), normasEspeciales (string[]), reroll (int), apotecario (boolean))
export async function getEquipos() {
    try{
        const response = await fetch("http://localhost:3000/equipos");
        if(!response.ok) throw new Error ("GET erróneo");
        const equipos = await response.json();
        return equipos
    }catch(error){
        console.log(error);
    }
}

//funcion que realiza una peticion get de los jugadores y devuelve un array de objetos con campos
//(id (string),posicion (string),tags (string[]),cantidad (int),coste (int),MA (int),FU (int),AG (int),
//PA (int),AR (int),Habilidades (string[]),Pri (string[]),Sec (string[]),Equipos (string[]))
export async function getJugadores() {
    try{
        const response = await fetch("http://localhost:3000/jugadores");
        if(!response.ok) throw new Error ("GET erróneo");
        const jugadores = await response.json();
        return jugadores
    }catch(error){
        console.log(error);
    }
}
// funcion que recibe un jugador y lo inserta en la db. Recibe un objeto jugador, que tiene el siguiente aspecto:
// (id (string),posicion (string),tags (string[]),cantidad (int),coste (int),MA (int),FU (int),AG (int),
// PA (int),AR (int),Habilidades (string[]),Pri (string[]),Sec (string[]),Equipos (string[]))
export async function postJugador(jugador) {
    try {
        const response = await fetch("http://localhost:3000/jugadores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jugador)
        });
        if (!response.ok) {
            throw new Error("Error al guardar el jugador");
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

// funcion que recibe un jugador y lo actualiza en la db. 
// Recibe un identificador para saber cual es el jugador a actualizar
// y también recibe un objeto jugador, que tiene el siguiente aspecto:
// posicion (string),tags (string[]),cantidad (int),coste (int),MA (int),FU (int),AG (int),
// PA (int),AR (int),Habilidades (string[]),Pri (string[]),Sec (string[]),Equipos (string[]))
export async function putJugador(id_jugador, jugador) {
    try {
        const response = await fetch("http://localhost:3000/jugadores/" + id_jugador, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jugador)
        });
        if (!response.ok) {
            throw new Error("Error al guardar el jugador");
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
//patch de los jugadores
export async function patchJugadore() {
    
}

//delete de los jugadores
export async function deleteJugadore() {
    
}