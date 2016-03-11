var React = require('react'),
    Clocks = require('./clocks'),
    Weathers = require('./weather');

var WeatherClocks = React.createClass({
  render: function() {
    return(
      <div>
        <Clocks/>
        <Weathers/>
      </div>
    );
  }

});


module.exports = WeatherClocks;
