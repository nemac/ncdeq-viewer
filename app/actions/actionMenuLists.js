var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, AGO_RiverBasins, AGO_CatalogingUnits, AGO_HUCS } from './actionConstants';

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
          dispatch(MenuList(all))

      })
    )
    .catch(error => { console.log('request failed', error); });;
  }
}

function MenuList(json) {
  return {
    type: 'GET_MENU_LIST',
    lists: json,
    receivedAt: Date.now()
  }
}
