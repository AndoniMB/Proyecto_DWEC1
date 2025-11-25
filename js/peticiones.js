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

//get de los jugadores
export async function getJugadores() {
    
}
//post de los jugadores
export async function postJugadore() {
    
}

//put de los jugadores
export async function putJugadore() {
    
}
//patch de los jugadores
export async function patchJugadore() {
    
}

//delete de los jugadores
export async function deleteJugadore() {
    
}