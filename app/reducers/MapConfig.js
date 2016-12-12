export function mapConfig(state = [], action) {
  switch (action.type) {
    //move map to a point and zoom
    case 'MAP_SEARCH':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
    //move map to a point and zoom
    case 'MAP_TO_POINT':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
    //handle zoom or move end map interation
    case 'MAP_END':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
    //sets  the intial map config data.
    case 'MAP_DATA':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
    //sets  the map layers objects use to toggle map layer visibility
    case 'MAP_SET_LAYERS':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
    //get the attributes of a layer at user clicked point
    case 'MAP_GET_LAYER_INFO':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
    //get the attributes of a layer at user clicked point
    case 'MAP_GET_HOVER_INFO':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
      //get the attributes for when search method changes
    case 'SET_SEARCH_METHOD':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
    //get tra geometry - for chart clicks
    case 'TRA_GEOMETRY':
      return { ...state, mapconfig: action.mapconfig, layerinfo: action.mapconfig.layerInfo, traInfo: action.mapconfig.traInfo, traPointInfo: action.mapconfig.traPointInfo, NLCDPointInfo: action.mapconfig.NLCDPointInfo, huc8Info: action.mapconfig.huc8Info, searchMethod: action.mapconfig.searchMethod, hoverInfo:action.mapconfig.hoverInfo}
    default:
      return state
  }
  return state;
}

export function geometries(state = [], action){
  switch (action.type) {
    case 'GET_GEOMETRIES':
      return {...state, geometries: action.geometries}
    default:
      return state
  }
}

export function active_hover(state = [], action){
  switch (action.type) {
    case 'SET_ACTIVE_HOVER':
      return {...state, active_hover: action.active_hover}
    default:
      return state
  }
}

export function fetching_map(state = [], action){
  switch (action.type) {
    case 'FETCHING_MAP':
      return {...state, fetching_map: action.fetching}
    default:
      return state
  }
}
