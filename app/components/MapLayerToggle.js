var React = require('react');
var PropTypes = React.PropTypes;

var MapLayerToggle = React.createClass({

  propTypes: {
    toggleText: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      toggleText:'Layer Toggle'
    };
  },
  getInitialState: function() {
    this.toggleText = this.props.toggleText;
    return {
      toggleText: this.toggleText
    };
  },
  render: function() {
    return (
      <div className="ui checkbox">
        <input type="checkbox" name="example" />
        <label>{this.state.toggleText}</label>
      </div>
    );
  }

});

module.exports = MapLayerToggle;
