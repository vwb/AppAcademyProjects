var React = require('react');



var Tabs = React.createClass({
  getInitialState: function () {
    return { focused: 0 };
  },

  clicked: function (index) {
    this.setState({focused: index});
  },

  generateHeaders: function(){
    return(
      this.props.objects.map(function(el, ind){
        var classname="";

        if (ind === this.state.focused){
          classname="bold-title";
        }

        return (<li className={classname} onClick={this.clicked.bind(this, ind)}>{el.title}</li>);
      }.bind(this))
    );
  },

  chosenContent: function(){
    return this.props.objects[this.state.focused].content;
  },



  render: function() {
    return(
      <div>
        <ul>
          {
            this.generateHeaders()
          }
        </ul>
        <article>
          {
            this.chosenContent()
          }
        </article>
      </div>
    );
  }
});

module.exports = Tabs;
