var React = require('react');
var History = require('react-router').History;

var ToyIndexItem = React.createClass({

  mixins: [History],

  handleClick: function() {
    this.history.push("/pokemon/" + this.props.toy.pokemon_id +
      "/toys/"+ this.props.toy.id);
  },

  render: function() {
    return (
      <li className="toy-list-item" onClick={this.handleClick}>
        <p>{this.props.toy.name}</p>
      </li>
    );
  }

});

module.exports = ToyIndexItem;
