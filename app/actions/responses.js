//generic error writer
function response_error(error, from) {
  return { error, type: from };
}

export function CheckReponse(response,from){
  //check for 200 status - good to go
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }else{
    //status other than 220 is an error throw error to and log it
    const error = new Error(response.statusText);
    error.response = response;
    dispatch(response_error(error,from));
    throw error;
  }
}
