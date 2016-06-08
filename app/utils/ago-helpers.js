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

  var chartLevel_1_2 = '/RDRBP/FeatureServer/3/query?where=ID+%3D+%27030202020403%27+and+geography_level%3D3+and+%28chart_level%3D1+or+chart_level%3D2%29+&objectIds=&time=&resultType=none&outFields=chart_level%2C+chart_label%2C+chart_value%2C+chart_description%2C+chart_type%2C+chart_level_label&returnIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&f=pgeojson&token='

  // var riverBasin_features = {name:'River Basins',lists:[]};
  // var catalogingUnits_features = {name:'Cataloging Units',lists:[]};
  // var HUC12_features = {name:'HUC12',lists:[]};

  //set base URL for axios
  axios.defaults.baseURL = ago_URL;

  //create menu list
  var menuLists = [];
//  menuLists.push(riverBasin_features);
//  menuLists.push(catalogingUnits_features);
//  menuLists.push(HUC12_features);

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

  function deNest(list){
    var returnList = [];
    if (list.length > 1){
      returnList = list[0]
    } else {
      returnList = list;
    }
    return returnList;
  }

  //merges two json data lists
  //   nested would not do {...list1, ...list2}
  function mergeList(list1,list2){
    var merged = [];

    //get rid of nested arrays
    var l1 = deNest(list1);
    var l2 = deNest(list2);

    merged.push(l1);
    merged.push(l2);

    return merged
  }
  //builds the data structure for Basin Menu List
  function get_MenuLists(filterValues){

    //get the complete list of basins and filter it by the ids of basins avaiable for viewer
    return  get_AGOBasins()
      .then(function(geoJSON){

        //get the menu list based on filtered features
        var ml = set_MenuList( 'River Basins', menuLists,geoJSON.data)

        //return the JSON list
        return ml;
      })
        .then(function(list){
          return get_AGOCatalogingUnits()
            .then(function(geoJSON){

              //get the menu list based on filtered features
              var ml = set_MenuList( 'Cataloging Units', menuLists, geoJSON.data)

              //merge lists
              var merged = mergeList(list,ml)

              return merged;
            })
        })
        .then(function(list){
          return get_AGOHUCS()
            .then(function(geoJSON){

              //get the menu list based on filtered features
              var ml = set_MenuList( 'HUC12', menuLists,geoJSON.data)


              //merge lists
              var merged = mergeList(list,ml)

              //return the JSON list
              return merged;
            })
        })
  }

  var helpers = {
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

  module.exports = helpers;
