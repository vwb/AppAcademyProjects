var React = require('react'),
    ReactDOM = require('react-dom'),
    Tabs = require('./tabs'),
    WeatherClocks = require('./weather_clocks'),
    AutoComplete = require('./autocomplete.jsx');

var Widgets = React.createClass({
  getInitialState: function () {
    return { objects: [{title: "One", content: "test"},
                       {title: "Two", content: "more testing"}],
             names: ["Bob", "Steven", "Robert", "Francis", "Ned",
                    "Nerd","Theon", "Joffrey", "Arya", "Stoneheart"]};
  },

  render: function() {
    return(
      <div>
        <AutoComplete names={this.state.names}/>
        <section>New Hello World</section>
        <Tabs objects={this.state.objects}/>
        <WeatherClocks/>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Widgets />, document.getElementById('main'));
});


//TODO why do we need the lightweight http-server?
