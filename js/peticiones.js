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

// funcion que recibe un jugador y un id para actualizar todo el objeto en la db. 
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

// funcion que recibe un jugador con los campos que se quieran actualizar en la db. 
// Recibe un identificador para saber cual es el jugador a actualizar
// y también recibe un objeto jugador, que tiene el siguiente aspecto (según los campos a actualizar):
// posicion (string),tags (string[]),cantidad (int),coste (int),MA (int),FU (int),AG (int),
// PA (int),AR (int),Habilidades (string[]),Pri (string[]),Sec (string[]),Equipos (string[]))
export async function patchJugador(id_jugador, jugador) {
    try {
        const response = await fetch("http://localhost:3000/jugadores/" + id_jugador, {
            method: "PATCH",
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

// funcion que recibe un identificador y elimina al jugador de la bd. 
// Recibe un identificador para saber cual es el jugador a eliminar.
export async function deleteJugador(id_jugador) {
    try {
        const response = await fetch("http://localhost:3000/jugadores/" + id_jugador, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Error al guardar el jugador");
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

//funcion que realiza una peticion get de los jugadores de un equipo y devuelve un array de objetos con campos
//(id (string),posicion (string),tags (string[]),cantidad (int),coste (int),MA (int),FU (int),AG (int),
//PA (int),AR (int),Habilidades (string[]),Pri (string[]),Sec (string[]),Equipos (string[]))
export async function getJugadoresEquipo(idEquipo) {
    try{
        const response = await fetch("http://localhost:3000/jugadores");
        if(!response.ok) throw new Error ("GET erróneo");
        const jugadores = await response.json();
        let arrDevolver=[];
        jugadores.forEach(jugador => {
            if(jugador.Equipos.includes(idEquipo+"")){
                arrDevolver.push(jugador);
            }
        });
        return arrDevolver;
    }catch(error){
        console.log(error);
    }

//funcion que realiza una peticion get de un jugador y devuelve un objeto jugador con los campos
//(id (string),posicion (string),tags (string[]),cantidad (int),coste (int),MA (int),FU (int),AG (int),
//PA (int),AR (int),Habilidades (string[]),Pri (string[]),Sec (string[]),Equipos (string[]))
export async function getJugador(id) {
    try{
        const response = await fetch("http://localhost:3000/jugadores/"+id);
        if(!response.ok) throw new Error ("GET erróneo");
        const jugador = await response.json();
        return jugador
    }catch(error){
        console.log(error);
    }
}