export function mapConfig(state = [], action) {
  switch (action.type) {
    case 'MAP_DATA':
      return { ...state, mapconfig: action.mapconfig}
    default:
      return state
  }
  return state;
}
