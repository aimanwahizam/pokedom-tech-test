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

const storeCurrentPokemon = (currentArray, pokemonArray) => {
  pokemonArray.forEach((pokemon) => {
    if (document.getElementById(`${pokemon.id}`).style.display != "none") {
      currentArray.push(pokemon);
    }
  });
};

const limitNumberOfResults = () => {
  const pokemons = [...pokemonArray];
  const filterNumber = filterNumberDropDown.value;

  if (filterNumber === "all") {
    currentPokemons.forEach((currentPokemon) => {
      document.getElementById(`${currentPokemon.id}`).style.display = "flex";
    });
  } else {
    const hidePokemons = currentPokemons.slice(filterNumber);
    hidePokemons.forEach((hiddenpokemon) => {
      document.getElementById(`${hiddenpokemon.id}`).style.display = "none";
    });
    console.log(hidePokemons.length);
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

// body.addEventListener("load", storeCurrentPokemon)

searchButton.addEventListener("click", filterPokemonBySearch);

searchButton.addEventListener(
  "click",
  storeCurrentPokemon(currentPokemons, pokemonArray)
);

filterNumberDropDown.addEventListener("click", limitNumberOfResults);
