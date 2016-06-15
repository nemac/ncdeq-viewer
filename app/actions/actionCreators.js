//default lists
export function getLists(){
  return {
    type: 'GET_LISTS'
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}
