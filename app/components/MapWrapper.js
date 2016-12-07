var React = require('react');
import MapContainer from '../containers/MapContainer'

//app constants
import {
  ROW_PADDING
} from '../constants/appConstants'

var PropTypes = React.PropTypes;

var MapWrapper = React.createClass({
  propTypes: {
  },
  render: function() {
    return (
        <MapContainer />
    );
  }
});

module.exports = MapWrapper;
