function buscarPokemon() {
    const inputNumero = document.getElementById('pokemonNumber').value;

    if (isNaN(inputNumero) || inputNumero === '') {
        mostrarError("Por favor ingresa un numero.");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${inputNumero}`)
        .then(response => response.json())
        .then(data => {
            if (data.name) {
                const pokemonCard = document.getElementById('pokemonCard');
                pokemonCard.innerHTML = ` 
                    <h2>${data.name}</h2>
                    <p>Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
                    <p>Altura: ${(data.height / 10).toFixed(1)} metros</p>
                    <p>Peso: ${(data.weight / 10).toFixed(1)} kilogramos</p>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                `;
            } else {
                mostrarError("No se encontró ningún Pokémon con ese número.");
            }
        })
        .catch(error => console.error('Error:', error));
}

function mostrarError(mensaje) {
    const pokemonCard = document.getElementById('pokemonCard');
    pokemonCard.innerHTML = `<p style="color: red; font-weight: bold; tex-shadow: white 1px 0 5px">${mensaje}</p>`;
}
