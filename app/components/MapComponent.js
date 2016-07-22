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

let  MAP_CLICK = false;

var MapContainer = React.createClass({
  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps){
      if(this.props.layerInfo){
        let LastFeatures;
        let CurrentFeatures = this.props.layerInfo.features;
        if(prevProps.layerInfo){
          LastFeatures = prevProps.layerInfo.features;
        }

        let CurrentFeaturesStr = JSON.stringify(CurrentFeatures)
        let LastLayerStr = ''

        if(LastLayerStr){
          LastLayerStr = JSON.stringify(LastFeatures)
        }

        if(CurrentFeatures && !LastFeatures){
          console.log('one: ' + CurrentFeatures[0].properties.ID)
        }
        if(LastFeatures && CurrentFeatures){
          if(CurrentFeatures[0].properties.ID != LastFeatures[0].properties.ID){
            // console.log('Two: ' + CurrentFeatures[0].properties.ID)
            // console.log('Two: ' + LastFeatures[0].properties.ID)

            //get features from user location
            const features = this.props.layerInfo.features

            const level = this.getLevel();

            // get map object from redux store
            const leafletMap = this.props.leafletMap.leafletMap;

            //call to zoom to geojson (from helper library)
            const layer = zoomToGeoJson(features,leafletMap,level);

            this.updateFilters(CurrentFeatures[0].properties.VALUE);

            //when geojson is added on top of map.  it also needs a map click handler enabled.
            if(layer){
              const mapClickHandler = this.handleMapClick
              layer.on('click', function(e,mapClickHandler) {
                mapClickHandler.bind(null,this)
              }.bind(this));
            }

          }
        }

        // console.log(CurrentFeatures[0].properties.ID)
        // console.log(LastFeatures[0].properties.ID)

        // if(!LastFeatures){
        //   console.log(CurrentFeatures)
        // }
        //if(LastFeatures){
          // if(LastLayerStr === CurrentFeaturesStr){
          //   console.log(LastLayerStr)
          //   console.log(CurrentFeaturesStr)
          //
          // }
        // }


      }
    }

  },
  // componentDidUpdate: function(prevProps, prevState) {
  //
  //   if(this.props.layerInfo){
  //
  //     //get features from user location
  //     const features = this.props.layerInfo.features
  //
  //     const level = this.getLevel();
  //
  //     // get map object from redux store
  //     const leafletMap = this.props.leafletMap.leafletMap;
  //
  //     //call to zoom to geojson (from helper library)
  //     const layer = zoomToGeoJson(features,leafletMap,level);
  //     //console.log(layer)
  //     //layer.redraw()
  //     //when geojson is added on top of map.  it also needs a map click handler enabled.
  //     if(layer){
  //       const mapClickHandler = this.handleMapClick
  //       layer.on('click', function(e,mapClickHandler) {
  //         mapClickHandler.bind(null,this)
  //       }.bind(this));
  //     }
  //   }
  // },
  HandleMapEnd: function(mapComp,e){

    //on any map move get the current level and filtered id
    const level = this.getLevel();
    const filterId = this.getLevelFilter();

    //reset the selector picklist for that layer to the id.
    // there are times when promises from the AGO api did not finish and the menus where not
    // updated this ensures the menus are updated...
    this.props.HandleMapEnd(mapComp,e);
    this.updateFilters(filterId);

  },
  getLevelFilter: function(){

    if (this.props.geography_levels){
      //filter the levels to get the active tab
      const activeFilterObject = this.props.geography_levels.filter( key =>{
        return key.active === true;
      })

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
  updateFilters: function(value){

    //loop all levels - probably need to get this from data, but for now hardcoded
    const levels = ['River Basins','Cataloging Units','HUC12']

    //loop the levels object
    levels.map((level)=>{

      //get the string length for substring'  the current value.
      //  the current value should always be huc 12 so River Basins and Cataloging Units
      //  should be 2 and 4 lengths less..
      const matchEnd = get_matchEnd(level);

      //ensure value was defined.
      if(value){

          //get the value for the level
          const selectedValue = value.substring(0,matchEnd)

          //set the filter in redux store for the level
          //  this will ensure the menus/breadcrumbs will also update appropiately
          this.props.change_geographyLevelFilter(selectedValue,level)

          //kind of hacky--how to do this in redux?
          $('#search-select-'+level.replace(' ','_')).dropdown('set selected',selectedValue);

          //get the value selected.
          // there are times when the value dose not exists in the selector so we need overcome this
          let HTMLvalue = $('#search-select-'+level.replace(' ','_')).dropdown('get value');

          //if the value in the selector does not match what the user selected. that means there was no
          //  value in the selector (pick list).
          if (HTMLvalue[0] != selectedValue){
            $('#search-select-'+level.replace(' ','_')).dropdown('set text','Choose a ' + level);
            $('#search-select-'+level.replace(' ','_')).dropdown('set selected',selectedValue);
          }
      }
    })
  },
  handleMapLoad: function(e,self) {
    var map = this.refs.map.leafletElement;
    this.props.set_LeafletMap(map)

    // if(this.props.layerInfo){
    //   const features = this.props.layerInfo.features
    //   //make sure objects are defined.
    //   //  there are times when these are not defined
    //   if (features){
    //     if (features[0]){
    //
    //       //get the current featires ID
    //       const value = features[0].properties.ID;
    //
    //       //update all selectors menus to match map selection or google search
    //       this.updateFilters(value);
    //     }
    //
    //   }
    // }
  },
  handleMapClick: function(e,self){


    //set current geography level in redux state store
    this.props.change_geographyLevelActive("HUC12");

    //get the leaftet map object
    var L = this.refs.map.leafletElement

    //check if charts are visible.
    //const isVisible = this.props.charts.chart_visibility;

    //update map height
    this.props.update_MapHeight();

    //get the attributes of the huc12 layer on a user click
    this.props.get_LayerInfo_ByPoint(self.latlng.lat, self.latlng.lng, HUC12_MAP_FEATUREID);

    MAP_CLICK  = false;
    //update chart visibility on map click on if the visibility is false
    // if(!isVisible){
    //   this.props.update_ChartVisiblity();
    // }
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

    return (
      <div className="twelve wide column" style={{padding: rowPadding + 'px',height: mapHght + 'px'}}>
        {this.props.map_settings &&
      <ReactLeaflet.Map  ref='map'
          onLeafletZoomEnd={this.HandleMapEnd.bind(null,this)}
          onLeafletMoveEnd={this.HandleMapEnd.bind(null,this)}
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

module.exports = MapContainer;
