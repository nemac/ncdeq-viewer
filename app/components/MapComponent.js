var React = require('react');
var ReactLeaflet = require('react-leaflet')
var agoHelpers = require('../utils/ago-helpers');
import ESRIFeatureLayer from '../components/ESRIFeatureLayer';

var PropTypes = React.PropTypes;

var MapContainer = React.createClass({
  componentDidMount: function() {
    //inital mount the map data is not set need to make sure we don't try get ut
    if (this.refs.map){
      var map = this.refs.map.getLeafletElement();
      this.setState({map:this.refs.map,l:L})
    }

  },
  handleMapClick: function(e){

    // need to add redux stuff for re-sizeing?
    const isVisible = this.props.charts.chart_visibility;

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
    return (
      <div className="twelve wide column" style={{padding:this.props.rowPadding + 'px',height:this.props.mapHeight + 'px'}}>
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
        url='http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/0'
        layerStyle='{"color":"#696969","fillColor":"#DCDCDC","fillOpacity":0,"weight":8}'
        zoom={this.props.zoom}
      />
      <ESRIFeatureLayer
        url='http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/1'
        layerStyle='{"color":"#808080","fillColor":"#DCDCDC","fillOpacity":0,"weight":6}'
        zoom={this.props.zoom}
      />
      <ESRIFeatureLayer
        url='http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/2'
        layerStyle='{"color":"#C0C0C0","fillColor":"#DCDCDC","fillOpacity":0,"weight":2}'
        zoom={this.props.zoom}
      />
    </ReactLeaflet.Map>
  }

  </div>
    );
  }
});

module.exports = MapContainer;
