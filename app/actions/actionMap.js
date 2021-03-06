var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, HUC12_MAP_FEATUREID, FEATURE_SERVICE_NAME, TRA_FEATUREID,
        CATALOGING_MAP_FEATUREID, NLCD_CATCHMENT_FEATUREID, BASIN_MAP_FEATUREID } from '../constants/actionConstants';
var turf_point = require('turf-point');
var turf_FC = require('turf-featurecollection');

import * as ActionTRA from './actionTRA'
export const ago_get_traxwalk_by_id = ActionTRA.ago_get_traxwalk_by_id;
export const ago_get_tra_geom_by_ids = ActionTRA.ago_get_tra_geom_by_ids;

//set base URL for axios
axios.defaults.baseURL = AGO_URL;


import {
  NORTH_EAST_LATITUDE,
  NORTH_EAST_LONGITUDE,
  SOUTH_WEST_LATITUDE,
  SOUTH_WEST_LONGITUDE,
  START_LATITUDE,
  START_LONGITUDE,
  START_ZOOM,
  MIN_ZOOM,
  MAX_ZOOM,
} from '../constants/appConstants'

//basic map (leaflet state and functions)


function parseLatLng(value) {
  // Attempt to parse a latlng in this string.
  var split = value.split(',');
  if (split.length == 2) {
    // Remove whitespaces from start and end, but nowhere else.
    // Use Number() instead of parseFloat() to parse strictly only numbers.
    // These avoid things like "7 High St, 2GB UK" => (7,2)
    var lat = +split[0];
    var lng = +split[1];
    if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      return new google.maps.LatLng(lat, lng);
    }
  }
  return null;
};


///get feature attributes for a layer at lat & long
function get_sub_length(length_of_id){
    switch (length_of_id) {
      case 12:
        return 8
        break;
      case 8:
        return 6
        break;
      case 6:
        return 6
        break;
      default:
        return 8
        break;
    }
}

///get feature attributes for a layer at lat & long
function get_feature_layerid(length_of_id){
    switch (length_of_id) {
      case 12:
        return HUC12_MAP_FEATUREID
        break;
      case 8:
        return HUC12_MAP_FEATUREID
        break;
      case 6:
        return CATALOGING_MAP_FEATUREID
        break;
      default:
        return HUC12_MAP_FEATUREID
        break;

    }
}

///get feature attributes for a layer at lat & long
function get_feature_huc(length_of_id){
    switch (length_of_id) {
      case 12:
        return 'Cataloging Units'
        break;
      case 8:
        return 'Cataloging Units'
        break;
      case 6:
        return 'River Basins'
        break;
      default:
        return 'HUC12'
        break;
    }
}

function AGO_get_geometry_for_all(search_value, search_layer_id){

  var value_field_name = 'VALUE';

  //until I can change the TRA data to match the schemas of the huc files I need to change the field name from vaue to id.
  if(search_layer_id === TRA_FEATUREID){
    value_field_name = 'ID'
  }


  const query_URL = '/' + FEATURE_SERVICE_NAME + '/FeatureServer/' + search_layer_id + '/query' +
                    '?where=' + value_field_name + '+like+%27' + search_value + '%25%27' +
                    '&objectIds=' +
                    '&time=' +
                    '&resultType=standard' +
                    '&distance=' +
                    '&units=esriSRUnit_Meter' +
                    '&outFields=*' +
                    '&returnGeometry=true' +
                    '&returnCentroid=true' +
                    '&multipatchOption=xyFootprint' +
                    '&maxAllowableOffset=' +
                    '&geometryPrecision=' +
                    '&outSR=4326' +
                    '&returnIdsOnly=false' +
                    '&returnCountOnly=false' +
                    '&returnExtentOnly=false' +
                    '&returnDistinctValues=true' +
                    '&orderByFields=' +
                    '&groupByFieldsForStatistics=' +
                    '&outStatistics=' +
                    '&resultOffset=' +
                    '&resultRecordCount=' +
                    '&returnZ=false' +
                    '&returnM=false' +
                    '&quantizationParameters=' +
                    '&sqlFormat=none' +
                    '&f=pgeojson' +
                    '&token='

  return axios.get(query_URL);
};

///get feature attributes for a layer at lat & long
function AGO_get_LayerInfo_ByValue(value, layer_id){
  var value_field_name = 'VALUE';

  //until I can change the TRA data to match the schemas of the huc files I need to change the field name from vaue to id.
  if(layer_id === TRA_FEATUREID){
    value_field_name = 'ID'
  }

  const query_URL = '/' + FEATURE_SERVICE_NAME + '/FeatureServer/' + layer_id + '/query' +
                    '?where=' + value_field_name + '+%3D+%27' + value + '%27' +
                    '&objectIds=' +
                    '&time=' +
                    '&resultType=standard' +
                    '&distance=' +
                    '&units=esriSRUnit_Meter' +
                    '&outFields=*' +
                    '&returnGeometry=true' +
                    '&returnCentroid=true' +
                    '&multipatchOption=xyFootprint' +
                    '&maxAllowableOffset=' +
                    '&geometryPrecision=' +
                    '&outSR=4326' +
                    '&returnIdsOnly=false' +
                    '&returnCountOnly=false' +
                    '&returnExtentOnly=false' +
                    '&returnDistinctValues=true' +
                    '&orderByFields=' +
                    '&groupByFieldsForStatistics=' +
                    '&outStatistics=' +
                    '&resultOffset=' +
                    '&resultRecordCount=' +
                    '&returnZ=false' +
                    '&returnM=false' +
                    '&quantizationParameters=' +
                    '&sqlFormat=none' +
                    '&f=pgeojson' +
                    '&token='

  return axios.get(query_URL);
};

///get feature attributes for a layer at lat & long
function AGO_get_LayerInfo_ByPoint(lat, long, layer_id){
  const query_URL = '/' + FEATURE_SERVICE_NAME + '/FeatureServer/' + layer_id + '/query' +
                    '?where=' +
                    '&objectIds=' +
                    '&time=' +
                    '&geometry=%7Bx%3A+'+long+'%2C+y%3A+'+lat+'%7D' +
                    '&geometryType=esriGeometryPoint' +
                    '&multipatchOption=xyFootprint' +
                    '&returnGeodetic=false' +
                    '&inSR=4326' +
                    '&spatialRel=esriSpatialRelIntersects' +
                    '&resultType=none' +
                    '&distance=0.0' +
                    '&units=esriSRUnit_Meter' +
                    '&outFields=*' +
                    '&returnGeometry=true' +
                    '&returnCentroid=true' +
                    '&maxAllowableOffset=' +
                    '&geometryPrecision=' +
                    '&outSR=4326' +
                    '&returnIdsOnly=false' +
                    '&returnCountOnly=false' +
                    '&returnExtentOnly=false' +
                    '&returnDistinctValues=true' +
                    '&orderByFields=' +
                    '&groupByFieldsForStatistics=' +
                    '&outStatistics=' +
                    '&resultOffset=' +
                    '&resultRecordCount=' +
                    '&returnZ=false' +
                    '&returnM=false' +
                    '&quantizationParameters=' +
                    '&sqlFormat=none' +
                    '&f=pgeojson' +
                    '&token='

  return axios.get(query_URL);
};

export function get_all_geometries(value){

  return (dispatch, getState) => {
    //start fetching state (set to true)
    dispatch(fetching_start())

    const state = getState()

    const length_of_id = value.length
    const end_length = get_sub_length(length_of_id)
    const search_layer_id = get_feature_layerid(length_of_id)
    const current_geography_level = get_feature_huc(length_of_id)
    const search_value = value.substring(0, end_length)

    axios.all([AGO_get_geometry_for_all(search_value, search_layer_id),ago_get_traxwalk_by_id(search_value, current_geography_level)])
      .then(axios.spread( (huc_response, tra_xwalk_response) => {

        //get redux state
        const state = getState()

       //check repsonses for errors
       const current_geometries_huc = CheckReponse(huc_response,'AGO_API_ERROR');
       const tra_xwalk = CheckReponse(tra_xwalk_response,'AGO_API_ERROR');

       //walk the tra features and get the tra data.
       const tras = tra_xwalk.features.map( trax_feature => {
         return trax_feature.properties.TRA_Name
       })

       const tralist = "'" + tras.join("','") + "'";

       axios.all([ago_get_tra_geom_by_ids(tralist)])
       .then(axios.spread( (tra_response) => {

         const current_geometries_tra= CheckReponse(tra_response,'AGO_API_ERROR');
         let feat1 = current_geometries_huc.features
         let feat2 = current_geometries_tra.features

         //merge the features for tra's and hucs
         feat1 = feat1.concat(feat2);
         const current_geometries = turf_FC(feat1);

        dispatch(geometries('GET_GEOMETRIES', current_geometries));

       }))
      //  .catch(error => {
      //    //end fetching set fetching state to false
      //    dispatch(fetching_end())
       //
      //    console.log('request failed', error);
      //  });
       //

    }))
    //  .catch(error => {
    //    //end fetching set fetching state to false
    //    dispatch(fetching_end())
     //
    //    console.log('request failed', error);
    //  });

    //end fetching set fetching state to false
    dispatch(fetching_end())
  }
}

export function set_search_method(method){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    // dispatch(fetching_start())

    const state = getState()


    const searchMethod = method;

    //create map config object
    const mapConfig = {...state.mapConfig.mapconfig, searchMethod};

    dispatch(mapSate('SET_SEARCH_METHOD',mapConfig));

    //end fetching set fetching state to false
    // dispatch(fetching_end())
  }
}
export function set_active_hover (ID, GEOGRAPHY_LEVEL, DATE_SENT){
    return (dispatch, getState) => {
      //start fetching state (set to true)
      // dispatch(fetching_start())

      //get redux state
      const state = getState()


      let prev_date

      if(state.current_active_hover){
        prev_date = state.current_active_hover.DATE_SENT
      }

      if(DATE_SENT > prev_date){return null}

      const current_active_hover = {ID,GEOGRAPHY_LEVEL,DATE_SENT}

      //send active_function setting on
      dispatch(active_hover('SET_ACTIVE_HOVER', current_active_hover ))

      //end fetching set fetching state to false
      // dispatch(fetching_end())

    }
}

export function get_LayerGeom_ByValue(value, layer_id){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    // dispatch(fetching_start())

    if(!value){
      //get redux state
      const state = getState()


      const hoverInfo = [];

      //create map config object
      const mapConfig = {...state.mapConfig.mapconfig, hoverInfo};

      dispatch(mapSate('MAP_GET_HOVER_INFO',mapConfig));
      return
    }

    axios.all([AGO_get_LayerInfo_ByValue(value, layer_id)])
    .then(axios.spread(function (huc_response) {

        //check repsonses for errors
        const theHoverInfo = CheckReponse(huc_response,'AGO_API_ERROR');

        //get redux state
        const state = getState()


        const hoverInfo = theHoverInfo;

        //create map config object
        const mapConfig = {...state.mapConfig.mapconfig, hoverInfo};

        dispatch(mapSate('MAP_GET_HOVER_INFO',mapConfig));

        //end fetching set fetching state to false
        // dispatch(fetching_end())

    }))
    // .catch(error => {
    //   //end fetching set fetching state to false
    //   // dispatch(fetching_end())
    //
    //   console.log('request failed', error);
    // });
  }
}
export function get_LayerInfo_ByValue(value, layer_id){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    dispatch(fetching_start())

    const state = getState()


    axios.all([AGO_get_LayerInfo_ByValue(value, layer_id), AGO_get_LayerInfo_ByValue(value.substring(0,8), CATALOGING_MAP_FEATUREID)])
    .then(axios.spread(function (huc_response, cu_response) {

        //check repsonses for errors
        const theCatalogingUnitInfo = CheckReponse(cu_response,'AGO_API_ERROR');

        const theLayerInfo = CheckReponse(huc_response,'AGO_API_ERROR');

        //get redux state
        const state = getState()


        const layerInfo = theLayerInfo;
        const huc8Info = theCatalogingUnitInfo;

        //create map config object
        const mapConfig = {...state.mapConfig.mapconfig, layerInfo, huc8Info};

        dispatch(mapSate('MAP_GET_LAYER_INFO',mapConfig));

        //end fetching set fetching state to false
        dispatch(fetching_end())

    }))
    // .catch(error => {
    //   //end fetching set fetching state to false
    //   dispatch(fetching_end())
    //
    //   console.log('request failed', error);
    // });
  }
}

export function get_LayerInfo_ByPoint(lat, lng, layer_id){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    dispatch(fetching_start())

    const state = getState()


    axios.all([AGO_get_LayerInfo_ByPoint(lat, lng, layer_id), AGO_get_LayerInfo_ByPoint(lat, lng, TRA_FEATUREID),AGO_get_LayerInfo_ByPoint(lat, lng, CATALOGING_MAP_FEATUREID),AGO_get_LayerInfo_ByPoint(lat, lng, NLCD_CATCHMENT_FEATUREID)])
    .then(axios.spread(function (huc_response, tra_response, cu_response, NLCD_response) {

      //check repsonses for NLCD errors
      const theNLCDPointInfo = CheckReponse(NLCD_response,'AGO_API_ERROR')

      //check repsonses for TRA errors
      const thetraPointInfo = CheckReponse(tra_response,'AGO_API_ERROR');

      //check repsonses for errors
      const theLayerInfo = CheckReponse(huc_response,'AGO_API_ERROR');

      //check repsonses for CU errors
      const theCatalogingUnitInfo = CheckReponse(cu_response,'AGO_API_ERROR');

      //get redux state
      const state = getState()


      var turfPoint = turf_point([lng,lat]);
      var turfPointfc = turf_FC(turfPoint);

      const layerInfo = theLayerInfo;
      const traPointInfo = thetraPointInfo;
      const NLCDPointInfo = theNLCDPointInfo;
      const huc8Info = theCatalogingUnitInfo;
      const map_point = turfPointfc

      //create map config object
      const mapConfig = {...state.mapConfig.mapconfig, layerInfo, traPointInfo, NLCDPointInfo, huc8Info, map_point };

      dispatch(mapSate('MAP_GET_LAYER_INFO', mapConfig));

      //end fetching set fetching state to false
      dispatch(fetching_end())

    }))
    // .catch(error => {
    //   //end fetching set fetching state to false
    //   dispatch(fetching_end())
    //
    //   console.log('request failed', error);
    // });
  }
}

export function set_MapLayers(mapLayers){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    dispatch(fetching_start())

    //get redux state
    const state = getState()

    //get array of current layers or new array if there is no lyers
    let CurrentLayers =  state.mapConfig.mapconfig.layers.length === 0 ? new Array() : state.mapConfig.mapconfig.layers;

    //add new layer to array
    CurrentLayers.push(mapLayers)

    const layers = CurrentLayers

    //create map config object
    const mapConfig = {...state.mapConfig.mapconfig, layers};

    dispatch(mapSate('MAP_SET_LAYERS',mapConfig));

    //end fetching set fetching state to false
    dispatch(fetching_end())

  }
}
export function set_mapToPoint(lat,lng,z,e){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    dispatch(fetching_start())

    //get redux state
    const state = getState()


    const latitude = lat;
    const longitude = lng;
    const zoom =  z;

    //create map config object
    const mapConfig = {...state.mapConfig.mapconfig, latitude, longitude, zoom};

    dispatch(mapSate('MAP_TO_POINT',mapConfig));

    //end fetching set fetching state to false
    dispatch(fetching_end())

  }
}

export function HandleMapEnd(mapComp,e){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    dispatch(fetching_start())

    //get redux state
    const state = getState()


    //requires leaftlet to be installed.
    var L = mapComp.refs.map.leafletElement
    var center = L.getCenter();

    const latitude = center.lat;
    const longitude = center.lng;
    const zoom =  L.getZoom();

    //create map config object
    const mapConfig = {...state.mapConfig.mapconfig, latitude, longitude, zoom};

    //send map config data on to store
    dispatch(mapSate('MAP_END',mapConfig));

    //end fetching set fetching state to false
    dispatch(fetching_end())

  }
}
export function get_defaultMapData(zoom){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    dispatch(fetching_start())

    //get redux state
    const state = getState()


    //requires leaftlet to be installed.
    var southWest = L.latLng(SOUTH_WEST_LATITUDE, SOUTH_WEST_LONGITUDE),
    northEast = L.latLng(NORTH_EAST_LATITUDE, NORTH_EAST_LONGITUDE),
    bounds = L.latLngBounds(southWest, northEast);

    //set default map settings form constants in ../constants/appConstants.js
    const latitude = START_LATITUDE;
    const longitude = START_LONGITUDE;
    const zoom = START_ZOOM;
    const minZoom = MIN_ZOOM;
    const maxZoom = MAX_ZOOM;
    const maxBounds = bounds;
    const layers = [];
    const layerInfo = {};
    const traPointInfo = {};
    const NLCDPointInfo = {};
    const huc8Info = {};
    const searchMethod = "none"
    const traInfo =  {};
    const map_point = {};
    const hoverInfo = {};

    //create new map config
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds, layerInfo, traPointInfo, NLCDPointInfo, traInfo, huc8Info, searchMethod, map_point, hoverInfo};

    //send map config data on to store
    dispatch(mapSate('MAP_DATA',mapConfig));

    //end fetching set fetching state to false
    dispatch(fetching_end())

  }
};

//handle search with google api.
//  requires comp which is needed for binding of this
//           e which is the this or the dom element to add the seach and search Autocomplete too
export function handleSearchChange(comp,e){
  return (dispatch, getState) => {

    //start fetching state (set to true)
    dispatch(fetching_start())


    //get redux state
    const state = getState()

    //get the input dom element
    var input = e.target;

    var lat
    var lng

    const latlong = parseLatLng(input.value)

    if(!latlong){

      //get max bounds from constants for google search limits - prefrence.
      const northEastLatitude = NORTH_EAST_LATITUDE
      const northEastlongitude = NORTH_EAST_LONGITUDE
      const southWestLatitude = SOUTH_WEST_LATITUDE
      const southWestlongitude = SOUTH_WEST_LONGITUDE

      //search google api default bounds in latitude.
      //  this will push all locations in the searh results to the top of the Autocomplete list
      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(northEastLatitude, northEastlongitude),
        new google.maps.LatLng(southWestLatitude, southWestlongitude));

        //set the bounds to the optopns
        var options = {strictbounds: defaultBounds}

        //get this so we can access in within google maps callback
        var self = this;

        //instatiate a new google maps search box api
        var ac = new google.maps.places.SearchBox(input,options);

        //google search callback
        google.maps.event.addListener(ac, 'places_changed', () => {

          //instatiate the results object with the results of the search
          var place = ac.getPlaces()[0];

          //if none go ahead and stop and return null
          //  but first try to do a lat long search
          if (!place.geometry) return


            //instatiate the address object to a varrable so we can parse the location
            //  in latitude and longitude
            if (!place.address_components){
              input.value = place.formatted_address
            }

            //get lat, long of user location
            lat = place.geometry.location.lat();
            lng = place.geometry.location.lng();

            var turfPoint = turf_point([lng,lat]);
            var turfPointfc = turf_FC(turfPoint);

            //retreive the layerinfo object (huc12) at the google api places lat long
            axios.all([AGO_get_LayerInfo_ByPoint(lat, lng, HUC12_MAP_FEATUREID), AGO_get_LayerInfo_ByPoint(lat, lng, TRA_FEATUREID),AGO_get_LayerInfo_ByPoint(lat, lng, CATALOGING_MAP_FEATUREID),AGO_get_LayerInfo_ByPoint(lat, lng, NLCD_CATCHMENT_FEATUREID)])
            .then(axios.spread(function (huc_response, tra_response, cu_response, NLCD_response) {

              //check repsonses for NLCD errors
              const theNLCDPointInfo = CheckReponse(NLCD_response,'AGO_API_ERROR')

              const thetraPointInfo = CheckReponse(tra_response,'AGO_API_ERROR');

              //check repsonses for errors
              const theLayerInfo = CheckReponse(huc_response,'AGO_API_ERROR');

              const theCatalogingUnitInfo = CheckReponse(cu_response,'AGO_API_ERROR');

              //NOT THE CLEANIST but works need to understand how to call set_mapToPoint from here
              //set store to new lat,long and zoom level
              //will need to add ability to detect the huc's this point falls in
              //get redux state

              const layerInfo = theLayerInfo;
              const traPointInfo = thetraPointInfo;
              const NLCDPointInfo = theNLCDPointInfo;
              const huc8Info = theCatalogingUnitInfo;
              const map_point = turfPointfc

              //create map config object
              const mapConfig = {...state.mapConfig.mapconfig, layerInfo, traPointInfo, NLCDPointInfo, huc8Info, map_point };

              dispatch(mapSate('MAP_SEARCH',mapConfig));

              //end fetching set fetching state to false
              dispatch(fetching_end())
              return
            }))

        });

    } else {
      //get lat, long of user location
      lat = latlong.lat();
      lng = latlong.lng();

      var turfPoint = turf_point([lng,lat]);
      var turfPointfc = turf_FC(turfPoint);

      //retreive the layerinfo object (huc12) at the google api places lat long
      axios.all([AGO_get_LayerInfo_ByPoint(lat, lng, HUC12_MAP_FEATUREID), AGO_get_LayerInfo_ByPoint(lat, lng, TRA_FEATUREID),AGO_get_LayerInfo_ByPoint(lat, lng, CATALOGING_MAP_FEATUREID),AGO_get_LayerInfo_ByPoint(lat, lng, NLCD_CATCHMENT_FEATUREID)])
      .then(axios.spread(function (huc_response, tra_response, cu_response, NLCD_response) {

        //check repsonses for NLCD errors
        const theNLCDPointInfo = CheckReponse(NLCD_response,'AGO_API_ERROR')

        const thetraPointInfo = CheckReponse(tra_response,'AGO_API_ERROR');

        //check repsonses for errors
        const theLayerInfo = CheckReponse(huc_response,'AGO_API_ERROR');

        const theCatalogingUnitInfo = CheckReponse(cu_response,'AGO_API_ERROR');

        //NOT THE CLEANIST but works need to understand how to call set_mapToPoint from here
        //set store to new lat,long and zoom level
        //will need to add ability to detect the huc's this point falls in
        //get redux state

        const layerInfo = theLayerInfo;
        const traPointInfo = thetraPointInfo;
        const NLCDPointInfo = theNLCDPointInfo;
        const huc8Info = theCatalogingUnitInfo;
        const map_point = turfPointfc

        //create map config object
        const mapConfig = {...state.mapConfig.mapconfig, layerInfo, traPointInfo, NLCDPointInfo, huc8Info, map_point };

        dispatch(mapSate('MAP_SEARCH',mapConfig));

        //end fetching set fetching state to false
        dispatch(fetching_end())
        return
      }))
    }
  }
}

  //this is for chart clicks and highlighting on map
  export function get_tra_info(id){
    return (dispatch, getState) => {

      //start fetching state (set to true)
      dispatch(fetching_start())

      //get redux state
      const state = getState()


      AGO_get_LayerInfo_ByValue(id, TRA_FEATUREID)
      .then( tra_response => {

        const theTraInfo = CheckReponse(tra_response,'AGO_API_ERROR');
        const traInfo = theTraInfo;

        //create map config object
        const mapConfig = {...state.mapConfig.mapconfig, traInfo};

        dispatch(mapSate('TRA_GEOMETRY',mapConfig));

        //end fetching set fetching state to false
        dispatch(fetching_end())

      })
    }
  }

function fetching_start(){
  return {type: "FETCHING_MAP", fetching: true}
}

function fetching_end(){
  return {type: "FETCHING_MAP", fetching: false}
}

function geometries(type, data){
  return {type: type, geometries: data, receivedAt: Date.now()}
}

function active_hover(type, data){
  return {type: type, active_hover: data, receivedAt: Date.now()}
}

function hover(type,data){
  return {
    type: type,
    mapconfig: data,
    receivedAt: Date.now()
  }
}
//new map state object to pass to reducer
function mapSate(type,data) {
  return {
    type: type,
    mapconfig: data,
    receivedAt: Date.now()
  }
};
