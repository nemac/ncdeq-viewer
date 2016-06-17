export function chartDataByID(state = [], action) {

  switch (action.type) {
    case 'GET_CHART_DATA_BY_ID':
      return { ...state, data: action.chartDataByID}
    default:
      return state
  }
  return state;
}
