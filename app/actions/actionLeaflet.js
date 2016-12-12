import { IMAGERY_VISIBILITY } from '../constants/appConstants';

export function set_LeafletMap(map){
  return (dispatch, getState) => {
    //create map config object
    dispatch(leafletMap('SET_LEAFLETMAP',map));
  }
}

export function use_imagery(){
  return (dispatch, getState) => {

    const state = getState()

    let visibility = IMAGERY_VISIBILITY;

    //set visibility state of charts
    if(state.imagery_visibility){
      visibility = (state.imagery_visibility.visibility ? false : true);
    }

    //create map config object
    dispatch(imagery_visibility('USE_IMAGERY',visibility));
  }
}

function imagery_visibility(type, data){
  return {type: type, imagery_visibility: data, receivedAt: Date.now()}
}
//new map state object to pass to reducer
function leafletMap(type,data) {
  return {
    type: type,
    leafletMap: data,
    receivedAt: Date.now()
  }
};
