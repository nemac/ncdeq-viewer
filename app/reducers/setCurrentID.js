export function setCurrentID(state = [], action) {

  switch (action.type) {
    case 'set_CurrentID':
      return { ...state, current_id: action.current_id}
    default:
      return state
  }
  return state;
}
