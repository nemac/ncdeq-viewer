var axios = require('axios');

//base URl
const Basin_FeatureID = 0;
const CatalogingUnit_FeatureID = 1;
const HUC12_FeatureID = 2;
const Data_FeatureID = 3;
const HUCNames_FeatureID = 4;

const AGO_URL = 'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services'
const AGO_RiverBasins = '/RDRBP/FeatureServer/' + Basin_FeatureID + '/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
const AGO_CatalogingUnits = '/RDRBP/FeatureServer/' + CatalogingUnit_FeatureID + '/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
const AGO_HUCS = '/RDRBP/FeatureServer/' + HUC12_FeatureID + '/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='


//set base URL for axios
axios.defaults.baseURL = AGO_URL;


function get_Basins(){
  return axios.get(AGO_RiverBasins)
}

function get_CatalogingUnits(){
  return axios.get(AGO_CatalogingUnits)
}

function get_HUCS(){
  return axios.get(AGO_HUCS)
}



//get the next level of geog for a geography level to use in ago api
//  example this gets all the hucs for a Cataloging unit
function getNextLevel(geogLevel){
  switch (geogLevel) {
    case 'River Basins':
      return 1;
      break;
    case 'Cataloging Units':
      return 3;
      break;
    case 'HUC12':
      return 3;
      break;
    default:
      return 3;
    }
}

function buildNameList(name){
    return {
      name,
      lists:[]
    }
}

//builds a menu list
function buildMenuList (name, menuList, geoJSON){
  var ml = [];
  var nameList = buildNameList(name);

  ml.push( nameList );

  //map the menu list
  ml.map(function(menu){
    //check if name matches the passed name
    if(menu.name === name){
      //map geojson features and add the properties (attributes) to the list
      //  this will populate the menu items
      geoJSON.features.map(function(features) {
         menu.lists.push(features.properties)
       })
    }
  })

  //return new menu list
  return ml[0]
}

function response_error(error, from) {
  return { error, type: from };
}

function CheckReponse(response,from){
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }else{
    const error = new Error(response.statusText);
    error.response = response;
    dispatch(response_error(error,from));
    throw error;
  }
}
function merge(){
  return
}
export function get_MenuList(){
    return dispatch => {
      axios.all([get_Basins(), get_CatalogingUnits(),get_HUCS()])
      .then(axios.spread(function (basins, catalogingUnits, HUCS) {

          //check repsonses for errors
          let theBasins = CheckReponse(basins,'AGO_API_ERROR');
          let theCatalogingUnits = CheckReponse(catalogingUnits,'AGO_API_ERROR');
          let theHUCS = CheckReponse(HUCS,'AGO_API_ERROR');

          //restructure data for menu lists
          let basinList = buildMenuList( 'River Basins', [] , theBasins)
          let catalogingUnitList = buildMenuList( 'Cataloging Units', [] , theCatalogingUnits)
          let HUCList  = buildMenuList( 'HUC12', [], theHUCS)

          //combine the lists into one
          let all = [ {...basinList}, {...catalogingUnitList}, {...HUCList} ]

          //send the lists on
          dispatch(set_MenuList(all))

      })
    )
    .catch(error => { console.log('request failed', error); });;
  }
}

function set_MenuList(json) {
  return {
    type: 'GET_MENU_LIST',
    lists: json,
    receivedAt: Date.now()
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}
