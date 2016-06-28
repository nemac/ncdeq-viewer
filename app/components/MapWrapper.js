var React = require('react');
import MapContainer from '../containers/MapContainer'

var PropTypes = React.PropTypes;

var MapWrapper = React.createClass({
  propTypes: {
    mapHeight: PropTypes.number.isRequired,
    rowPadding: PropTypes.number
  },
  render: function() {
    var pad = this.props.rowPadding ? 1 : this.props.rowPadding;
    return (
        <MapContainer
          rowPadding={pad}
          mapHeight={this.props.mapHeight}
        />
    );
  }
});

module.exports = MapWrapper;
