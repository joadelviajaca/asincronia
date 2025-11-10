
const URLBase = 'http://localhost:3000/pokemon';

const list = document.getElementById('list');
const message = document.getElementsByClassName('message')[0];
const pokemonForm = document.getElementById("pokemonForm");


// const getPokemons = () => {
//     let pokemons;
//     const request = new XMLHttpRequest();
//     request.open('GET', URLBase);
//     request.send();
//     request.addEventListener('load', function () {
//         if (request.status === 200) {
//             pokemons = JSON.parse(request.responseText);  // Convertirmos los datos JSON a un objeto
//             listPokemons(pokemons)
//         } else {
//             console.log("Error " + request.status + " (" + request.statusText + ") en la petición");
//         }
//     })

// }
// const getPokemons = () => {
//     fetch(URLBase)
//     .then( response => {
//         if (response.ok) {
//             return response.json()
//         }
//         Promise.reject(response)
//     })
//     .then( pokemons => listPokemons(pokemons))
//     .catch( error => console.log(error))
// }

const getPokemons = async () => {
    try {
        const response = await fetch(URLBase);
        const pokemons = await response.json();
        return pokemons;    
    } catch (error) {
        console.log(error)
    }
}

const listPokemons = async () => {
    const pokemons = await getPokemons()
    list.innerHTML = "";
    if (pokemons.length) {
        message.classList.add('hidden')
        pokemons.forEach(({nombre, nivel, tipo, region}) => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${nombre} \t\t Nivel: ${nivel} Tipos: ${tipo.join(',')} Nivel: ${nivel} Región: ${region}`;
            list.appendChild(li);
        });

    }
    else {
        message.classList.add('hidden');
    }
}

// pokemonForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     // Obtenemos los elementos básicos del formulario
//     const nombre = document.getElementById("nombre").value.trim();
//     const nivel = parseInt(document.getElementById("nivel").value);
//     const region = document.getElementById("region").value;

//     // Obtener tipos seleccionados
//     const tiposSeleccionados = Array.from(
//         document.querySelectorAll('.tipos input[type="checkbox"]:checked')
//     ).map(cb => cb.value);

//     const newPokemon = { nombre, tipo: tiposSeleccionados, nivel, region };

//     const requestAdd = new XMLHttpRequest();
//     requestAdd.open('POST', URLBase);
//     requestAdd.setRequestHeader('Content-type', 'application/json');
//     requestAdd.send(JSON.stringify(newPokemon));
//     requestAdd.addEventListener('load', ()=> {
//         if (requestAdd.status === 201) {
//             const pokemon = JSON.parse(requestAdd.responseText)
//             console.log(pokemon)
//             alert(`Se ha añadido con éxito el pokemon con id: ${pokemon.id}`)
//             getPokemons();
//         }
//     })

// })

pokemonForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtenemos los elementos básicos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const nivel = parseInt(document.getElementById("nivel").value);
    const region = document.getElementById("region").value;

    // Obtener tipos seleccionados
    const tiposSeleccionados = Array.from(
        document.querySelectorAll('.tipos input[type="checkbox"]:checked')
    ).map(cb => cb.value);

    const newPokemon = { nombre, tipo: tiposSeleccionados, nivel, region };

    const response = await fetch(URLBase, {
        method: 'POST',
        body: JSON.stringify(newPokemon),
        headers: {
            'Content-type': 'application/json'
        }
    })

    const pokemon = await response.json();
    alert(`Se ha añadido con éxito el pokemon con id: ${pokemon.id}`);
    listPokemons();
    // fetch(URLBase, {
    //     method: 'POST',
    //     body: JSON.stringify(newPokemon),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    // .then( response => {
    //     if (response.ok) {
    //         return response.json()
    //     }
    //     return Promise.reject(response)
    // })
    // .then( pokemon => {
    //     alert(`Se ha añadido con éxito el pokemon con id: ${pokemon.id}`);
    //     getPokemons()
    // })

})

// getPokemons();
listPokemons()