var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, HUC12_MAP_FEATUREID } from '../constants/actionConstants';

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
  MAX_SEARCH_ZOOM,
} from '../constants/appConstants'

//basic map (leaflet state and functions)

///get feature attributes for a layer at lat & long
function AGO_get_LayerInfo_ByValue(value, layer_id){

  const query_URL = '/RDRBP/FeatureServer/' + layer_id + '/query' +
                    '?where=VALUE+%3D+%27' + value + '%27' +
                    '&objectIds=' +
                    '&time=' +
                    '&resultType=standard' +
                    '&distance=' +
                    '&units=esriSRUnit_Meter' +
                    '&outFields=*' +
                    '&returnGeometry=true' +
                    '&returnCentroid=true' +
                    '&multipatchOption=' +
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

  const query_URL = '/RDRBP/FeatureServer/' + layer_id + '/query' +
                    '?where=' +
                    '&objectIds=' +
                    '&time=' +
                    '&geometry=%7Bx%3A+'+long+'%2C+y%3A+'+lat+'%7D' +
                    '&geometryType=esriGeometryPoint' +
                    '&inSR=4326' +
                    '&spatialRel=esriSpatialRelIntersects' +
                    '&resultType=standard' +
                    '&distance=' +
                    '&units=esriSRUnit_Meter' +
                    '&outFields=*' +
                    '&returnGeometry=true' +
                    '&returnCentroid=true' +
                    '&multipatchOption=' +
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

export function get_LayerInfo_ByValue(value, layer_id){
  return (dispatch, getState) => {
    AGO_get_LayerInfo_ByValue(value, layer_id)
      .then(function test(response){
        //check repsonses for errors
        const theLayerInfo = CheckReponse(response,'AGO_API_ERROR');

        //get redux state
        const state = getState()

        const latitude = state.mapConfig.mapconfig.latitude;
        const longitude = state.mapConfig.mapconfig.longitude;
        const zoom =  state.mapConfig.mapconfig.zoom;
        const minZoom = state.mapConfig.mapconfig.minZoom;
        const maxZoom =  state.mapConfig.mapconfig.maxZoom;
        const maxBounds = state.mapConfig.mapconfig.maxBounds;
        const layers = state.mapConfig.mapconfig.layers;
        const layerInfo = theLayerInfo;

        //create map config object
        const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds, layerInfo};

        dispatch(mapSate('MAP_GET_LAYER_INFO',mapConfig));
    })



  }
}

export function get_LayerInfo_ByPoint(lat, lng, layer_id){
  return (dispatch, getState) => {

    AGO_get_LayerInfo_ByPoint(lat, lng, layer_id)
      .then(function test(response){

        //check repsonses for errors
        const theLayerInfo = CheckReponse(response,'AGO_API_ERROR');
        //get redux state
        const state = getState()

        const latitude = state.mapConfig.mapconfig.latitude;
        const longitude = state.mapConfig.mapconfig.longitude;
        const zoom =  state.mapConfig.mapconfig.zoom;
        const minZoom = state.mapConfig.mapconfig.minZoom;
        const maxZoom =  state.mapConfig.mapconfig.maxZoom;
        const maxBounds = state.mapConfig.mapconfig.maxBounds;
        const layers = state.mapConfig.mapconfig.layers;
        const layerInfo = theLayerInfo;

        //create map config object
        const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds, layerInfo};

        dispatch(mapSate('MAP_GET_LAYER_INFO',mapConfig));

    })



  }
}

export function set_MapLayers(mapLayers){
  return (dispatch, getState) => {

    //get redux state
    const state = getState()

    //get array of current layers or new array if there is no lyers
    let CurrentLayers =  state.mapConfig.mapconfig.layers.length === 0 ? new Array() : state.mapConfig.mapconfig.layers;

    //add new layer to array
    CurrentLayers.push(mapLayers)

    const latitude = state.mapConfig.mapconfig.latitude;
    const longitude = state.mapConfig.mapconfig.longitude;
    const zoom =  state.mapConfig.mapconfig.zoom;
    const minZoom = state.mapConfig.mapconfig.minZoom;
    const maxZoom =  state.mapConfig.mapconfig.maxZoom;
    const maxBounds = state.mapConfig.mapconfig.maxBounds;
    const layers = CurrentLayers
    const layerInfo = state.mapConfig.layerinfo

    //create map config object
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds, layerInfo};

    dispatch(mapSate('MAP_SET_LAYERS',mapConfig));

  }
}
export function set_mapToPoint(lat,lng,z,e){
  return (dispatch, getState) => {

    //get redux state
    const state = getState()

    const latitude = lat;
    const longitude = lng;
    const zoom =  z;
    const minZoom = state.mapConfig.mapconfig.minZoom;
    const maxZoom =  state.mapConfig.mapconfig.maxZoom;
    const maxBounds = state.mapConfig.mapconfig.maxBounds;
    const layers = state.mapConfig.mapconfig.layers;
    const layerInfo = state.mapConfig.layerinfo

    //create map config object
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds, layerInfo};

    dispatch(mapSate('MAP_TO_POINT',mapConfig));

  }
}

export function HandleMapEnd(mapComp,e){
  return (dispatch, getState) => {

    //get redux state
    const state = getState()

    //requires leaftlet to be installed.
    var L = mapComp.refs.map.leafletElement
    var center = L.getCenter();

    const latitude = center.lat;
    const longitude = center.lng;
    const zoom =  L.getZoom();
    const minZoom = state.mapConfig.mapconfig.minZoom;
    const maxZoom =  state.mapConfig.mapconfig.maxZoom;
    const maxBounds = state.mapConfig.mapconfig.maxBounds;
    const layers = state.mapConfig.mapconfig.layers;
    const layerInfo = state.mapConfig.layerinfo;

    //create map config object
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds, layerInfo};

    //send map config data on to store
    dispatch(mapSate('MAP_END',mapConfig));
  }
}
export function get_defaultMapData(zoom){
  return (dispatch, getState) => {

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

    //create new map config
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds, layerInfo};

    //send map config data on to store
    dispatch(mapSate('MAP_DATA',mapConfig));
  }
};

//handle search with google api.
//  requires comp which is needed for binding of this
//           e which is the this or the dom element to add the seach and search Autocomplete too
export function handleSearchChange(comp,e){
  return (dispatch, getState) => {
    //get redux state
    const state = getState()

    //get the input dom element
    var input = e.target;

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
      var options = {bounds: defaultBounds}

      //get this so we can access in within google maps callback
      var self = this;

      //instatiate a new google maps search box api
      var ac = new google.maps.places.SearchBox(input,options);

      //google search callback
      google.maps.event.addListener(ac, 'places_changed', () => {

        //instatiate the results object with the results of the search
        var place = ac.getPlaces()[0];

        //if none go ahead and stop and return null
        if (!place.geometry) return;

        //instatiate the address object to a varrable so we can parse the location
        //  in latitude and longitude
        if (!place.address_components){
          input.value = place.formatted_address
        }

        //get lat, long of user location
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();

        //retreive the layerinfo object (huc12) at the google api places lat long
        AGO_get_LayerInfo_ByPoint(lat, lng, HUC12_MAP_FEATUREID)
          .then(function test(response){

            //check repsonses for errors
            const theLayerInfo = CheckReponse(response,'AGO_API_ERROR');
            //get redux state
            const state = getState()

          //NOT THE CLEANIST but works need to understand how to call set_mapToPoint from here
          //set store to new lat,long and zoom level
          //will need to add ability to detect the huc's this point falls in
          //get redux state
          const latitude = state.mapConfig.mapconfig.latitude;
          const longitude = state.mapConfig.mapconfig.longitude;
          const zoom =   state.mapConfig.mapconfig.zoom;
          const minZoom = state.mapConfig.mapconfig.minZoom;
          const maxZoom =  state.mapConfig.mapconfig.maxZoom;
          const maxBounds = state.mapConfig.mapconfig.maxBounds;
          const layers = state.mapConfig.mapconfig.layers;
          const layerInfo = theLayerInfo;

          //create map config object
          const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds, layerInfo};

          dispatch(mapSate('MAP_SEARCH',mapConfig));
        })

      });
    }
  };

export function addLayer(){

}

//new map state object to pass to reducer
function mapSate(type,data) {
  return {
    type: type,
    mapconfig: data,
    receivedAt: Date.now()
  }
};
