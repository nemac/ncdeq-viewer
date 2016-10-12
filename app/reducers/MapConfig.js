export function mapConfig(state = [], action) {
  switch (action.type) {
    //move map to a point and zoom
    case 'MAP_SEARCH':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod}
    //move map to a point and zoom
    case 'MAP_TO_POINT':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod}
    //handle zoom or move end map interation
    case 'MAP_END':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod}
    //sets  the intial map config data.
    case 'MAP_DATA':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod}
    //sets  the map layers objects use to toggle map layer visibility
    case 'MAP_SET_LAYERS':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod}
    //get the attributes of a layer at user clicked point
    case 'MAP_GET_LAYER_INFO':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod}
      //get the attributes for when search method changes
    case 'SET_SEARCH_METHOD':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, trainfo: action.mapconfig.traInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod}
    default:
      return state
  }
  return state;
}
