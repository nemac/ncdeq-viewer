var React = require('react');
var ReactLeaflet = require('react-leaflet')
import ESRIFeatureLayer from '../components/ESRIFeatureLayer';
import ESRITileMapLayer from '../components/ESRITiledMapLayer'
//app constants
import {
  MAP_HEIGHT,
  DEF_PAD,
} from '../constants/appConstants';

import { HUC12_MAP_FEATUREID } from '../constants/actionConstants';

import {zoomToGeoJson} from '../utils/helpers';

var PropTypes = React.PropTypes;

var MapContainer = React.createClass({
  componentWillReceiveProps: function(nextProps) {

    if(nextProps.map_settings.layerInfo){
      //get features from user location
      const features = nextProps.map_settings.layerInfo.features

      // get map object from redux store
      const leafletMap = this.props.leafletMap.leafletMap;

      //call to zoom to geojson (from helper library)
      zoomToGeoJson(features,leafletMap);
    }
  },
  handleMapLoad: function(e,self) {
    var map = this.refs.map.leafletElement;
    this.props.set_LeafletMap(map)
  },
  handleMapClick: function(e,self){

    //get the leaftet map object
    var L = this.refs.map.leafletElement

    //check if charts are visible.
    const isVisible = this.props.charts.chart_visibility;

    //update map height
    this.props.update_MapHeight();

    //get the attributes of the huc12 layer on a user click
    this.props.get_LayerInfo_ByPoint(self.latlng.lat, self.latlng.lng, HUC12_MAP_FEATUREID);

    //update chart visibility on map click on if the visibility is false
    if(!isVisible){
      this.props.update_ChartVisiblity();
    }
  },
  getInitialState: function() {
      return {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        tileUrl:'https://api.tiles.mapbox.com/v3/daveism.oo0p88l4/{z}/{x}/{y}.png',
      }
    },
  render: function() {
    const rowPadding = this.props.default_settings ? this.props.default_settings.rowPadding : DEF_PAD;
    const mapHght = this.props.default_settings ? this.props.default_settings.mapHeight : MAP_HEIGHT;
    // const { ESRIFeatureLayer} = ReactLeaflet.LayersControl;
    return (
      <div className="twelve wide column" style={{padding: rowPadding + 'px',height: mapHght + 'px'}}>
        {this.props.map_settings &&
      <ReactLeaflet.Map  ref='map'
          onLeafletZoomEnd={this.props.HandleMapEnd.bind(null,this)}
          onLeafletMoveend={this.props.HandleMapEnd.bind(null,this)}
          onLeafletClick={this.handleMapClick.bind(null,this)}
          center={[this.props.map_settings.latitude,this.props.map_settings.longitude]}
          zoom={this.props.map_settings.zoom}
          maxBounds={this.props.map_settings.maxBounds}
          maxZoom={this.props.map_settings.maxZoom}
          minZoom={this.props.map_settings.minZoom} >
        <ReactLeaflet.TileLayer
          attribution={this.state.attribution}
          url={this.state.tileUrl}
          onLeafletLoad={this.handleMapLoad.bind(null,this)}
        />
      <ESRIFeatureLayer
        url='https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/4'
        layerStyle='{"color":"#808080","fillColor":"#DCDCDC","fillOpacity":0,"weight":6}'
        zoom={this.props.zoom}
        onLeafletClick={this.handleMapClick.bind(null,this)}
        setMapLayers={this.props.set_MapLayers}
        name="Cataloging Units"
      />
      <ESRIFeatureLayer
        url='https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/3'
        layerStyle='{"color":"#C0C0C0","fillColor":"#DCDCDC","fillOpacity":0,"weight":2}'
        zoom={this.props.zoom}
        min_zoom="9"
        onLeafletClick={this.handleMapClick.bind(null,this)}
        setMapLayers={this.props.set_MapLayers}
        name="HUC 12"
      />
      <ESRITileMapLayer
       url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/HUC6/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="River Basins"
       />
    </ReactLeaflet.Map>
  }

  </div>
    );
  }
});

//  then will have to query the feature layer based on point to get values.....
//  build the tile locally then push to AGO.
//<ESRITileMapLayer
//  url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/test_huc6/MapServer"
//  />
//
module.exports = MapContainer;
