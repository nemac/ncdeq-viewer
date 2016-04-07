var React = require('react');
var MapContainer = require('../containers/MapContainer')
var PropTypes = React.PropTypes;


function MapWrapper(props) {
  var pad = props.rowPadding ? 1 : props.rowPadding;
  return (
    <div className="twelve wide column" style={{padding:pad + 'px',height:props.mapHeight + 'px'}}>
      <MapContainer />
    </div>
  );
}

MapWrapper.propTypes = {
  mapHeight: PropTypes.number.isRequired,
  rowPadding: PropTypes.number
}

module.exports = MapWrapper;
