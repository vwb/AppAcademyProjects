var React = require('react');

var Weathers = React.createClass({

  getInitialState: function(){
    return {
      weatherData: "",
      currentLocation: ""
    };
  },

  weatherQuery: function(){

    var options = {
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?lat="+
            this.state.currentLocation.latitude+"&lon="+
            this.state.currentLocation.longitude+
            "&appid=645c5d39c7603f17e23fcaffcea1a3c1",
      data: "json",
      success: function(data){
        this.setState({weatherData: JSON.parse(data).weather[0].description});
      }.bind(this)
    };

    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function(){
      if (httpRequest.readyState === XMLHttpRequest.DONE ) {
        if (httpRequest.status === 200 ) {
          options.success(httpRequest.response);
        }
      }
    };

    httpRequest.open(options.type, options.url, true);
    httpRequest.send();
  },


  componentDidMount: function() {

    var geo = navigator.geolocation;

    var success = function(pos){
      console.log(pos);
      this.setState({currentLocation: pos.coords});
      this.weatherQuery();
    }.bind(this);

    var error = function(err){
      console.log(err.code + ": " + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);

  },

  buildDataElement: function(){
    var weatherData = this.state.weatherData;

    return(
      <section>
        <p> {this.state.weatherData} </p>
      </section>
    );
  },

  render: function(){
    return (
      <div> { this.buildDataElement() } </div>
    );
  }

});


module.exports = Weathers;
