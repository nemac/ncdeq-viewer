var React = require('react');
var MapRowComponent = require('../components/MapRowComponent');

var PropTypes = React.PropTypes;

var MapRowContainer = React.createClass({
  propTypes: {
    mapHeight: PropTypes.number,
    rowPadding: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      mapHeight: 300,
      rowPadding: 1
    };
  },
  getInitialState: function () {
    return {
      rowPadding: this.props.rowPadding
    }
  },
  render: function() {
    return (
      <MapRowComponent handleMapClick={this.props.handleMapClick} rowPadding={this.state.rowPadding} mapHeight={this.props.mapHeight} />
    );
  }

});

module.exports = MapRowContainer;
