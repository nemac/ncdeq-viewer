//basic map (leaflet state and functions)

export function get_defaultMapData(zoom){
  return (dispatch, getState) => {

    //requires leaftlet to be loaded.
    var southWest = L.latLng(36.932330061503144, -73.970947265625),
    northEast = L.latLng(33.54139466898275, -86.98974609375),
    bounds = L.latLngBounds(southWest, northEast);

    let latitude = 35.6684;
    let longitude = -80.4786;
    let zoom = 7;
    let minZoom = 7;
    let maxZoom = 16;
    let maxBounds = bounds;
    let layers = [];

    //create new map config
    const mapConfig = {latitude, longitude, zoom, layers, minZoom, maxZoom, maxBounds};
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
