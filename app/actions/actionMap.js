
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
    const layers = [];

    //create map config object
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds};

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
    const layers = [];

    //create map config object
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds};

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

    //create new map config
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds};

    //send map config data on to store
    dispatch(mapSate('MAP_DATA',mapConfig));
  }
}

//new geography_levels object to pass to reducer
function mapSate(type,data) {
  return {
    type: type,
    mapconfig: data,
    receivedAt: Date.now()
  }
}
