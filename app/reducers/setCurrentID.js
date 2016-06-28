export function CurrentID(state = [], action) {
  switch (action.type) {
    case 'SET_CURRENT_ID':
      return { ...state, current_id: action.current_id}
    default:
      return state
  }
  return state;
}
