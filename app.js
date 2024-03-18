function editSelectedPokemon() {
    if (selectedPokemon) {
        const editedName = document.getElementById('editedPokemonName').value;
        const editedImageUrl = document.getElementById('editedPokemonImage').value;

        if (!editedName || !editedImageUrl) {
            alert("Veuillez saisir un nom et une URL d'image pour le Pokémon.");
            return;
        }

        const pokemonInfo = selectedPokemon.querySelector('.pokemon-info');
        pokemonInfo.querySelector('.name').textContent = editedName;
        const pokemonImage = selectedPokemon.querySelector('img');
        pokemonImage.src = editedImageUrl;

        document.getElementById('editedPokemonName').value = '';
        document.getElementById('editedPokemonImage').value = '';
        document.getElementById('editPokemonForm').style.display = 'none';
        selectedPokemon = null;
    }
}

function cancelEdit() {
    document.getElementById('editPokemonForm').style.display = 'none';
    selectedPokemon = null;
}

function showEditPokemonForm() {
    if (selectedPokemon) {
        const pokemonInfo = selectedPokemon.querySelector('.pokemon-info');
        const pokemonName = pokemonInfo.querySelector('.name').textContent;
        const pokemonImage = selectedPokemon.querySelector('img').src;

        document.getElementById('editedPokemonName').value = pokemonName;
        document.getElementById('editedPokemonImage').value = pokemonImage;
        document.getElementById('editPokemonForm').style.display = 'block';
    }
}

let selectedPokemon = null;

function selectPokemon(event) {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        if (selectedPokemon) {
            selectedPokemon.classList.remove('selected');
        }
        selectedPokemon = clickedPokemon;
        selectedPokemon.classList.add('selected');
    }
}

function deleteSelectedPokemon() {
    if (selectedPokemon) {
        selectedPokemon.remove();
        selectedPokemon = null;
    }
}

function showCreatePokemonForm() {
    document.getElementById('createPokemonForm').style.display = 'block';
}

function createPokemon() {
    const name = document.getElementById('pokemonName').value;
    const imageUrl = document.getElementById('pokemonImage').value;

    if (!name || !imageUrl) {
        alert("Veuillez saisir un nom et une URL d'image pour le Pokémon.");
        return;
    }

    const newPokemon = {
        name: name,
        imageUrl: imageUrl
    };

    addPokemonToList(newPokemon);

    document.getElementById('pokemonName').value = '';
    document.getElementById('pokemonImage').value = '';
    document.getElementById('createPokemonForm').style.display = 'none';
}

function addPokemonToList(pokemon) {
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    pokemonDiv.innerHTML = `
        <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
        <div class="pokemon-info">
            <span class="number"># Nouveau</span>
            <span class="name">${pokemon.name}</span>
        </div>
    `;
    pokemonList.appendChild(pokemonDiv);
}

let pokemonList = document.getElementById("pokemon-list");

const fetchAllPokemons = async () => {
    let response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
    let data = await response.json();

    data.forEach(async (pokemon) => {
        if (pokemon.pokedexId !== 0) {
            let pokemonDiv = document.createElement("div");
            pokemonDiv.classList.add("pokemon");

            let pokemonName = pokemon.name.fr;
            let pokemonId = pokemon.pokedexId;

            let pokemonImageURL = pokemon.sprites.regular;

            pokemonDiv.innerHTML = `
                <img src="${pokemonImageURL}" alt="${pokemonName}">
                <div class="pokemon-info">
                    <span class="number">#${pokemonId}</span> 
                    <span class="name">${pokemonName}</span>
                </div>
            `;

            pokemonList.appendChild(pokemonDiv);
        }
    });
};