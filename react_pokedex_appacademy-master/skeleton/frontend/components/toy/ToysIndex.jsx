var React = require('react');
var ToyIndexItem = require('./ToyIndexItem');

var ToyIndex = React.createClass({

  buildToyIndexItems: function(){
    return this.props.toys.map(function(toy, index){
      return (<ToyIndexItem key={index} toy={toy} />);
    });
  },



  render: function() {
    var toys = this.props.toys ? this.buildToyIndexItems() : (<li>Finding toys...</li>);
    return (
      <ul>{toys}</ul>
    );
  }

});

module.exports = ToyIndex;
