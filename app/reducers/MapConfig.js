export function mapConfig(state = [], action) {
  switch (action.type) {
    case 'SET_MAP_ZOOM':
      return { ...state, lists: action.lists}
    default:
      return state
  }
  return state;
}
