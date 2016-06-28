var React = require('react');
import MapContainer from '../containers/MapContainer'

var PropTypes = React.PropTypes;

var MapWrapper = React.createClass({
  propTypes: {
  },
  render: function() {
    var pad = this.props.rowPadding ? 1 : this.props.rowPadding;
    return (
        <MapContainer />
    );
  }
});

module.exports = MapWrapper;
