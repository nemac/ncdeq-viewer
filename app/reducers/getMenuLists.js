export function menuLists(state = [], action) {
  switch (action.type) {
    case 'GET_MENU_LIST':
      return { ...state, lists: action.lists}
    default:
      return state
  }
  return state;
}
