//geography_levels state object
export function geography_levels(state = [], action) {
  switch (action.type) {
    case 'GET_GEOGRAPHY_LEVELS':
      return { ...state, geography_levels: action.geography_levels}
    case 'CHANGE_ACTIVE_GEOGRAPHY_LEVEL' :
      return { ...state, geography_levels: action.geography_levels}
      case 'CHANGE_FILTER_GEOGRAPHY_LEVEL' :
        return { ...state, geography_levels: action.geography_levels}
    default:
      return state
  }
  return state;
}
