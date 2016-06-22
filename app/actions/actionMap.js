//basic map (leaflet state and functions)

export function setMapZoom(zoom){
  return (dispatch, getState) => {

    let latitude = 0;
    let longitude = 0;
    let zoom = 0;
    let layers = [];

    //create new map config
    const mapConfig = {latitude, longitude, zoom, layers};
    dispatch(geography_levels('SET_MAP_ZOOM',mapConfig));
  }
}

function  mapSate(type,data) {
  return {
    type: type,
    mapconfig: data,
    receivedAt: Date.now()
  }
}
