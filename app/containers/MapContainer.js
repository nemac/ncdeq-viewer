var React = require('react');
var agoHelpers = require('../utils/ago-helpers');
var L = require('leaflet');
var PropTypes = React.PropTypes;
//var MapComponent = require('../components/MapComponent');
var ReactLeaflet = require('react-leaflet')


var MapContainer = React.createClass({
  componentDidMount: function() {
  //   var map = this.refs.map.getLeafletElement();
  //   console.log(map)
  //   var geojsonFeature = {
  //       "type": "Feature",
  //       "properties": {
  //           "name": "Coors Field",
  //           "amenity": "Baseball Stadium",
  //           "popupContent": "This is where the Rockies play!"
  //       },
  //       "geometry": {
  //           "type": "Point",
  //           "coordinates": [-80.4786, 35.6684]
  //       }
  //   };
   //
    //L.geoJson(geojsonFeature).addTo(this.refs.map);
   agoHelpers.getGeoJson(this.refs.map);
    //console.log(GeoJson_RB)

  },
  getInitialState: function() {

    // var geojsonFeature = {
    //     "type": "Feature",
    //     "properties": {
    //         "name": "Coors Field",
    //         "amenity": "Baseball Stadium",
    //         "popupContent": "This is where the Rockies play!"
    //     },
    //     "geometry": {
    //         "type": "Point",
    //         "coordinates": [-80.4786, 35.6684]
    //     }
    // };

    return {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      zoom: this.props.zoom,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      tileUrl:'http://api.tiles.mapbox.com/v3/daveism.oo0p88l4/{z}/{x}/{y}.png',
      //geojson:geojsonFeature
      //'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/0/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token=',
    }
  },
  render: function() {
    return (
      <ReactLeaflet.Map  ref='map' onLeafletZoomEnd={this.props.HandleMapZoomEnd.bind(null,this)} onLeafletMoveend={this.props.handleMapMoveEnd.bind(null,this)} onLeafletClick={this.props.handleMapClick.bind(null,this)} center={[this.props.latitude,this.props.longitude]} zoom={this.props.zoom}>
        <ReactLeaflet.TileLayer
          attribution={this.state.attribution}
          url={this.state.tileUrl}
        />
    </ReactLeaflet.Map>
    );
  }
});

module.exports = MapContainer;
