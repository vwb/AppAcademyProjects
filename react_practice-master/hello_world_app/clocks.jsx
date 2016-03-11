var React = require('react');

var Clocks = React.createClass({
  getInitialState: function(){
    return {currentTime: new Date()};
  },

  updateClock: function(){
    this.state.currentTime.setSeconds( this.state.currentTime.getSeconds() + 1 );
    this.setState({currentTime : this.state.currentTime});
  },

  componentDidMount: function(){
    this.handle = setInterval(this.updateClock, 1000);
  },

  componentWillUnmount: function(){
    clearInterval(this.handle);
  },

  render: function(){
    return(
      <section>
       {this.state.currentTime.toString()};
     </section>
   );
  }
});


module.exports = Clocks;
