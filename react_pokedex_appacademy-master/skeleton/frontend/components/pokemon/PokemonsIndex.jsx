var React = require('react');
var PokemonStore = require('../../stores/PokemonStore');
var PokemonWebApiUtil = require('../../util/apiUtil');
var PokemonIndexItem = require('./PokemonIndexItem');

var PokemonsIndex = React.createClass({
  getInitialState: function() {
    return {pokemons: PokemonStore.all()};
  },
  _pokemonsChanged: function() {
    this.setState({pokemons: PokemonStore.all()});
  },
  componentDidMount: function() {
    this.pokeToke = PokemonStore.addListener(this._pokemonsChanged);
    PokemonWebApiUtil.fetchAllPokemons();
  },
  componentWillUnmount: function() {
    this.pokeToke.remove();
  },
  render: function() {
    var pokeArray = this.state.pokemons.map(function(pokemon, index) {
      return (<PokemonIndexItem key={index} pokemon={pokemon}/>);
    });
    return (
      <ul>
        {pokeArray}
      </ul>
    );
  }
});

module.exports = PokemonsIndex;
