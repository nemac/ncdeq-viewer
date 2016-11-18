export function menuLists(state = [], action) {
  switch (action.type) {
    case 'GET_MENU_LIST':
      return { ...state, lists: action.lists}
    default:
      return state
  }
  return state;
}

export function fetching_menu(state = [], action){
  switch (action.type) {
    case 'FETCHING_MENUS':
      return {...state, fetching_menu: action.fetching}
    default:
      return state
  }
}
