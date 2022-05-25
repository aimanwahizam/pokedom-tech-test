/* -------------------------------------------------------------------------- */
/*                                Useful Arrays                               */
/* -------------------------------------------------------------------------- */

import pokemonArray from "./data/pokemon.js";

const pokemonImage = pokemonArray.map((pokemon) => pokemon.sprite);
const pokemonName = pokemonArray.map(
  (pokemon) => pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
);
const pokemonID = pokemonArray.map((pokemon) => pokemon.id);
const pokemonTypes = pokemonArray.map((pokemon) => pokemon.types);
const pokemonInfo = [];
const currentPokemons = [];

/* -------------------------------------------------------------------------- */
/*                                HTML Elements                               */
/* -------------------------------------------------------------------------- */

const body = document.querySelector("body");
const container = document.querySelector(".card-container");
const searchBar = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");
const filterNumberDropDown = document.querySelector("#number-of-results");
const filterTypeDropDown = document.querySelector("#type-filter");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const makePokemonInfo = (nameArray, IDArray, typesArray, infoArray) => {
  for (let index = 0; index < nameArray.length; index++) {
    if (typesArray[index].length === 2) {
      infoArray.push(
        `${nameArray[index]} (#${IDArray[index]}) is a ${typesArray[index][0]} & ${typesArray[index][1]} type pokemon.`
      );
    } else {
      infoArray.push(
        `${nameArray[index]} (#${IDArray[index]}) is a ${typesArray[index][0]} type pokemon.`
      );
    }
  }
  return infoArray;
};

const addPokemonCards = (imageArr, nameArr, infoArr, IDArr) => {
  const imageArray = [...imageArr];
  const nameArray = [...nameArr];
  const infoArray = [...infoArr];
  const IDArray = [...IDArr];

  for (let index = 0; index < imageArray.length; index++) {
    container.innerHTML += `<div class="card" id="${IDArray[index]}">
        <img src="${imageArray[index]}" alt="${nameArray[index]}" class="card__image" />
        <div class="card__content">
          <div class="card__heading">${nameArray[index]}</div>
          <div class="card__text">${infoArray[index]}</div>
        </div>
      </div> `;
  }
};

const filterPokemonBySearch = () => {
  const userSearch = searchBar.value;
  const pokemons = [...pokemonArray];

  pokemons.forEach((pokemon) => {
    if (userSearch != "") {
      if (!pokemon.name.includes(userSearch)) {
        document.getElementById(`${pokemon.id}`).style.display = "none";
      }
    } else {
      document.getElementById(`${pokemon.id}`).style.display = "flex";
    }
  });
};

const storeCurrentPokemon = (currentArray) => {
  const pokemons = [...pokemonArray];

  pokemons.forEach((pokemon) => {
    if (document.getElementById(`${pokemon.id}`).style.display != "none") {
      currentArray.push(pokemon);
    }
  });
};

const limitNumberOfResults = () => {
  const filterNumber = filterNumberDropDown.value;

  if (filterNumber === "all") {
    currentPokemons.forEach((currentPokemon) => {
      document.getElementById(`${currentPokemon.id}`).style.display = "flex";
    });
  } else {
    const notHidePokemons = currentPokemons.slice(0, filterNumber);
    const hidePokemons = currentPokemons.slice(filterNumber);
    notHidePokemons.forEach((currentPokemon) => {
      document.getElementById(`${currentPokemon.id}`).style.display = "flex";
    });
    hidePokemons.forEach((hiddenPokemon) => {
      document.getElementById(`${hiddenPokemon.id}`).style.display = "none";
    });
  }
};

const filterByType = () => {
  const filterType = filterTypeDropDown.value;
  const searchResult = [...currentPokemons];

  if (filterType === "all") {
    searchResult.forEach((currentPokemon) => {
      document.getElementById(`${currentPokemon.id}`).style.display = "flex";
    });
  } else {
    searchResult.forEach((currentPokemon) => {
      if (currentPokemon.types.includes(filterType)) {
        document.getElementById(`${currentPokemon.id}`).style.display = "flex";
      } else {
        document.getElementById(`${currentPokemon.id}`).style.display = "none";
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

body.addEventListener(
  "load",
  makePokemonInfo(pokemonName, pokemonID, pokemonTypes, pokemonInfo)
);

body.addEventListener(
  "load",
  addPokemonCards(pokemonImage, pokemonName, pokemonInfo, pokemonID)
);

searchBar.addEventListener("input", filterPokemonBySearch);

searchButton.addEventListener(
  "click",
  storeCurrentPokemon(currentPokemons)
);

filterTypeDropDown.addEventListener("click", filterByType);

filterNumberDropDown.addEventListener("click", limitNumberOfResults);
