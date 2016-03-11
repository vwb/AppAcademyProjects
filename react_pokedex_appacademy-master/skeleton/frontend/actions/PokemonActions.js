var AppDispatcher = require('../dispatcher/dispatcher'),
    PokemonConstants = require('../constants/PokemonConstants');

var PokemonActions = {
  receivePokemons: function(pokemons){
    AppDispatcher.dispatch({
      actionType: PokemonConstants.POKEMONS_RECEIVED,
      pokemons: pokemons
    });
  },
  receivePokemon: function(pokemon){
    AppDispatcher.dispatch({
      actionType: PokemonConstants.FIND_POKEMON,
      pokemon: pokemon
    });
  }
};

module.exports = PokemonActions;
