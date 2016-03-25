var React = require('react');
var PropTypes = React.PropTypes;

var MapLayerToggleName = React.createClass({
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
      <h4 className="ui header">{this.state.title}</h4>
    );
  }

});

module.exports = MapLayerToggleName;
