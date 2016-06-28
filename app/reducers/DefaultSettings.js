export function default_settings(state = [], action) {
  switch (action.type) {
    case 'UPDATE_MAP_HEIGHT':
      return { ...state, default_settings:  action.default_settings}
    case 'UPDATE_CHART_HEIGHT':
      return { ...state, default_settings:  action.default_settings}
    case 'SET_DEFAULT_SETTINGS':
      return { ...state, default_settings:  action.default_settings}
    default:
      return state
  }
}
