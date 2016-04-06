var React = require('react');
var PropTypes = React.PropTypes;

var HeaderTitle = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  getInitialState: function() {
    this.titleText = this.props.text;
    return {
      title: this.titleText
    };
  },
  render: function() {
    return (
      <h2 className="ui header">{this.state.title}</h2>
    );
  }

});

module.exports = HeaderTitle;
