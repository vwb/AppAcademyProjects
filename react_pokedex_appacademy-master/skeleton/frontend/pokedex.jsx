var React = require('react'),
    ReactDOM = require('react-dom'),
    PokemonsIndex = require('./components/pokemon/PokemonsIndex'),
    PokemonDetail = require('./components/pokemon/PokemonDetail'),
    ToyDetail = require('./components/toy/ToyDetail');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var App = require('./components/App');

// require('./util/apiUtil');
// require('./stores/PokemonStore');

var routes = (
  <Route component={App} path="/">
    <Route component={PokemonDetail} path='pokemon/:pokemonId'>
      <Route component={ToyDetail} path="toys/:toyId">
      </Route>
    </Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});
