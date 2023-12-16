/**
 * 
 * 
 * 
**/
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const pokemonNumber = params.get('pokemonNumber');

const typeColor = {
    
    bug: "#a8b720",
    dark: "#725847",
    dragon: "#6f38f6",
    electric: "#f7cf2e",
    fairy: "#ff0069",
    fighting: "#bf3029",
    fire: "#ee7f30",
    flying: "#a98ff0",
    grass: "#77c850",
    ground: "#dfbf69",
    ghost: "#6e5896",
    ice: "#98d5d7",
    normal: "#a6a877",
    poison: "#a040a0",
    psychic: "#f65687",
    rock: "#b8a137",
    steel: "#b9b7cf",
    water: "#678fee",
}

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const idPokemon = pokemonNumber;

let getPokeData = () => {
  const finalUrl = url + idPokemon;
  console.log(finalUrl);
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generatedCard(data);
    });
};

let generatedCard = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  const themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
    <p class="hp">
        <span>HP</span>
        ${hp}
    </p>
    <img src=${imgSrc} />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types">
       
    </div>
    <div class="stats">
        <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
        </div>
        <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
        </div>
    </div>    
    `;
    appendTypes(data.types);
    styleCard(themeColor);
};

let appendTypes = (types) => {
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
    });
};
let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 40%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach(
        (typeColor) => { 
            typeColor.style.backgroundColor = color;
        });
};

getPokeData;
window.addEventListener("load", getPokeData);
