const baseURL = 'https://pokeapi.co/api/v2/pokemon/'; /* En este url se traerá informacion desde el API */
const pokemon = document.getElementById('pokemonName'); /**Se traerá el nombre del pokemon que se introduzca en el input */
const buttonSearch = document.getElementById('searchPokemon'); /*Buscar pokemon/ lupa*/
const deleteSearch = document.getElementById('deletePokemon'); /*Borrar pokemon/ el equis*/
const appNode = document.getElementById('app');/*Donde se van a insertar los pokemones en section */

buttonSearch.addEventListener('click', insertPokemon);/*Cuando se haga click en la imagen se llamará a una funcion */
buttonSearch.addEventListener('touchstart', insertPokemon);//*móviles
deleteSearch.addEventListener('click', deletePokemon);/*Cuando se haga click en la imagen se borrará,llama a una funcion */
deleteSearch.addEventListener('touchstart', deletePokemon);//*móviles

function insertPokemon() {
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`) //*Sirve para hacer peticiones al canal http y tambien el nombre del pokemon, se convertira el text en mayúsc.
        .then(response => {
            if (response.status === 404){
                alert('This pokemon is not available. Try with another one!')
            } else{
                return response.json() //*La respuesta que obtuviste transformala en un json
            }
        })
        .then(responseJSON => {
            const allItems = [];
            const result = [];

            for(let pokemonInfo in responseJSON){//* para cada pokemonInfo en rpta JSON
                result.push([pokemonInfo , responseJSON[pokemonInfo]]) //*inserta
            }
            console.table(result);

            //*Crear imagen
            const pokemonImage = document.createElement('img')
            pokemonImage.src = result[14][1].front_default

            //Nombre e ID
            const pokemonName = document.createElement('h2')
            pokemonName.innerText = `Name: ${result[10][1]} - ID: ${result[6][1]}`

            //Tipo de Pokemon
            const pokemonType = document.createElement('h2')
            pokemonType.innerText =`Type: ${result[16][1][0].type.name}`

            //Guardar toda esta info en un contenedor
            const container = document.createElement('div')
            container.append(pokemonImage , pokemonName , pokemonType)

            allItems.push(container)
            appNode.append(...allItems)

        })
}

function deletePokemon() {
    console.log('presionaste la equis');

}