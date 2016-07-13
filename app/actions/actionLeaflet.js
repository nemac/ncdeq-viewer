export function set_LeafletMap(map){
  return (dispatch, getState) => {
    //create map config object
    dispatch(leafletMap('SET_LEAFLETMAP',map));
  }
}


//new map state object to pass to reducer
function leafletMap(type,data) {
  return {
    type: type,
    leafletMap: data,
    receivedAt: Date.now()
  }
};
