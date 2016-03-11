var React = require('react');
var PokemonsIndex = require('./pokemon/PokemonsIndex');

var App = React.createClass({

  render: function() {
    return (
      <div id='pokedex'>
        <div className='pokemon-index-pane'>
          <PokemonsIndex />
        </div>
        {this.props.children}
      </div>
    );
  }

});

module.exports = App;
