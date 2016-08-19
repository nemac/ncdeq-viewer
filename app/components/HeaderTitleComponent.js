var React = require('react');
var PropTypes = React.PropTypes;

var HeaderTitleComponent= React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  getInitialState: function() {
    return {
      title: this.props.title
    };
  },
  render: function() {
    return (
      <h2 className="ui header" style={{color: "#fff"}}>{this.state.title}</h2>
    );
  }

});

module.exports = HeaderTitleComponent;
