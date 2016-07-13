var React = require('react');
var ReactLeaflet = require('react-leaflet')
import ESRIFeatureLayer from '../components/ESRIFeatureLayer';
import ESRITileMapLayer from '../components/ESRITiledMapLayer'
//app constants
import {
  MAP_HEIGHT,
  DEF_PAD,
} from '../constants/appConstants'

var PropTypes = React.PropTypes;

var MapContainer = React.createClass({
  componentDidMount: function() {
    //inital mount the map data is not set need to make sure we don't try get ut
    if (this.refs.map){
      var map = this.refs.map.getLeafletElement();
      this.setState({map:this.refs.map,l:L})
    }

  },
  handleMapClick: function(e,self){

    var L = this.refs.map.leafletElement
    //console.log(L)
    // console.log(e)
    // console.log(self)
    // console.log(self.layer.feature.properties.ID)
    // need to add redux stuff for re-sizeing?
    const isVisible = this.props.charts.chart_visibility;

    this.props.update_MapHeight();

    //this.updateFilterState('Cataloging Units',self.layer.feature.properties.ID);

    //this.props.get_ChartData(self.layer.feature.properties.ID,'HUC12')
    //this.props.change_geographyLevelFilter(self.layer.feature.properties.ID,'HUC12')

    //update chart visibility on map click...
    if(!isVisible){
      this.props.update_ChartVisiblity();
    }
  },
  getInitialState: function() {
      return {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        tileUrl:'http://api.tiles.mapbox.com/v3/daveism.oo0p88l4/{z}/{x}/{y}.png',
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
        />
      <ESRIFeatureLayer
        url='https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/5'
        layerStyle='{"color":"#696969","fillColor":"#DCDCDC","fillOpacity":0,"weight":8}'
        zoom={this.props.zoom}
        onLeafletClick={this.handleMapClick.bind(null,this)}
        name="RB"
      />
      <ESRIFeatureLayer
        url='https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/4'
        layerStyle='{"color":"#808080","fillColor":"#DCDCDC","fillOpacity":0,"weight":6}'
        zoom={this.props.zoom}
        onLeafletClick={this.handleMapClick.bind(null,this)}
        name="CU"
      />
      <ESRIFeatureLayer
        url='https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/3'
        layerStyle='{"color":"#C0C0C0","fillColor":"#DCDCDC","fillOpacity":0,"weight":2}'
        zoom={this.props.zoom}
        min_zoom="9"
        onLeafletClick={this.handleMapClick.bind(null,this)}
        name="HUC"
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
