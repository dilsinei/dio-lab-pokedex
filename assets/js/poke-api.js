

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json()) //converter o detalhes para json
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //buscando a lista de pokemons
    .then((response) => response.json())    //converteu pra json
    .then((jsonBody) => jsonBody.results)   //pegou a lista no json
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //busca dos novas requisições de detalhes
    .then((detailRequests) => Promise.all(detailRequests)) //requisiçoes de detalhes
    .then((pokemonsDetails) => pokemonsDetails) //lista de detalhes dos pokemons
}

