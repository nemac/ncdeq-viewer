
//default state
export function set_defaults(mapComp,e){
  return (dispatch, getState) => {

  }
}
function  defaultSate(type,data) {
  return {
    type: type,
    default: data,
    receivedAt: Date.now()
  }
}
