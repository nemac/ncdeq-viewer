export function chartDataByID(state = [], action) {
  switch (action.type) {
    case 'GET_CHART_DATA_BY_ID':
      return { ...state, chart_data: action.chart_data}
    // case 'GET_ALL_CHART_DATA_BY_ID':
    //   return { ...state, all_chart_data: action.all_chart_data}
    default:
      return state
  }
}

//AllChartDataLevelByID
export function AllChartDataByID(state = [], action) {
  switch (action.type) {
    case 'GET_ALL_CHART_DATA_BY_ID':
      return { ...state, all_chart_data: action.all_chart_data}
    default:
      return state
  }
}
export function chartData(state = [], action) {
  switch (action.type) {
    case 'GET_CHART_DATA':
      return { ...state, chart_data: action.chart_data}
    default:
      return state
  }
}
