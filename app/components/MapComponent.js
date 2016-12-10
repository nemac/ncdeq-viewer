var React = require('react');
var ReactLeaflet = require('react-leaflet')
import ESRIFeatureLayer from '../components/ESRIFeatureLayer';
import ESRITileMapLayer from '../components/ESRITiledMapLayer'
import ESRIBaseMap from '../components/ESRIBaseMap'
import Control from '../components/control';
import MapLayerToggleWrapper from '../components/MapLayerToggleWrapper'

//app constants
import {
  MAP_HEIGHT,
  DEF_PAD,
} from '../constants/appConstants';

import { HUC12_MAP_FEATUREID } from '../constants/actionConstants';

import { getCategoryName, getNextLevelName, getPrevLevelName, get_matchEnd, get_HUC} from '../utils/helpers';

var PropTypes = React.PropTypes;

var GeoJSON_Layers = {"huc8": null,
  "huc12": null,
  "tra": null,
  "catchment": null,
  "mappoint": null,};

var MapContainer = React.createClass({
  handleResize: function(){
    //leaflet map dosenot update size this forces the issue
    if(this.props.leafletMap){
      const leafletMap = this.props.leafletMap.leafletMap;
      setTimeout(function(){ leafletMap.invalidateSize(true)}, 200);
    };
  },
  handleChartButtonClick: function(comp,e){

    //toggle chart visibility with button click
    this.props.update_ChartVisiblity();
    this.props.update_MapHeight();

    //leaflet map dosenot update size this forces the issue
    if(this.props.leafletMap){
      const leafletMap = this.props.leafletMap.leafletMap;
      setTimeout(function(){ leafletMap.invalidateSize(true)}, 200);
    };
  },
  //get geojson symbology
  geoJSON_renderer: function(layer_name, method){
    let renderer = {};

    switch (layer_name) {
      case 'catchment':
        renderer = {
          fillColor :'#1C2833',
          stroke: true,
          weight: 20,
          opacity: 0.6,
          color: '#1C2833',
          fillOpacity: 0.25,
          zIndex: 100
        }
        break;

      case 'hover':
        if(method === 'chart hover tra'){
          renderer = {
            fillColor :'#FF0000',
            stroke: true,
            weight: 8,
            opacity: 0.2,
            color: '#FF0000',
            fillOpacity: 0.0,
            zIndex: 50
          }
        }  else {
          renderer = {
            fillColor :'#1F618D',
            stroke: true,
            weight: 8,
            opacity: 0.2,
            color: '#1F618D',
            fillOpacity: 0.25,
            zIndex: 0
          }
        }

        break;


      case 'tra':
        renderer = {
          fillColor :'#FF0000',
          stroke: true,
          weight: 8,
          opacity: 0.4,
          color: '#FF0000',
          fillOpacity: 0.0,
          zIndex: 50
        }
        break;

      case 'point':

        renderer = {}
        break;

      case 'huc8':
        renderer = {
          fillColor :'#FFFF00',
          stroke: true,
          weight: 8,
          opacity: 0.4,
          color: '#FFFF00',
          fillOpacity: 0.0,
          zIndex: 75
        }
        break;

      case 'huc12':
        renderer = {
          fillColor :'#1F618D',
          stroke: true,
          weight: 8,
          opacity: 0.6,
          color: '#1F618D',
          fillOpacity: 0.25,
          zIndex: 0
        }
        break;

      case 'HUC12':
        renderer = {
          fillColor :'#1F618D',
          stroke: true,
          weight: 8,
          opacity: 0.6,
          color: '#1F618D',
          fillOpacity: 0.25,
          zIndex: 0
        }
        break;

      case 'Cataloging Units':
        renderer = {
          fillColor :'#1F618D',
          stroke: true,
          weight: 8,
          opacity: 0.6,
          color: '#1F618D',
          fillOpacity: 0.1,
          zIndex: 0
        }
        break;

      case 'River Basins':
        renderer = {
          fillColor :'#1F618D',
          stroke: true,
          weight: 8,
          opacity: 0.6,
          color: '#1F618D',
          fillOpacity: 0.1,
          zIndex: 0
        }
        break;

      default:
        renderer = {
          fillColor :'red',
          stroke: true,
          weight: 8,
          opacity: 0.6,
          color: '#1F618D',
          fillOpacity: 0.25,
          zIndex: 0
        }
        break;
    };

    //return renderer symbology
    return renderer;
  },

  //remove the geosjon layer from GeoJSON_Layers object.
  //  this will update the layer toggle
  remove_GeoJSON_Layer_from_object: function(layer_name){

    Object.keys(GeoJSON_Layers).forEach(key => {
      if(key.toUpperCase() === layer_name.toUpperCase()){
        GeoJSON_Layers[key] = null
      }
    })

  },
  //remove geojson layer
  remove_GeoJSON_Layer: function(layer_name){

    //get the leaflet Map object
    const leafletMap = this.props.leafletMap.leafletMap;

    if(leafletMap){
      //get the  geojson_layers object from the current state
      const temp_geojson_layers = GeoJSON_Layers

      //get layer from state
      let map_layer = temp_geojson_layers[layer_name]

      //check if the layer has been added yes it is global varriable :)
      const isLayerVis = leafletMap.hasLayer(map_layer);

      //if a geojson layer has been added remove it.
      //  eventually we want to only remove when user elects too.
      if (isLayerVis){
        leafletMap.removeLayer(map_layer)
        this.remove_GeoJSON_Layer_from_object(layer_name)
      }
    }


  },
  //draw geojson layer
  add_GeoJSON_Layer: function(features, layer_name, do_zoom){

    const method = this.props.searchMethod;

    //get the leaflet Map object
    const leafletMap = this.props.leafletMap.leafletMap;

    // if(leafletMap){
      //get the  geojson_layers object from the current state
      const temp_geojson_layers = GeoJSON_Layers

      //get layer from state
      let map_layer = temp_geojson_layers[layer_name]

      //check if the layer has been added yes it is global varriable :)
      const isLayerVis = leafletMap.hasLayer(map_layer);

      //if a geojson layer has been added remove it.
      //  eventually we want to only remove when user elects too.
      if (isLayerVis){
        leafletMap.removeLayer(map_layer)
      }

      //add ta blank layer to leaflet
      map_layer = L.geoJson().addTo(leafletMap);

      //add the GeoJSON data to the layer
      map_layer.addData(features);

      //get render
      const renderer = this.geoJSON_renderer(layer_name, method);

      //zoom highlights need to move this to varriable
      map_layer.setStyle(renderer);

      //pan and zoom to bounds of layers bounds
      if(do_zoom){
        leafletMap.fitBounds(map_layer.getBounds());
      }

      //when geojson is added on top of map.  it also needs a map click handler enabled.
      this.add_GeoJSON_ClickEvent(map_layer);

      //update the geojson_layers object with new map layer
      temp_geojson_layers[layer_name] = map_layer

      //update the state with new geojson_layers object
      GeoJSON_Layers = {...GeoJSON_Layers, ...temp_geojson_layers}

      //return the layer
      return map_layer
    // }
    //
    // return null
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
  get_features: function(prop){
    const has_features = this.has_features(prop)
    if(has_features){
      // return prop.features.length > 0 ? prop.features : [];
      return prop.features
    }

    return []
  },
  get_property_id: function(features, name){
    if(features[0]){
      const value = features[0].properties[name]
      return value
    }

    return ''
  },
  has_features: function(prop){

    //check if the prop exists
    if(prop){
      //check if prop has properties
      if(prop.features){
        return true
      }
    }

    //prop does not exist for does not features.
    //  either way it does not have feature
    return false
  },

  shouldComponentUpdate: function(nextProps, nextState) {

    let should_update = true;

    //check status of rendering only re-render if not fetching something
    //  since I am doing some caclulations in render this forces render to only happen in rendering

    //status of fetching map
    if( nextProps.fetching_map ){
      should_update = true
    }

    //status of fetching chart
    if( nextProps.fetching_chart ){
      should_update = false
    }

    //status of fetching tra
    if( nextProps.fetching_tra){
      should_update = false
    }

    //status of fetching geograpy levels
    if( nextProps.fetching_geo){
      should_update = false
    }

    //status of fetching menus
    if( nextProps.fetching_menu){
      should_update = false
    }

    //return should update.
    return should_update

  },
  // componentWillMount: function() {
  //     this.props.use_imagery()
  // },
  componentWillUpdate: function(nextProps, nextState) {
    //leaflet map dose not update size this forces the issue
    let leafletMap
    if(nextProps.leafletMap){
      leafletMap = nextProps.leafletMap.leafletMap;
      if(leafletMap){
        leafletMap.invalidateSize(true)
      }
    };

    let level = this.getLevel();
    const method = nextProps.searchMethod;

    const imageryVisibility = nextProps.imagery_visibility ? nextProps.imagery_visibility : false;

    let on_layer
    var tile_layers = nextProps.map_settings.layers
    if(!imageryVisibility){

      if(leafletMap){

        on_layer = tile_layers.filter( tile_layer => {
          return tile_layer.name === 'imagery'
        })

        leafletMap.removeLayer(on_layer[0].layer)

        on_layer = tile_layers.filter( tile_layer => {
          return tile_layer.name === 'base map labels'
        })

        if(on_layer){
          leafletMap.addLayer(on_layer[0].layer)
        }

        on_layer = tile_layers.filter( tile_layer => {
          return tile_layer.name === 'base map'
        })

        if(on_layer){
          leafletMap.addLayer(on_layer[0].layer)
        }

      }

    } else {

      if(leafletMap){
        var tile_layers = nextProps.map_settings.layers

        on_layer = tile_layers.filter( tile_layer => {
          return tile_layer.name === 'base map labels'
        })

        leafletMap.removeLayer(on_layer[0].layer)

        on_layer = tile_layers.filter( tile_layer => {
          return tile_layer.name === 'base map'
        })

        leafletMap.removeLayer(on_layer[0].layer)

        const tile_layers = this.props.map_settings.layers
        on_layer = tile_layers.filter( tile_layer => {
          return tile_layer.name === 'imagery'
        })

        if(on_layer){
          leafletMap.addLayer(on_layer[0].layer)
        }

      }
    }

    //when menu change remove the point, catchment, and huc8
    if(method === 'menu'){
      this.remove_GeoJSON_Layer('point');
      this.remove_GeoJSON_Layer('catchment');
      this.remove_GeoJSON_Layer('huc8');
      this.remove_GeoJSON_Layer('huc12');
    }

      this.remove_GeoJSON_Layer('hover');

    //remove the menu selection when the geography layer does not match
    if(level != 'Cataloging Units'){
      this.remove_GeoJSON_Layer('Cataloging Units');
    }
    if(level != 'River Basins'){
      this.remove_GeoJSON_Layer('River Basins');
    }
    if(level != 'HUC12'){
      this.remove_GeoJSON_Layer('HUC12');
    }

  },
  componentDidUpdate: function(prevProps, prevState) {
    //check if there was a prevProps
    // need to functionise this.
    if (prevProps){

      let level = this.getLevel();
      const method = this.props.searchMethod;

      if( method.substring(0,11) === 'chart hover'){
        if(this.props.active_hover){

          const MAP_ID = this.props.active_hover.ID
          if(this.props.geometries){

            let has_features = this.has_features(this.props.geometries)
            if(has_features){
              const all_features = this.props.geometries.features;

              const map_feature = all_features.filter( feature => {
                return feature.properties.ID === MAP_ID
              })
              this.add_GeoJSON_Layer(map_feature, 'hover', false)
            }
          }
        }
        // if(this.props.geometries){
        //   let has_features = this.has_features(this.props.geometries)
        //   if(has_features){
        //     const all_features = this.props.geometries.features;
        //
        //     this.add_GeoJSON_Layer(current_mappoint_features, 'hover', false)
        //   }
        // }
      }

      //map point (location search or map click)
      // add a marker to the map click or map search
      if(method != 'menu'){

        if(prevProps.map_settings) {

          if(prevProps.map_settings.map_point) {
            //map_poin features
            const map_point_features_current = this.get_features(this.props.map_settings.map_point)
            const map_point_features_last = this.get_features(prevProps.map_settings.map_point)
          }

          let has_features = this.has_features(this.props.map_settings.map_point)
          if(has_features){
            const current_mappoint_features = this.props.map_settings.map_point.features;
            this.add_GeoJSON_Layer(current_mappoint_features, 'point', false)
          }

        }
      }
      //end map point (location search or map click)



      //start catchments and NLCD

        //catchments and NLCD features
        const catchment_features_current = this.get_features(this.props.NLCDPointInfo)
        const catchment_features_last = this.get_features(prevProps.NLCDPointInfo)

        //catchments and NLCD id's
          let catchment_id_curent = this.get_property_id(catchment_features_current, "ID")
          let catchment_id_last = this.get_property_id(catchment_features_last, "ID")

        // //check of current matches last id.
        //  only do add and do this if they have changed
        if(catchment_id_curent != catchment_id_last){
          //get nlcd data
          this.props.get_nlcd_data(catchment_id_curent, 2)

          //get catchment baseline data
          this.props.get_catchment_data(catchment_id_curent)

          //add geojson
          this.add_GeoJSON_Layer(catchment_features_current, 'catchment', false)
        }

        //if length of last feaures is 0 then last feature is different we will draw
        if(catchment_features_last && catchment_features_current){
          //make sure there is a feature in the array.  when searching outside of NorthCarolina
          //   this may return a blank features object.
          if(catchment_features_current[0]){
            if(catchment_features_last.length === 0){
              //add geojson
              this.add_GeoJSON_Layer(catchment_features_current, 'catchment', false)
            } else {
              //when the last features JSON and Current Features JSON do not match
              //  it is a new feature.  so we should select and zoom TRA's have lower case id need to change this in data and api
              if(catchment_id_curent != catchment_id_last){
                //add geojson
                this.add_GeoJSON_Layer(catchment_features_current, 'catchment', false)
              }
            }
          }
        }
      //end catchments and NLCD


      //start tra data
      //tra features
      const tra_features_current = this.get_features(this.props.traInfo)
      const tra_features_last = this.get_features(prevProps.traInfo)

      //tra id's
      const tra_id_curent = this.get_property_id(tra_features_current, "ID")
      const tra_id_last = this.get_property_id(tra_features_last, "ID")

      //in initial state there will not be an object we still need to zoom and get the data...
      if(tra_features_current && !tra_features_last){

        //add geojson
        this.add_GeoJSON_Layer(tra_features_current, 'tra', false)

      }
      //if length of last feaures is 0 then last feature is different we will draw
      if(tra_features_last && tra_features_current){
        //make sure there is a feature in the array.  when searching outside of NorthCarolina
        //   this may return a blank features object.
        if(tra_features_current[0]){
          if(tra_features_last.length === 0){
            //add geojson
            this.add_GeoJSON_Layer(tra_features_current, 'tra', false)
          } else {
            //when the last features JSON and Current Features JSON do not match
            //  it is a new feature.  so we should select and zoom TRA's have lower case id need to change this in data and api
            if(tra_id_curent != tra_id_last){
              //add geojson
              this.add_GeoJSON_Layer(tra_features_current, 'tra', false)
            }
          }
        }
      }

      if(level){
        if(level.toUpperCase() != 'HUC12' && method === "menu"){
          this.remove_GeoJSON_Layer('tra')
        }
      }
      //end tra data


      //start huc8 data
      //huc8 features
      let zoom = (method === 'menu') ? false : true

      const huc8_features_current = this.get_features(this.props.huc8Info)
      const huc8_features_last = this.get_features(prevProps.huc8Info)

      //huc8 id's
      const huc8_id_curent = this.get_property_id(huc8_features_current, "ID")
      const huc8_id_last = this.get_property_id(huc8_features_last, "ID")

      //in initial state there will not be an object we still need to zoom and get the data...
      if(huc8_features_current && !huc8_features_last){

        //add geojson
        this.add_GeoJSON_Layer(huc8_features_current, 'huc8', zoom)

      }
      //if length of last feaures is 0 then last feature is different we will draw
      if(huc8_features_last && huc8_features_current){
        //make sure there is a feature in the array.  when searching outside of NorthCarolina
        //   this may return a blank features object.
        if(huc8_features_current[0]){
          if(huc8_features_last.length === 0){
            //add geojson
            this.add_GeoJSON_Layer(huc8_features_current, 'huc8', zoom)
          } else {
            //when the last features JSON and Current Features JSON do not match
            //  it is a new feature.  so we should select and zoom TRA's have lower case id need to change this in data and api
            if(huc8_id_curent != huc8_id_last){
              //add geojson
              this.add_GeoJSON_Layer(huc8_features_current, 'huc8', zoom)
            }
          }
        }
      }
      //end huc8 data

      //start huc12 data
      //huc12 features
      const huc12_features_current = this.get_features(this.props.layerInfo)
      const huc12_features_last = this.get_features(prevProps.layerInfo)

      //huc12 id's
      const huc12_id_curent = this.get_property_id(huc12_features_current, "ID")
      const huc12_id_last = this.get_property_id(huc12_features_last, "ID")

      //when menu used force the selection on the map
      if(method === 'menu'){
        //add geojson
        this.add_GeoJSON_Layer(huc12_features_current, level, false)
      }
      //in initial state there will not be an object we still need to zoom and get the data...
      if(huc12_features_current && !huc12_features_last){

        //add geojson
        this.add_GeoJSON_Layer(huc12_features_current, level, false)

        //update menus
        this.updateFilters(huc12_features_current[0].properties.VALUE);

        //get ncld for huc12
        this.props.get_nlcd_data_huc12(huc12_features_current[0].properties.VALUE, 2)


      }
      //if length of last feaures is 0 then last feature is different we will draw
      if(huc12_features_last && huc12_features_current){
        //make sure there is a feature in the array.  when searching outside of NorthCarolina
        //   this may return a blank features object.
        if(huc12_features_current[0]){
          if(huc12_features_last.length === 0){
            //add geojson
            this.add_GeoJSON_Layer(huc12_features_current, level, false)

            //update menus
            this.updateFilters(huc12_features_current[0].properties.VALUE);

            //get ncld for huc12
            this.props.get_nlcd_data_huc12(huc12_features_current[0].properties.VALUE, 2)

          } else {
            //when the last features JSON and Current Features JSON do not match
            //  it is a new feature.  so we should select and zoom TRA's have lower case id need to change this in data and api
            if(huc12_id_curent != huc12_id_last){
              //add geojson
              this.add_GeoJSON_Layer(huc12_features_current, level, false)

              //update menus
              this.updateFilters(huc12_features_current[0].properties.VALUE);

              //get ncld for huc12
              this.props.get_nlcd_data_huc12(huc12_features_current[0].properties.VALUE, 2)
            }
          }
        }
      }
      //end huc12 data
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
          this.props.change_geographyLevelFilter(selectedValue, level)

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

    //set current geography level in redux state store
    this.props.change_geographyLevelActive("HUC12");

    //set search method
    this.props.set_search_method('clicked')

    //update header vis in action
    this.props.update_HeaderVis()

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


    //not sure yet ho to handle this but mapHeight needs to be adjusted by to px in the map component
    const mapHeight_adjustment = 10;
    const rowPadding = this.props.default_settings ? this.props.default_settings.rowPadding : DEF_PAD;
    const mapHght = this.props.default_settings ? this.props.default_settings.mapHeight-mapHeight_adjustment : MAP_HEIGHT-mapHeight_adjustment;
    const chartVisibility = this.props.chart ? this.props.chart.chart_visibility : null;

    const imageryVisibility = this.props.imagery_visibility ? this.props.imagery_visibility : false;

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
            <button className="ui black mini button" onClick={this.handleChartButtonClick.bind(null,this)} style={{width:"140px"}}>
              <i className={!this.props.charts.chart_visibility ? "bar chart icon" : "bar chart icon" }></i>
              {!this.props.charts.chart_visibility ? "Show Charts" : "Hide Charts" }
            </button>
          </Control>

          <Control position="bottomleft" className="mapbutton" >
            <button className="ui grey mini button" onClick={this.props.use_imagery} style={{width:"140px"}}>
              <i className={imageryVisibility ? "map outline icon" : "file image outline icon" }></i>
              {imageryVisibility ? "Show Map" : "Show Satellite" }
            </button>
          </Control>


        <Control position="topright" className="mapbutton" >
          <MapLayerToggleWrapper map_settings={this.props.map_settings} leafletMap={this.props.leafletMap} geojson_layers={GeoJSON_Layers}/>
        </Control>


          <ESRITileMapLayer
            z_Index={0}
            setMapLayers={this.props.set_MapLayers}
            name="imagery"
            url={"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"}
            onLeafletLoad={this.handleMapLoad.bind(null,this)}
            onLeafletClick={this.handleMapClick.bind(null,this)}
            />

          <ESRITileMapLayer
            z_Index={2}
            setMapLayers={this.props.set_MapLayers}
            name="base map labels"
            min_zoom={"8"}
            url={"https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"}
            onLeafletLoad={this.handleMapLoad.bind(null,this)}
            onLeafletClick={this.handleMapClick.bind(null,this)}
            />

          <ESRITileMapLayer
            z_Index={1}
            setMapLayers={this.props.set_MapLayers}
            name="base map"
            url={"https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"}
            onLeafletLoad={this.handleMapLoad.bind(null,this)}
            onLeafletClick={this.handleMapClick.bind(null,this)}
            />


      {/*
        <ReactLeaflet.TileLayer
          attribution={this.state.attribution}
          url={this.state.tileUrl}
          onLeafletLoad={this.handleMapLoad.bind(null,this)}
        />
     <ESRITileMapLayer
      url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer"
      setMapLayers={this.props.set_MapLayers}
      tileOpacity="1"
      name="Imagery"
      onLeafletClick={this.handleMapClick.bind(null,this)}
      onLeafletLoad={this.handleMapLoad.bind(null,this)}
      />
      */}

      <ESRITileMapLayer
       url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/Catchments/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="Catchments Base Map"
       min_zoom="12"
       onLeafletClick={this.handleMapClick.bind(null,this)}
       z_Index={3}
       />
      <ESRITileMapLayer
       url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc12/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="HUC 12 Base Map"
       min_zoom="9"
       onLeafletClick={this.handleMapClick.bind(null,this)}
       z_Index={4}
       />
      <ESRITileMapLayer
       url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc8/MapServer"
       setMapLayers={this.props.set_MapLayers}
       name="Cataloging Units Base Map"
       min_zoom="8"
       onLeafletClick={this.handleMapClick.bind(null,this)}
       z_Index={5}
       />
       <ESRITileMapLayer
        url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/huc6_outline/MapServer"
        setMapLayers={this.props.set_MapLayers}
        tileOpacity="0.5"
        name="River Basins Base Map"
        onLeafletClick={this.handleMapClick.bind(null,this)}
        z_Index={6}
        />
        <ESRITileMapLayer
         url="https://tiles.arcgis.com/tiles/PwLrOgCfU0cYShcG/arcgis/rest/services/TRAS/MapServer"
         setMapLayers={this.props.set_MapLayers}
         tileOpacity="0.5"
         name="Targeted Resource Areas (TRA) Base Map"
         onLeafletClick={this.handleMapClick.bind(null,this)}
         z_Index={7}
         />




         {/*

         <ESRITileMapLayer
          url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer"
          setMapLayers={this.props.set_MapLayers}
          tileOpacity="1"
          name="BaseMap"
          onLeafletClick={this.handleMapClick.bind(null,this)}
          onLeafletLoad={this.handleMapLoad.bind(null,this)}
          />
          <ESRITileMapLayer
           url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer"
           setMapLayers={this.props.set_MapLayers}
           tileOpacity="1"
           name="BaseMap ref"
           min_zoom="8"
           onLeafletClick={this.handleMapClick.bind(null,this)}
           onLeafletLoad={this.handleMapLoad.bind(null,this)}
           />

           */}
    </ReactLeaflet.Map>
  }

  </div>
    );
  }
});

module.exports = MapContainer;
