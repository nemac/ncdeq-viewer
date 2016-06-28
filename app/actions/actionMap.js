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
    var southWest = L.latLng(36.932330061503144, -73.970947265625),
    northEast = L.latLng(33.54139466898275, -86.98974609375),
    bounds = L.latLngBounds(southWest, northEast);

    const latitude = 35.6684;
    const longitude = -80.4786;
    const zoom = 7;
    const minZoom = 7;
    const maxZoom = 16;
    const maxBounds = bounds;
    const layers = [];

    //create new map config
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds};

    //send map config data on to store
    dispatch(mapSate('MAP_DATA',mapConfig));
  }
}

function  mapSate(type,data) {
  return {
    type: type,
    mapconfig: data,
    receivedAt: Date.now()
  }
}
