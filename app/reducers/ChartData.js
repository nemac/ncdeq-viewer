export function chartData(state = [], action) {
  switch (action.type) {
    case 'GET_CHART_DATA':
      return { ...state, chart_data:  action.chart_data, chart_visibility: action.chart_visibility}
    case 'SET_CHART_VISIBILITY':
      return { ...state, chart_data:  action.chart_data, chart_visibility: action.chart_visibility}
    case 'GET_CHART_LEVELS':
      return {...state, chart_levels: action.chart_levels, current_level: action.current_chart_level, current_matchid: action.current_chart_matchid}
    case 'UPDATE_CHART_LEVELS':
      return {...state, chart_levels: action.chart_levels, current_level: action.current_chart_level, current_matchid: action.current_chart_matchid}
    case 'GET_CHART_MATCHID':
      return {...state, chart_levels: action.chart_levels, current_level: action.current_chart_level, current_matchid: action.current_chart_matchid}
    default:
      return state
  }
}
