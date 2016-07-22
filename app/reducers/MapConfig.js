export function mapConfig(state = [], action) {
  switch (action.type) {
    //move map to a point and zoom
    case 'MAP_SEARCH':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo}
    //move map to a point and zoom
    case 'MAP_TO_POINT':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo}
    //handle zoom or move end map interation
    case 'MAP_END':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo}
    //sets  the intial map config data.
    case 'MAP_DATA':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo}
    //sets  the map layers objects use to toggle map layer visibility
    case 'MAP_SET_LAYERS':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo}
    //get the attributes of a layer at user clicked point
    case 'MAP_GET_LAYER_INFO':
      return { ...state, layerinfo: action.mapconfig.layerInfo}
    default:
      return state
  }
  return state;
}
