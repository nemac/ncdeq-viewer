var React = require('react');
var ReactLeaflet = require('react-leaflet')
//import { Map, GeoJson, TileLayer } from 'react-leaflet';
var PropTypes = React.PropTypes;




function MapComponent(props){
    return (
        <ReactLeaflet.Map  ref='map' onLeafletMoveend={ function(e){console.log('test')}} onLeafletClick={props.handleMapClick().bind(null)} center={[props.latitude,props.longitude]} zoom={props.zoom}>
          <ReactLeaflet.TileLayer
            attribution={props.attribution}
            url={props.tileUrl}
          />
      </ReactLeaflet.Map>
    )
  }

  MapComponent.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    attribution: PropTypes.string.isRequired,
    tileUrl: PropTypes.string.isRequired,
    zoom: PropTypes.number.isRequired,
    handleMapClick: PropTypes.func.isRequired,
    geojson: PropTypes.object
  }

module.exports = MapComponent;
