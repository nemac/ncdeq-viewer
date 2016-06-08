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
  var chartLevel_1_2 = '/RDRBP/FeatureServer/3/query?where=ID+%3D+%27030202020403%27+and+geography_level%3D3+and+%28chart_level%3D1+or+chart_level%3D2%29+&objectIds=&time=&resultType=none&outFields=chart_level%2C+chart_label%2C+chart_value%2C+chart_description%2C+chart_type%2C+chart_level_label&returnIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&f=pgeojson&token='

  var riverBasin_features = {name:'River Basins',lists:[]};
  var catalogingUnits_features = {name:'Cataloging Units',lists:[]};
  var HUC12_features = {name:'HUC12',lists:[]};

  //set base URL for axios
  axios.defaults.baseURL = ago_URL;

  function getActualBasins(){
    return axios.get(actualBasins);
  }
  function getBasinsList(){
    return axios.get(allBasins);
  }

  function getFilterValues(featureCollection){
    var  filterValues = [];
    var fc = featureCollection.data.features

    fc.map(function(feature){
      filterValues.push(feature.properties.id);
    })

    return filterValues;
  }

  function getFiltered(filterValues){

    return getBasinsList()
      .then(function(list){
        var features = [];
        var newFeatureCollection = [];
        filterValues.map(function(value){
          var filtered = turfFilter(list.data, 'ID', value);
          features.push(filtered.features[0]);
        })
        newFeatureCollection = turfFC(features);

        var JSONdata = [];
        JSONdata.push(riverBasin_features);

        var basins = newFeatureCollection;
        //console.log (basins)
        //console.log(JSON.stringify(basins))
        basins.features.map(function(features) {
           //console.log(JSON.stringify(features.properties))
           JSONdata[0].lists.push(features.properties)
        })
        //console.log(JSON.stringify(JSONdata))


        return JSONdata;
      })
  }

  var helpers = {
    getBasins: function(){
      return getActualBasins()
      .then(getFilterValues)
      .then(function(data){
        return  getFiltered(data);
      })
    },
    getAllBasins: function(){
      return getBasinsList()
      .then(function(data){
        return data.data;
      })
    },
  //  getFiltered: function(){
  //      return getFiltered()
  //       .then(function(test){
  //         console.log(test)
  //       })
  //  },
   getGeographyLevels: function(){
      axios
      .get(dataLayer + geogLevels)
      .then(function(result) {
        result.data.features.map(
          function(d){
            //console.log(d.properties.geography_label)
          }
        )
      });
    }
  };

  module.exports = helpers;
