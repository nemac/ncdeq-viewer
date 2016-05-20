  var axios = require('axios');
  var L = require('leaflet');
  var esri = require('esri-leaflet');
  var turf = require('turf');

  var ago_URL = 'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services'
  var geogLevels = '/RDRBP/FeatureServer/3/query?where=id<>%27%27&objectIds=&time=&resultType=none&outFields=+geography_level%2Cgeography_label&returnIdsOnly=false&returnCountOnly=false&returnDistinctValues=true&orderByFields=geography_level&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&f=pgeojson&token='
  var allBasins = '/RDRBP/FeatureServer/3/query?where=geography_level+%3D+1&objectIds=&time=&resultType=none&outFields=id&returnIdsOnly=false&returnCountOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&f=pgeojson&token='
  var actualBasins = '/RDRBP/FeatureServer/0/query?where=id<>%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
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

function getFiltered(featureCollection,filterValues){
  var  filterValues = [];
  var fc = featureCollection.data.features

  fc.map(function(feature){
    filterValues.push(feature.properties.id);
  })

  return filterValues;
}
  var helpers = {
   getBasins: function(){
    return getActualBasins()
      .then(getFilterValues)
    },
    // axios.get(actualBasins)
    //  .then( function(result){
    //
    //    var features = result.data.features
    //    var filterValues = [];
    //
    //    //get list of current river basins for filtering
    //    features.map( function(feature){
    //       filterValues.push(feature.properties.ID)
    //     })
    //
    //     return filterValues;
    // //    var gAr = [];
    // //    var glFeatures = [];
    //
    //   //   //filter list of data based on what will be displayed (for menus)
    //   //   axios.get(allBasins)
    //   //     .then( function (geogResults){
    //   //       console.log(geogResults)
    //   //       glFeatures = geogResults.data.features
    //   //       gAr = glFeatures.filter(function(el){
    //   //         if(filterValues.indexOf(el) !== -1){
    //   //           return false;
    //   //         }
    //   //         return true;
    //    //
    //   //       })
    //   //     })
    //   //   console.log(glFeatures)
    //   //   console.log(gAr)
    //   //   console.log(filterValues);
    //   //  return result.data
    //  }).catch(function(err){
    //    console.warn('error in getGeoJson ', err);
    //    return {"message":'error'}
    //  })
//   },
   getGeographyLevels: function(){
      axios
      .get(dataLayer + geogLevels)
      .then(function(result) {
        result.data.features.map(
          function(d){
            console.log(d.properties.geography_label)
          }
        )
      });
    }
  };

  module.exports = helpers;
