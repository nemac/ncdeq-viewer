  var axios = require('axios');
  var L = require('leaflet');
  var esri = require('esri-leaflet');
  var turf = require('turf');
  var turfFC = require('turf-featurecollection');
  var turfFilter = require('turf-filter');


  var ago_URL = 'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services'
  var geogLevels = '/RDRBP/FeatureServer/3/query?where=id<>%27%27&objectIds=&time=&resultType=none&outFields=+geography_level%2Cgeography_label&returnIdsOnly=false&returnCountOnly=false&returnDistinctValues=true&orderByFields=geography_level&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&f=pgeojson&token='
  var allBasins = 'RDRBP/FeatureServer/4/query?where=type%3D%27HUC+6%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
  var actualBasins = '/RDRBP/FeatureServer/0/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
  var actualCatalogingUnits = '/RDRBP/FeatureServer/1/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
  var actualHUCS = '/RDRBP/FeatureServer/2/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='



  //set base URL for axios
  axios.defaults.baseURL = ago_URL;

  //create menu list
  var menuLists = [];

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
//get chart data by huc id
function get_AllChartDataLowerLevel_byID(hucid,geogLevel){
   var id = hucid;
   var level = getNextLevel(geogLevel);

   if(geogLevel === 'HUC12'){
     id = hucid.substring(0,8);
   }
   var query_URL = '/RDRBP/FeatureServer/3/query?where='+
                   'ID+like+%27' + id + '%25%27+and+geography_level%3D'+ level +
                   '&objectIds='+
                   '&time='+
                   '&resultType=none'+
                   '&outFields=chart_level%2C+chart_label%2C+chart_value%2C+chart_description%2C+chart_type%2C+chart_level_label'+
                   '&returnIdsOnly=false'+
                   '&returnCountOnly=false'+
                   '&returnDistinctValues=true'+
                   '&orderByFields=chart_level'+
                   '&groupByFieldsForStatistics='+
                   '&outStatistics='+
                   '&resultOffset='+
                   '&resultRecordCount='+
                   '&f=pgeojson&token=';

//  console.log(query_URL);
  return axios.get(query_URL);

}

//get chart data by huc id
function testit(hucid){

   var query_URL = '/RDRBP/FeatureServer/3/query?where' +
                    '=id%3D%27' + hucid + '%27' +
                    '&objectIds='+
                    '&time='+
                    '&resultType=none'+
                    '&outFields=chart_id%2C+chart_matchid%2Cchart_type%2Cchart_level%2Cchart_description%2Cchart_value'+
                    '&returnIdsOnly=false'+
                    '&returnCountOnly=false'+
                    '&returnDistinctValues=true'+
                    '&orderByFields=chart_level%2Cchart_matchid'+
                    '&groupByFieldsForStatistics='+
                    '&outStatistics='+
                    '&resultOffset='+
                    '&resultRecordCount='+
                    '&f=pgeojson&token=';

  const request = axios.get(query_URL);
  //console.log(request);

  return {
    type: TEST,
    payload: request
  };

}

  //get chart data by huc id
  function get_ChartData_byID(hucid){

     var query_URL = '/RDRBP/FeatureServer/3/query?where' +
                      '=id%3D%27' + hucid + '%27' +
                      '&objectIds='+
                      '&time='+
                      '&resultType=none'+
                      '&outFields=chart_id%2C+chart_matchid%2Cchart_type%2Cchart_level%2Cchart_description%2Cchart_value'+
                      '&returnIdsOnly=false'+
                      '&returnCountOnly=false'+
                      '&returnDistinctValues=true'+
                      '&orderByFields=chart_level%2Cchart_matchid'+
                      '&groupByFieldsForStatistics='+
                      '&outStatistics='+
                      '&resultOffset='+
                      '&resultRecordCount='+
                      '&f=pgeojson&token=';

    return axios.get(query_URL);

  }

  //get chart data by huc id
  function get_ChartData_byID(hucid){

     var query_URL = '/RDRBP/FeatureServer/3/query?where' +
                      '=id%3D%27' + hucid + '%27' +
                      '&objectIds='+
                      '&time='+
                      '&resultType=none'+
                      '&outFields=chart_id%2C+chart_matchid%2Cchart_type%2Cchart_level%2Cchart_description%2Cchart_value'+
                      '&returnIdsOnly=false'+
                      '&returnCountOnly=false'+
                      '&returnDistinctValues=true'+
                      '&orderByFields=chart_level%2Cchart_matchid'+
                      '&groupByFieldsForStatistics='+
                      '&outStatistics='+
                      '&resultOffset='+
                      '&resultRecordCount='+
                      '&f=pgeojson&token=';

    return axios.get(query_URL);

  }
  //retrieves geography levels from AGO api
  function get_AGOGeographyLevels(){
    return axios.get(geogLevels);
  }

  //retrieves the list basins currently available frm AGO api
  function get_AGOBasins(){
    return axios.get(actualBasins);
  }

  //retrieves the list Cataloging Units currently available frm AGO api
  function get_AGOCatalogingUnits(){
    return axios.get(actualCatalogingUnits);
  }

  //retrieves the list Cataloging Units currently available frm AGO api
  function get_AGOHUCS(){
    return axios.get(actualHUCS);
  }

  //retrieve a list of all the River Basins in NC from AGO api
  function get_AGOBasinsALL(){
    return axios.get(allBasins);
  }

  //get an array of IDs from the JSON data.
  function get_IDs(featureCollection){

    //creaet emputy array to store the ids
    var  filterValues = [];

    //create a copy of features of obect.
    var fc = featureCollection.data.features

    //map the GeoJSON obect and build a list of the ids.
    fc.map(function(feature){
      filterValues.push(feature.properties.id);
    })

    return filterValues;
  }

  function set_NameList(name){
      return {
        name,
        lists:[]
      }
  }

  //builds a menu list
  function set_MenuList (name, menuList, geoJSON){
    var ml = [];
    var nameList = set_NameList(name);

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


  //merges two json data lists
  //   nested would not do {...list1, ...list2}
  function mergeList(list1,list2){
    var merged = [];

    //if already an array just create a new array
    if (Array.isArray(list1)){
      merged = list1
    } else{
      merged.push(list1);
    }

    //merged.push(l1);
    merged.push(list2);

    return merged
  }
  //builds the data structure for Basin Menu List
  function get_MenuLists(filterValues){

    //get the complete list of basins and filter it by the ids of basins avaiable for viewer
    return  get_AGOBasins()
      .then(function(geoJSON){

        //get the menu list based on filtered features
        var ml = set_MenuList( 'River Basins', menuLists, geoJSON.data)

        //return the JSON list
        return ml;
      })
        .then(function(RBList){
          return get_AGOCatalogingUnits()
            .then(function(geoJSON){

              //get the menu list based on filtered features
              var ml = set_MenuList( 'Cataloging Units', menuLists, geoJSON.data)

              //merge lists
              var merged = mergeList(RBList,ml)

              return merged;
            })
        })
        .then(function(CUList){
          return get_AGOHUCS()
            .then(function(geoJSON){

              //get the menu list based on filtered features
              var ml = set_MenuList( 'HUC12', menuLists,  geoJSON.data)

              //merge lists
              var merged = mergeList(CUList,ml)

              //return the JSON list
              return merged;
            })
        })
  }

  var AGOHelpers = {
    get_AllChartDataLowerLevel_byID: function(id,level){
      return get_AllChartDataLowerLevel_byID(id,level)
      .then(function(result) {
         return result.data
      });
    },
    get_ChartData_byID: function(val){
      return get_ChartData_byID(val)
      .then(function(result) {
         return result.data
      });
    },
    //get available basins
    get_Basins: function(){
      return get_AGOBasins()
      .then(function(result) {
         return result.data
      });
    },
    //get available Cataloging Units
    get_CatalogingUnits: function(){
      return get_AGOCatalogingUnits()
      .then(function(result) {
         return result.data
      });
    },
    //get available Cataloging Units
    get_ActualHUCS: function(){
      return get_AGOHUCS()
      .then(function(result) {
         return result.data
      });
    },
    //get ALl basins
    get_BasinsAll: function(){
      return get_AGOBasinsALL()
      .then(function(result) {
         return result.data
      });
    },
    get_MenuList: function(){
      return get_MenuLists()
        .then(function(result) {
           return result
        });
      // return get_AGOBasins()
      // .then(get_IDs)
      //   .then(function(data){
      //     return  get_MenuLists(data);
      //   })
    },
    get_GeographyLevels: function(){
      return get_AGOGeographyLevels()
       .then(function(result) {
          return result.data
       });
     },
     get_filteredIDs: function(){
       return get_AGOBasins()
       .then(get_IDs)
         .then(function(data){
           return data;
         })
     }
  };

  module.exports = AGOHelpers;
