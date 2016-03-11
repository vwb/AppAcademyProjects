var React = require('react');
var PokemonStore = require('../../stores/PokemonStore');
var PokemonWebApiUtil = require('../../util/apiUtil');

var ToyDetail = React.createClass({

  getStateFromStore: function(pokeID, toyID){
    return PokemonStore.findToy(pokeID, toyID);
  },

  _onChange: function(){
    var toyID = parseInt(this.props.params.toyId);
    var pokeID = parseInt(this.props.params.pokemonId);
    this.setState({toy: this.getStateFromStore(pokeID, toyID)});
  },

  getInitialState: function(){
    var toyID = parseInt(this.props.params.toyId);
    var pokeID = parseInt(this.props.params.pokemonId);
    return {
      toy: this.getStateFromStore(pokeID, toyID)
    };
  },

  componentDidMount: function(){

    this.pokeToyToke = PokemonStore.addListener(this._onChange);
    var id = parseInt(this.props.params.pokemonId);
    PokemonWebApiUtil.fetchPokemon(id);

  },

  componentWillUnmount: function(){
    this.pokeToyToke.remove();
  },

  componentWillReceiveProps: function(newProps){
    var toyID = parseInt(newProps.params.toyId);
    var pokeID = parseInt(newProps.params.pokemonId);
    this.getStateFromStore(pokeID, toyID);
  },

  render: function() {

    var toyDetail;
    if (this.state.toy){
      toyDetail = (
        <div>
          <img src={this.state.toy.image_url}></img>
          <p>{this.state.toy.happiness}</p>
          <p>${this.state.toy.price}</p>
        </div>
      );
    }

    return (
      <div>
        {toyDetail}
      </div>
    );
  }

});

module.exports = ToyDetail;
