export function traData(state = [], action) {
  switch (action.type) {
    case 'GET_TRA_DATA':
      return { ...state, tra_data:  action.tra_data}
    default:
      return state
  }
}
