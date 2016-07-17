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

import {zoomToGeoJson, getCategoryName, getNextLevelName, getPrevLevelName, get_matchEnd} from '../utils/helpers';

var PropTypes = React.PropTypes;

var MapContainer = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.layerInfo){

      //get features from user location
      const features = nextProps.layerInfo.features

      // get map object from redux store
      const leafletMap = this.props.leafletMap.leafletMap;

      const level = this.getLevel();

      //call to zoom to geojson (from helper library)
      const layer = zoomToGeoJson(features,leafletMap,level);

      //only zoom first time this is called otherwise this will force a rezoom everythome prop is changed
    }
  },
  getLevel: function(){

    if (this.props.geography_levels){
      //filter the levels to get the active tab
      const ActiveTabObject = this.props.geography_levels.filter( key =>{
        return key.active === true;
      })

      //set default active tab - as Highest level
      let activeTab = 'River Basins'
      if (ActiveTabObject.length > 0){
        //get the active tab and convert the name to the name used in the app.
        //  this will eventually be driven by config or data....???
        activeTab = getCategoryName(ActiveTabObject[0].geography_label);
      }

      return activeTab
    }else{
      return null
    }
  },
  updateFilterState(level,value){

    var nextLevel = getNextLevelName(level);

    //set filter and active state for next level(s)
    if(nextLevel){

      //kind of hacky--how to do this in redux?
      $('#search-select-'+nextLevel.replace(' ','_')).dropdown('set text','Choose a ' + nextLevel)

      //recursive call to update all level filters
      return this.updateFilterState(nextLevel,value)
    } else{
      return
    }
  },
  updateFilterStateReverse(level,value){

    var prevLevel = getPrevLevelName(level);

    //set filter and active state for next level(s)
    if(prevLevel){


      const matchEnd = get_matchEnd(prevLevel);
      if(value){
        const selectedValue = value.substring(0,matchEnd)
        //kind of hacky--how to do this in redux?
        $('#search-select-'+prevLevel.replace(' ','_')).dropdown('set selected',selectedValue)

        //get text	 TO COMPARE then if not matching make blank? or add text

      }

      //recursive call to update all level filters
      return this.updateFilterStateReverse(prevLevel,value)
    } else{
      return
    }
  },


  handleMapLoad: function(e,self) {
    var map = this.refs.map.leafletElement;
    this.props.set_LeafletMap(map)

    if(this.props.layerInfo){
      const features = this.props.layerInfo.features
      if (features){
        if (features[0]){

          const level = this.getLevel();
          const value = features[0].properties.ID;

          this.props.change_geographyLevelFilter(value,level)

          this.updateFilterState(level,value);

          this.updateFilterStateReverse(level,value);

          //again kind of hacky
          $('#search-select-'+level.replace(' ','_')).dropdown('set selected',value)
        }

      }
    }
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

    //set current geography level in redux state store
    this.props.change_geographyLevelActive("HUC12");

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
      <ESRITileMapLayer
       url="http://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc12/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="HUC 12"
       min_zoom="9"
       onLeafletClick={this.handleMapClick.bind(null,this)}
       />
      <ESRITileMapLayer
       url="http://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc8/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="Cataloging Units"
       onLeafletClick={this.handleMapClick.bind(null,this)}
       />
      <ESRITileMapLayer
       url="http://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc6/MapServer"
       setMapLayers={this.props.set_MapLayers}
       opacity="0.5"
       name="River Basins"
       onLeafletClick={this.handleMapClick.bind(null,this)}
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
