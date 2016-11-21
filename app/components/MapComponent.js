var React = require('react');
var ReactLeaflet = require('react-leaflet')
import ESRIFeatureLayer from '../components/ESRIFeatureLayer';
import ESRITileMapLayer from '../components/ESRITiledMapLayer'
import Control from '../components/control';

//app constants
import {
  MAP_HEIGHT,
  DEF_PAD,
} from '../constants/appConstants';

import { HUC12_MAP_FEATUREID } from '../constants/actionConstants';

import { getCategoryName, getNextLevelName, getPrevLevelName, get_matchEnd, get_HUC} from '../utils/helpers';

var PropTypes = React.PropTypes;

var TempLayer;
var TempZoomLayer;
var TempTraLayer;
var TempCatchmentLayer;
var TempMapPoint;

var MapContainer = React.createClass({
  handleResize: function(){
    //leaflet map dosenot update size this forces the issue
    if(this.props.leafletMap){
      const leafletMap = this.props.leafletMap.leafletMap;
      setTimeout(function(){ leafletMap.invalidateSize()}, 400);
      leafletMap.invalidateSize()
    };
  },
  handleChartButtonClick: function(comp,e){

    //toggle chart visibility with button click
    this.props.update_ChartVisiblity();
    this.props.update_MapHeight();

    //leaflet map dosenot update size this forces the issue
    if(this.props.leafletMap){
      const leafletMap = this.props.leafletMap.leafletMap;
      setTimeout(function(){ leafletMap.invalidateSize()}, 100);
    };
  },
  add_GeoJSON: function(features){

    //get the leaflet Map object
    const leafletMap = this.props.leafletMap.leafletMap;

    //check if the layer has been added yes it is global varriable :)
    const isLayerVis = leafletMap.hasLayer(TempLayer);

    //if a geojson layer has been added remove it.
    //  eventually we want to only remove when user elects too.
    if (isLayerVis){
      leafletMap.removeLayer(TempLayer)
    }

    //add ta blank layer to leaflet
    TempLayer = L.geoJson().addTo(leafletMap);

    //add the GeoJSON data to the layer
    TempLayer.addData(features);

    //zoom highlights need to move this to varriable
    TempLayer.setStyle({
      fillColor :'#1F618D',
      stroke: true,
      weight: 8,
      opacity: 0.6,
      color: '#1F618D',
      fillOpacity: 0.25,
      zIndex: 0
    })

    //when geojson is added on top of map.  it also needs a map click handler enabled.
    this.add_GeoJSON_ClickEvent(TempLayer);

    //return the layer
    return TempLayer

  },
  catchment_GeoJson: function(features){
    //get the leaflet Map object
    const leafletMap = this.props.leafletMap.leafletMap;

    //check if the layer has been added yes it is global varriable :)
    const isLayerVis = leafletMap.hasLayer(TempCatchmentLayer);

    //if a geojson layer has been added remove it.
    //  eventually we want to only remove when user elects too.
    if (isLayerVis){
      leafletMap.removeLayer(TempCatchmentLayer)
    }

    //add a blank layer to leaflet
    TempCatchmentLayer = L.geoJson().addTo(leafletMap);

    //add the GeoJSON data to the layer
    TempCatchmentLayer.addData(features);

    //zoom highlights need to move this to varriable
    TempCatchmentLayer.setStyle({
      fillColor :'#1C2833',
      stroke: true,
      weight: 20,
      opacity: 0.6,
      color: '#1C2833',
      fillOpacity: 0.25,
      zIndex: 100
    })


    //when geojson is added on top of map.  it also needs a map click handler enabled.
    this.add_GeoJSON_ClickEvent(TempCatchmentLayer);


    leafletMap.invalidateSize();

    //return the layer
    return TempCatchmentLayer

  },
  map_point_GeoJson: function(features){
    //get the leaflet Map object
    const leafletMap = this.props.leafletMap.leafletMap;

    //check if the layer has been added yes it is global varriable :)
    const isLayerVis = leafletMap.hasLayer(TempMapPoint);

    //if a geojson layer has been added remove it.
    //  eventually we want to only remove when user elects too.
    if (isLayerVis){
      leafletMap.removeLayer(TempMapPoint)
    }

    //add a blank layer to leaflet
    TempMapPoint = L.geoJson().addTo(leafletMap);

    //add the GeoJSON data to the layer
    TempMapPoint.addData(features);

    leafletMap.invalidateSize();

    //return the layer
    return TempCatchmentLayer

  },
  tra_GeoJson: function(features){
    //get the leaflet Map object
    const leafletMap = this.props.leafletMap.leafletMap;

    //check if the layer has been added yes it is global varriable :)
    const isLayerVis = leafletMap.hasLayer(TempTraLayer);

    //if a geojson layer has been added remove it.
    //  eventually we want to only remove when user elects too.
    if (isLayerVis){
      leafletMap.removeLayer(TempTraLayer)
    }

    //add a blank layer to leaflet
    TempTraLayer = L.geoJson().addTo(leafletMap);

    //add the GeoJSON data to the layer
    TempTraLayer.addData(features);

    //zoom highlights need to move this to varriable
    TempTraLayer.setStyle({
      fillColor :'red',
      stroke: true,
      weight: 8,
      opacity: 0.4,
      color: 'red',
      fillOpacity: 0.0,
      zIndex: 50
    })


    //when geojson is added on top of map.  it also needs a map click handler enabled.
    this.add_GeoJSON_ClickEvent(TempTraLayer);

    leafletMap.invalidateSize();

    //return the layer
    return TempTraLayer

  },
  zoom_GeoJson: function(features){
    //get the leaflet Map object
    const leafletMap = this.props.leafletMap.leafletMap;

    //check if the layer has been added yes it is global varriable :)
    const isLayerVis = leafletMap.hasLayer(TempZoomLayer);

    //if a geojson layer has been added remove it.
    //  eventually we want to only remove when user elects too.
    if (isLayerVis){
      leafletMap.removeLayer(TempZoomLayer)
    }

    //add a blank layer to leaflet
    TempZoomLayer = L.geoJson().addTo(leafletMap);

    //add the GeoJSON data to the layer
    TempZoomLayer.addData(features);

    //zoom highlights need to move this to varriable
    TempZoomLayer.setStyle({
      fillColor :'yellow',
      stroke: true,
      weight: 8,
      opacity: 0.4,
      color: 'yellow',
      fillOpacity: 0.0,
      zIndex: 75
    })

    //pan and zoom to bounds of layers bounds
    leafletMap.fitBounds(TempZoomLayer.getBounds());

    //when geojson is added on top of map.  it also needs a map click handler enabled.
    this.add_GeoJSON_ClickEvent(TempZoomLayer);

    leafletMap.invalidateSize();

    //return the layer
    return TempZoomLayer

  },
  add_GeoJSON_ClickEvent: function(layer){
    //add a click event to the new layer so the new layer does not steal the state...
    //  w/out this when a user clicked on geojson like a huc 6 or huc 8 (riverbasin or Cataloging unit)
    //  nothing would happen.
    var mapClickHandler = this.handleMapClick

    //when geojson is added on top of map.  it also needs a map click handler enabled.
    if(layer){
      layer.on('click', function(e, mapClickHandler) {
        mapClickHandler.bind(null,this)
      }.bind(this));
    }

  },
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   //only do this if not currently fetching some data
  //   //fetching map data
  //   // if(this.props.fetching_map ||
  //   //    this.props.fetching_chart ||
  //   //    this.props.fetching_tra ||
  //   //    this.props.fetching_geo ||
  //   //    this.props.fetching_menu  ){
  //   //   return false
  //   // }
  //
  //   // //fetching chart data
  //   // if(this.props.fetching_chart ){
  //   //   return false
  //   // }
  //
  //   // //fetching tra data
  //   // if(this.props.fetching_tra){
  //   //   return false
  //   // }
  //
  //   // //fetching tra geography_levels
  //   // if(this.props.fetching_geo){
  //   //   return false
  //   // }
  //   // //fetching menu lists
  //   // if(this.props.fetching_menu){
  //   //   return false
  //   // }
  //   return true
  // },

  componentDidUpdate: function(prevProps, prevState) {

    // //only do this if not currently fetching some data
    // //fetching map data
    // if(this.props.fetching_map){
    //   return
    // }
    //
    // //fetching chart data
    // if(this.props.fetching_chart ){
    //   return
    // }
    //
    // //fetching tra data
    // if(this.props.fetching_tra){
    //   return
    // }
    //
    // //fetching tra geography_levels
    // if(this.props.fetching_geo){
    //   return
    // }
    // //fetching menu lists
    // if(this.props.fetching_menu){
    //   return
    // }

    //check if there was a prevProps
    // need to functionise this.
    if (prevProps){

      //map point
      // add a marker to the map click or map search
      if(this.props.map_settings){
        if(this.props.map_settings.map_point){
          if(this.props.map_settings.map_point.features){
            // console.log(this.props.map_settings.map_point.features)
            this.map_point_GeoJson(this.props.map_settings.map_point.features)
          }
        }
      }


      if(this.props.NLCDPointInfo){
        if(this.props.NLCDPointInfo.features){

          //current catchment
          let current_catchment = this.props.NLCDPointInfo.features.length > 0 ? this.props.NLCDPointInfo.features[0].properties.ID : [];
          let last_catchment = 'not sure';
          const current_catchment_features = this.props.NLCDPointInfo.features.length > 0 ? this.props.NLCDPointInfo.features : [];

          // prevouis catchment
          if(prevProps.NLCDPointInfo){
            if(prevProps.NLCDPointInfo.features){
              last_catchment = prevProps.NLCDPointInfo.features.length > 0 ? prevProps.NLCDPointInfo.features[0].properties.ID : [] ;
            }
          }

          let LastCatchmentFeatures;

          //get the cathcment geojson if the current and last catchments are different
          if(current_catchment != last_catchment){

            //get nlcd data
            this.props.get_nlcd_data(current_catchment)

            //get catchment baseline data
            this.props.get_catchment_data(current_catchment)

            //add geojson
            this.catchment_GeoJson(current_catchment_features)


          }


       }
      }


            //checks for adding tra data on chart click
            if(this.props.traInfo){
              let LastTRAFeatures;

              let CurrentTRAFeatures = this.props.traInfo.features;

              //check if there was a layerinfo object in the prevous state redux store
              if(prevProps.traInfo){
                LastTRAFeatures = prevProps.traInfo.features;
              }

              //in initial state there will not be an objet we still need to zoom and get the data...
              if(CurrentTRAFeatures && !LastTRAFeatures){

                //make sure there is a feature in the array.  when searching outside of NorthCarolina
                //   this may return a blank features object.
                if(CurrentTRAFeatures[0]){

                  //add geojson
                  this.tra_GeoJson(CurrentTRAFeatures)

                }
              }

              //when there are both a last feaures and current feautes JSON object
              if(LastTRAFeatures && CurrentTRAFeatures){


                //make sure there is a feature in the array.  when searching outside of NorthCarolina
                //   this may return a blank features object.
                if(CurrentTRAFeatures[0]){

                    if(LastTRAFeatures.length === 0){

                      //add geojson
                      this.tra_GeoJson(CurrentTRAFeatures)

                    } else {

                    //when the last features JSON and Current Features JSON do not match
                    //  it is a new feature.  so we should select and zoom TRA's have lower case id need to change this in data and api
                    if(CurrentTRAFeatures[0].properties.ID != LastTRAFeatures[0].properties.ID){

                      //add geojson
                      this.tra_GeoJson(CurrentTRAFeatures)


                    }
                 }
                }
              }

            }


      if(this.props.huc8Info){

        let LastHUC8Features;

        let CurrentHuc8Features = this.props.huc8Info.features;

        //check if there was a layerinfo object in the prevous state redux store
        if(prevProps.huc8Info){
          LastHUC8Features = prevProps.huc8Info.features;
        }

        //in initial state there will not be an objet we still need to zoom and get the data...
        if(CurrentHuc8Features && !LastHUC8Features){

          //make sure there is a feature in the array.  when searching outside of NorthCarolina
          //   this may return a blank features object.
          if(CurrentHuc8Features[0]){

            //add geojson
            this.zoom_GeoJson(CurrentHuc8Features)

          }
        }

        //when there are both a last feaures and current feautes JSON object
        if(LastHUC8Features && CurrentHuc8Features){

          //make sure there is a feature in the array.  when searching outside of NorthCarolina
          //   this may return a blank features object.
          if(CurrentHuc8Features[0]){

              if(LastHUC8Features.length === 0){
                //add geojson
                this.zoom_GeoJson(CurrentHuc8Features)

              } else {

              //when the last features JSON and Current Features JSON do not match
              //  it is a new feature.  so we should select and zoom
              if(CurrentHuc8Features[0].properties.ID != LastHUC8Features[0].properties.ID){

                //add geojson
                this.zoom_GeoJson(CurrentHuc8Features)


              }
           }
          }
        }

      }

      //check if there is a layerinfo object in the redux store
      if(this.props.layerInfo){

        let LastFeatures;

        //get the feaures in the current redux store
        let CurrentFeatures = this.props.layerInfo.features;

        //check if there was a layerinfo object in the prevous state redux store
        if(prevProps.layerInfo){
          LastFeatures = prevProps.layerInfo.features;
        }

        //get the string of the current features so we can compare the JSON data
        let CurrentFeaturesStr = JSON.stringify(CurrentFeatures)

        let LastLayerStr = ''

        //if the last features existed make it string for comparison otherwise leave it as a blank substring
        if(LastFeatures){
          LastLayerStr = JSON.stringify(LastFeatures)
        }


        //in initial state there will not be an objet we still need to zoom and get the data...
        if(CurrentFeatures && !LastFeatures){

          //make sure there is a feature in the array.  when searching outside of NorthCarolina
          //   this may return a blank features object.
          if(CurrentFeatures[0]){

            //add geojson
            this.add_GeoJSON(CurrentFeatures);

            //update menus
            this.updateFilters(CurrentFeatures[0].properties.VALUE);

          }
        }

        //when there are both a last feaures and current feautes JSON object
        if(LastFeatures && CurrentFeatures){

          //make sure there is a feature in the array.  when searching outside of NorthCarolina
          //   this may return a blank features object.
          if(CurrentFeatures[0]){

              if(LastFeatures.length === 0){
                //add geojson
                this.add_GeoJSON(CurrentFeatures);

                //update menus
                this.updateFilters(CurrentFeatures[0].properties.VALUE);
              } else {

              //when the last features JSON and Current Features JSON do not match
              //  it is a new feature.  so we should select and zoom
              if(CurrentFeatures[0].properties.ID != LastFeatures[0].properties.ID){

                //add geojson
                this.add_GeoJSON(CurrentFeatures);

                //update menus
                this.updateFilters(CurrentFeatures[0].properties.VALUE);
              }
           }
          }
        }
      }
    }

  },
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

          const HUC_desgination = get_HUC(level);

          //if the value in the selector does not match what the user selected. that means there was no
          //  value in the selector (pick list).
          if (HTMLvalue[0] != selectedValue){
            $('#search-select-'+level.replace(' ','_')).dropdown('set text','Choose a ' + level + '(' + HUC_desgination+ ')');
            $('#search-select-'+level.replace(' ','_')).dropdown('set selected',selectedValue);
          }
      }
    })
  },
  handleMapLoad: function(e,self) {
    var map = this.refs.map.leafletElement;
    this.props.set_LeafletMap(map)

    if(this.props.layerInfo){
      const features = this.props.layerInfo.features
      //make sure objects are defined.
      //  there are times when these are not defined
      if (features){
        if (features[0]){

          //get the current featires ID
          const value = features[0].properties.ID;

          //update all selectors menus to match map selection or google search
          this.updateFilters(value);
        }

      }
    }
  },
  handleMapClick: function(e,self){

    this.props.set_search_method('clicked')

    //update header vis in action
    this.props.update_HeaderVis()

    //set current geography level in redux state store
    this.props.change_geographyLevelActive("HUC12");

    //get the leaftet map object
    var L = this.refs.map.leafletElement

    //update map height
    this.props.update_MapHeight();

    //get the attributes of the huc12 layer on a user click
    this.props.get_LayerInfo_ByPoint(self.latlng.lat, self.latlng.lng, HUC12_MAP_FEATUREID);

  },
  getInitialState: function() {
      return {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        tileUrl:'https://api.tiles.mapbox.com/v3/daveism.oo0p88l4/{z}/{x}/{y}.png',
      }
  },
  render: function() {
    //
    //not sure yet ho to handle this but mapHeight needs to be adjusted by to px in the map component
    const mapHeight_adjustment = 10;
    const rowPadding = this.props.default_settings ? this.props.default_settings.rowPadding : DEF_PAD;
    const mapHght = this.props.default_settings ? this.props.default_settings.mapHeight-mapHeight_adjustment : MAP_HEIGHT-mapHeight_adjustment;
    const chartVisibility = this.props.chart ? this.props.chart.chart_visibility : null;

    return (
      <div className="sixteen wide stackable column" style={{paddingLeft: rowPadding + 'px',paddingRight: rowPadding + 'px',paddingTop: rowPadding + 'px',height: mapHght + 'px'}}>
        {this.props.map_settings &&
      <ReactLeaflet.Map  ref='map'
          onLeafletZoomEnd={this.HandleMapEnd.bind(null,this)}
          onLeafletMoveEnd={this.HandleMapEnd.bind(null,this)}
          onLeafletClick={this.handleMapClick.bind(null,this)}
          onLeafletResize={this.handleResize.bind(null,this)}
          center={[this.props.map_settings.latitude,this.props.map_settings.longitude]}
          zoom={this.props.map_settings.zoom}
          maxBounds={this.props.map_settings.maxBounds}
          maxZoom={this.props.map_settings.maxZoom}
          minZoom={this.props.map_settings.minZoom} >


          <Control position="topright" className="mapbutton" >
              <button className="ui black button" onClick={this.handleChartButtonClick.bind(null,this)}>
                <i className={!this.props.charts.chart_visibility ? "bar chart icon" : "bar chart icon" }></i>
                {!this.props.charts.chart_visibility ? "Show Charts" : "Hide Charts" }
              </button>
        </Control>

        <ReactLeaflet.TileLayer
          attribution={this.state.attribution}
          url={this.state.tileUrl}
          onLeafletLoad={this.handleMapLoad.bind(null,this)}
        />

      <ESRITileMapLayer
       url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/Catchments/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="Catchments"
       min_zoom="12"
       onLeafletClick={this.handleMapClick.bind(null,this)}
       />
      <ESRITileMapLayer
       url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc12/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="HUC 12"
       min_zoom="9"
       onLeafletClick={this.handleMapClick.bind(null,this)}
       />
      <ESRITileMapLayer
       url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc8/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="Cataloging Units"
       min_zoom="8"
       onLeafletClick={this.handleMapClick.bind(null,this)}
       />
       <ESRITileMapLayer
        url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc6_outline/MapServer"
        setMapLayers={this.props.set_MapLayers}
        tileOpacity="0.5"
        name="River Basins"
        onLeafletClick={this.handleMapClick.bind(null,this)}
        />
        <ESRITileMapLayer
         url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/TRAS/MapServer"
         setMapLayers={this.props.set_MapLayers}
         tileOpacity="0.5"
         name="Targeted Resource Areas (TRA)"
         onLeafletClick={this.handleMapClick.bind(null,this)}
         />


    </ReactLeaflet.Map>
  }

  </div>
    );
  }
});

module.exports = MapContainer;
