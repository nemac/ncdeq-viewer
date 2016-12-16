export function set_constants(){
  return (dispatch,getState) => {
    let constants_data = JSON_CONSTANTS.concat()

    dispatch(constants('SET_CONSTANTS', constants_data));

  };
}

function constants(type, data){
  return {type: type, constants: data, receivedAt: Date.now()}
}
