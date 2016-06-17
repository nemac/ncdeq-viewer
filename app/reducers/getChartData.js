export function chartDataByID(state = [], action) {
  switch (action.type) {
    case 'GET_CHART_DATA_BY_ID':
      return { ...state, chart_data: action.chart_data}
    default:
      return state
  }
}
