export function leafletMap(state = [], action) {
  switch (action.type) {
    //move map to a point and zoom
    case 'SET_LEAFLETMAP':
      return { ...state, leafletMap: action.leafletMap}
    default:
      return state
  }
  return state;
}

export function imagery_visibility(state = [], action){
  switch (action.type) {
    case 'USE_IMAGERY':
      return {...state, visibility: action.imagery_visibility}
    default:
      return state
  }
}
