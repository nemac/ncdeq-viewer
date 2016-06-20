export function geogLevels(state = [], action) {
  switch (action.type) {
    case 'GET_GEOGRAPHY_LEVELS':
      return { ...state, geography_levels: action.geography_levels.features}
    default:
      return state
  }
  return state;
}
