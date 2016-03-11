var React = require('react');
var PokemonStore = require('../../stores/PokemonStore');
var PokemonWebApiUtil = require('../../util/apiUtil');
var ToysIndex = require('../toy/ToysIndex');


var PokemonDetail = React.createClass({

  getInitialState: function() {
    return {pokemon: this.getStateFromStore()};
  },

  getStateFromStore: function() {
    var id = parseInt(this.props.params.pokemonId);
    return PokemonStore.find(id);
  },

  componentWillReceiveProps: function(newProps) {
    var id = parseInt(newProps.params.pokemonId);
    PokemonWebApiUtil.fetchPokemon(id);
  },

  componentDidMount: function(){
    this.pokeToke = PokemonStore.addListener(this._showDetail);
    var id = parseInt(this.props.params.pokemonId);
    PokemonWebApiUtil.fetchPokemon(id);
  },

  _showDetail: function(){
    this.setState({pokemon: this.getStateFromStore()});
  },

  componentWillUnmount: function(){
    this.pokeToke.remove();
  },

  render: function() {

    if (this.state.pokemon) {
      var moves = (
        this.state.pokemon.moves.map(function(move, index){
          return (<li key={index}>{move}</li>);
        })
      );


      var pokeDetail = (

        <div className='pokemon-detail-pane'>
          <div className='detail'>
            <p>
              {this.state.pokemon.name}</p>
            <p>
              Attack: {this.state.pokemon.attack}
            </p>
            <p>
              Defense: {this.state.pokemon.defense}
            </p>
            <p>
              Type: {this.state.pokemon.poke_type}
            </p>
            <ul>
              Moves: {moves}
            </ul>
            <span><img src={this.state.pokemon.image_url}/></span>
          </div>
          <ToysIndex toys={this.state.pokemon.toys}/>
        </div>
      );

    } else {
      pokeDetail = <div></div>;
    }

    return (
      <div>
        {pokeDetail}
        {this.props.children}
      </div>
    );
  }

});

module.exports = PokemonDetail;
