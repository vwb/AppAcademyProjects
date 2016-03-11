var React = require('react'),
    ReactDOM = require('react-dom'),
    Minesweeper = require('./minesweeper'),
    Game = require('./components/Game.jsx');

var MyComponent = React.createClass({
  render: function() {
    return <Game/>;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
