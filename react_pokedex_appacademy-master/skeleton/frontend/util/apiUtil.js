var PokemonActions = require('../actions/PokemonActions');

var PokemonWebApiUtil = {
  fetchAllPokemons: function(){
    $.ajax({
      url: "/api/pokemon",
      dataType: "json",
      success: function(pokemons){
        PokemonActions.receivePokemons(pokemons);
      }
    });
  },

  fetchPokemon: function(id){
    $.ajax({
      url: "/api/pokemon/" + id,
      dataType: "json",
      success: function(pokemon){
        PokemonActions.receivePokemon(pokemon);
      }
    });
  }
};

// window.PokemonWebApiUtil = PokemonWebApiUtil;
module.exports = PokemonWebApiUtil;
