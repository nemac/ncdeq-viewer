export function mapConfig(state = [], action) {
  switch (action.type) {
    //move map to a point and zoom
    case 'MAP_SEARCH':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info}
    //move map to a point and zoom
    case 'MAP_TO_POINT':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info}
    //handle zoom or move end map interation
    case 'MAP_END':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info}
    //sets  the intial map config data.
    case 'MAP_DATA':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info}
    //sets  the map layers objects use to toggle map layer visibility
    case 'MAP_SET_LAYERS':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info}
    //get the attributes of a layer at user clicked point
    case 'MAP_GET_LAYER_INFO':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info}
    default:
      return state
  }
  return state;
}
