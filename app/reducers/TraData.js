export function traData(state = [], action) {
  switch (action.type) {
    case 'GET_TRA_DATA':
      return { ...state, tra_data:  action.tra_data}
    case 'GET_TRA_GEOM':
      return { ...state, tra_data:  action.tra_data}
    default:
      return state
  }
}


export function fetching_tra(state = [], action){
  switch (action.type) {
    case 'FETCHING_TRA':
      console.log(action.fetching)
      return {...state, fetching_tra: action.fetching}
    default:
      return state
  }
}
