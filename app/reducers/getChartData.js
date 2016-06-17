export function chartDataByID(state = [], action) {

  switch (action.type) {
    case 'GET_CHART_DATA_BY_ID':
      console.log(action)
      console.log(action.chartDataByID)

      //return { ...state, data: action.chartDataByID}
      return {...state,data:'test'}
    default:
      return state
  }
  return state;
}
