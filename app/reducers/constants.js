export function constants(state = [], action){
  switch (action.type) {
    case 'SET_CONSTANTS':
      return {...state, constants: action.constants}
    default:
      return state
  }
}
