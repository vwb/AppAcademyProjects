var React = require('react'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var AutoComplete = React.createClass({

  getInitialState: function(){
    return {
      value: "",
      completed: false
    };
  },

  handleInput: function(e){
    this.setState({completed: false});
    this.setState({value: e.target.value});
  },

  generateNames: function(){
    //TODO Why are there so many spans in the <li>s

    return (this.props.names.map(function(el, ind){
      var len = this.state.value.length;

      if ( el.slice(0, len) === this.state.value &&
            len !== 0 &&
            !this.state.completed) {

        return (<li key={ind} onClick={this.completeQuery}> {el} </li>);

      }
    }.bind(this))
  );},

  completeQuery: function(e){
    this.setState({completed: true});
    this.setState({value: e.target.innerHTML});
  },

  render: function(){
    return(
      <section>
        <input type="text"
               value={this.state.value}
               onChange={this.handleInput}  />
        <ul>
          <ReactCSSTransitionGroup
              transitionName="auto"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>

            {this.generateNames()}

          </ReactCSSTransitionGroup>
        </ul>
      </section>
    );
  }
});



module.exports = AutoComplete;
