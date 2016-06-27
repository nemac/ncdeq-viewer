//basic map (leaflet state and functions)

export function get_defaultMapData(zoom){
  return (dispatch, getState) => {

    let latitude = 0;
    let longitude = 0;
    let zoom = 0;
    let minZoom = 0;
    let maxZoom = 0;
    let maxBounds = [];
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
