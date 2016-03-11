var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    PokemonConstants = require('../constants/PokemonConstants');


var PokemonStore = new Store(AppDispatcher);

var _pokemons = {};

PokemonStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case PokemonConstants.POKEMONS_RECEIVED:
      resetPokemons(payload.pokemons);
      PokemonStore.__emitChange();
      break;
    case PokemonConstants.FIND_POKEMON:
      returnPokemon(payload.pokemon);
      PokemonStore.__emitChange();
      break;
  }
};

PokemonStore.all = function(){
  var results = [];
  Object.keys(_pokemons).forEach(function(pokemonID){
    results.push(_pokemons[pokemonID]);
  });
  return results;
};

PokemonStore.find = function(id) {
  return _pokemons[id];
};

PokemonStore.findToy = function(pokeID, toyID){
  var poke = _pokemons[pokeID];
  var foundToy;
  if (poke && poke.toys){
    poke.toys.forEach(function(toy){
      if (toy.id === toyID){
        foundToy = toy;
        return;
      }
    });
  }
  return foundToy;
};

function resetPokemons(pokemons){
  _pokemons = {};
  pokemons.forEach(function(pokemon){
    _pokemons[pokemon.id] = pokemon;
  });
}

function returnPokemon(pokemon){
  _pokemons[pokemon.id] = pokemon;
}

// window.PokemonStore = PokemonStore;
module.exports = PokemonStore;
