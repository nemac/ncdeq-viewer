var React = require('react');
var ReactLeaflet = require('react-leaflet')
var agoHelpers = require('../utils/ago-helpers');
import ESRIFeatureLayer from '../components/ESRIFeatureLayer';

var PropTypes = React.PropTypes;

var MapContainer = React.createClass({
  componentDidMount: function() {
    // this.props.get_defaultMapData();
    //
    // console.log(this.props)
    // agoHelpers.get_BasinsAll()
    //   .then(function(returnedData){
    //     console.log('ALL BASINS: ' + JSON.stringify(returnedData))
    // })
    //
    // agoHelpers.get_GeographyLevels()
    //   .then(function(returnedData){
    //     console.log('Geography Levels: ' + JSON.stringify(returnedData))
    //   })
    //
    // agoHelpers.get_Basins()
    //   .then(function(returnedData){
    //     console.log('BASINS: ' + JSON.stringify(returnedData))
    //   })
    //
    // agoHelpers.get_MenuList()
    //   .then(function(returnedData){
    //     //console.log('Menu List: ' + JSON.stringify(returnedData))
    //   })
    //
    //   agoHelpers.get_filteredIDs()
    //     .then(function(returnedData){
    //       console.log('filtered ids: ' + JSON.stringify(returnedData))
    //     })
    //
    //     agoHelpers.get_CatalogingUnits()
    //     .then(function(returnedData){
    //       console.log('Cataloging Units: ' + JSON.stringify(returnedData))
    //     })
    //     agoHelpers.get_ActualHUCS()
    //     .then(function(returnedData){
    //       console.log('HUC 12s: ' + JSON.stringify(returnedData))
    //     })

    //console.log(this.props)
    // this.props.get_defaultMapData();
    // console.log(this.props)

    if (this.refs.map){
      var map = this.refs.map.getLeafletElement();
      this.setState({map:this.refs.map,l:L})
    }

  },
  handleMapClick: function(e){
    // need to add redux stuff for re-sizeing?
    const isVisible = this.props.charts.chart_visibility;
    if(!isVisible){
      this.props.update_ChartVisiblity();
    }
  },
  getInitialState: function() {

    var southWest = L.latLng(36.932330061503144, -73.970947265625),
    northEast = L.latLng(33.54139466898275, -86.98974609375),
    bounds = L.latLngBounds(southWest, northEast);
    return {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      zoom: this.props.zoom,
      minZoom: 7,
      maxZoom: 16,
      maxBounds: bounds,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      tileUrl:'http://api.tiles.mapbox.com/v3/daveism.oo0p88l4/{z}/{x}/{y}.png',
    }
  },
  render: function() {
    //console.log(this.props.mapConfig.mapconfig)
    // const mapconfigset = this.props.mapConfig ? true : false;
    //if (this.props.mapConfig.mapconfig){console.log('map not set yet')}
    // var southWest = L.latLng(36.932330061503144, -73.970947265625),
    // northEast = L.latLng(33.54139466898275, -86.98974609375),
    // bounds = L.latLngBounds(southWest, northEast);
    // console.log(this.props.mapConfig.mapconfig)
    return (
      <div className="twelve wide column" style={{padding:this.props.rowPadding + 'px',height:this.props.mapHeight + 'px'}}>
        {this.props.mapConfig.mapconfig &&
      <ReactLeaflet.Map  ref='map'
          onLeafletZoomEnd={this.props.HandleMapZoomEnd.bind(null,this)}
          onLeafletMoveend={this.props.handleMapMoveEnd.bind(null,this)}
          onLeafletClick={this.handleMapClick.bind(null,this)}
          center={[this.props.mapConfig.mapconfig.latitude,this.props.mapConfig.mapconfig.longitude]}
          zoom={this.props.mapConfig.mapconfig.zoom}
          maxBounds={this.props.mapConfig.mapconfig.maxBounds}
          maxZoom={this.props.mapConfig.mapconfig.maxZoom}
          minZoom={this.props.mapConfig.mapconfig.minZoom} >
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
