export function mapConfig(state = [], action) {
  switch (action.type) {
    //handle zoom or move end map interation
    case 'MAP_END':
      return { ...state, mapconfig: action.mapconfig}
    //sets  the intial map config data.
    case 'MAP_DATA':
      return { ...state, mapconfig: action.mapconfig}
    default:
      return state
  }
  return state;
}
