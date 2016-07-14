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
