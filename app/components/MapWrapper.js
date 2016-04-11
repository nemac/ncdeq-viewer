var React = require('react');
var MapContainer = require('../containers/MapContainer')

var PropTypes = React.PropTypes;


function MapWrapper(props) {
  var pad = props.rowPadding ? 1 : props.rowPadding;
  return (
    <div className="twelve wide column" style={{padding:pad + 'px',height:props.mapHeight + 'px'}}>
      <MapContainer handleSetCenter={props.handleSetCenter} latitude={props.latitude} longitude={props.longitude} handleMapClick={props.handleMapClick} />
    </div>
  );
}

MapWrapper.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  mapHeight: PropTypes.number.isRequired,
  handleMapClick: PropTypes.func.isRequired,
  handleSetCenter: PropTypes.func.isRequired,
  rowPadding: PropTypes.number
}

module.exports = MapWrapper;
