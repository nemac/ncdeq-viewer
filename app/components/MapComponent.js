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
  HandleMapEnd: function(mapComp,e){
    const level = this.getLevel();
    const filterId = this.getLevelFilter();
    $('#search-select-'+level.replace(' ','_')).dropdown('set selected',filterId);
    this.props.HandleMapEnd(mapComp,e);
  },
  getLevelFilter: function(){

    if (this.props.geography_levels){
      //filter the levels to get the active tab
      const activeFilterObject = this.props.geography_levels.filter( key =>{
        return key.active === true;
      })
      console.log(activeFilterObject)
      //set default active tab - as Highest level
      let activeFilter = ''
      if (activeFilterObject.length > 0){
        //get the active tab and convert the name to the name used in the app.
        //  this will eventually be driven by config or data....???
        activeFilter = activeFilterObject[0].current_id;
      }

      return activeFilter
    }else{
      return null
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
  updateFilterStateReverse: function(alevel,value){

    const levels = ['River Basins','Cataloging Units','HUC12']



    levels.map((level)=>{

      // console.log(level)
      const matchEnd = get_matchEnd(level);
      // console.log(matchEnd)
      if(value){
        // if(level === alevel){



          const selectedValue = value.substring(0,matchEnd)

          // console.log(selectedValue)
          // console.log(alevel)
          // console.log(level)
          // console.log(selectedValue)

          this.props.change_geographyLevelFilter(selectedValue,level)
          //$('#search-select-'+level.replace(' ','_')).dropdown('set text',selectedValue)

          //kind of hacky--how to do this in redux?
          $('#search-select-'+level.replace(' ','_')).dropdown('set selected',selectedValue);
          let HTMLvalue = $('#search-select-'+level.replace(' ','_')).dropdown('get value');


          // console.log(HTMLvalue)

          if (HTMLvalue[0] != selectedValue){
            $('#search-select-'+level.replace(' ','_')).dropdown('set selected',selectedValue);

          //  $('#search-select-'+level.replace(' ','_')).dropdown('set text','Choose a ' + level)
          }


        // }




        // get map object from redux store
        const leafletMap = this.props.leafletMap.leafletMap;
        // leafletMap.setView(new L.LatLng(this.props.map_settings.latitude,this.props.map_settings.longitude),this.props.map_settings.zoomå)



        // if (HTMLvalue[0] != selectedValue){
        //    $('#search-select-'+level.replace(' ','_')).dropdown('set text','Choose a ' + level)
        // } else {
        //   this.updateFilterState(selectedValue,level);
        //   this.props.change_geographyLevelFilter(selectedValue,level)
        // }

      }

    })

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

          //again kind of hacky
          //$('#search-select-'+level.replace(' ','_')).dropdown('set selected',value)

          //update all selectors so
          this.updateFilterStateReverse(level,value);
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
          onLeafletZoomEnd={this.HandleMapEnd.bind(null,this)}
          onLeafletMoveend={this.HandleMapEnd.bind(null,this)}
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
       tileOpacity="0.5"
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
