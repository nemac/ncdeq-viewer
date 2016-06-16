var axios = require('axios');

//base URl
const Basin_FeatureID = 0;
const CatalogingUnit_FeatureID = 1;
const HUC12_FeatureID = 2;
const Data_FeatureID = 3;
const HUCNames_FeatureID = 4;

const ago_URL = 'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services'
const actualBasins = '/RDRBP/FeatureServer/' + Basin_FeatureID + '/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='


//set base URL for axios
axios.defaults.baseURL = ago_URL;


export function AGO_Error(error) {
  return { error, type: "AGO_API_ERROR" };
}

export function get_basinsAC(){
  return dispatch => {
    return axios.get(actualBasins)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(set_MenuList(response.data));
      }else{
        const error = new Error(response.statusText);
        error.response = response;
        dispatch(AGO_Error(error));
        throw error;
      }
    })
    .catch(error => { console.log('request failed', error); });
  }
}

function set_MenuList(json) {
  console.log(json)
  return {
    type: 'GET_LIST',
    posts: json,
    receivedAt: Date.now()
  }
}

export function menuList(){

}
  // return set_MenuList({'json':'jsontest'})
//   var t = set_MenuList({'json':'jsontest'})
//   console.log(t);
//   return t
//   //return (dispatch) => {
//   //  return dispatch(get_basinsAC(json))
//   //}
// }
 // export function login(userData) {
//   return dispatch =>
//     agoHelpers.get_MenuList()
//       .then(respn)
//
//       .then(function(RiverBasinData){
//         return this.setState ({RiverBasinData})
//       }.bind(this))
//
//     fetch('http://localhost/login', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: userData.email,
//         password: userData.password,
//       }),
//     })
//     .then(response => {
//       if (response.status >= 200 && response.status < 300) {
//         console.log(response);
//         dispatch(loginSuccess(response));
//       } else {
//         const error = new Error(response.statusText);
//         error.response = response;
//         dispatch(loginError(error));
//         throw error;
//       }
//     })
//     .catch(error => { console.log('request failed', error); });
// }

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
