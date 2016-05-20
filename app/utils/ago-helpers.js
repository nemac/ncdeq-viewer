var axios = require('axios');
var L = require('leaflet');
var esri = require('esri-leaflet');

var ago_URL = 'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services'
var geogLevels = '/RDRBP/FeatureServer/3/query?where=id<>%27%27&objectIds=&time=&resultType=none&outFields=+geography_level%2Cgeography_label&returnIdsOnly=false&returnCountOnly=false&returnDistinctValues=true&orderByFields=geography_level&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&f=pgeojson&token='

axios.defaults.baseURL = ago_URL;

function getItems () {
  return getGeographyLevels()
    .then(function () {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}


var helpers = {
 getGeoJson: function(mapComp){


  return axios.get(geogLevels)
   .then( function(result){
     console.log(result.data)
     return result.data
   }).catch(function(err){
     console.warn('error in getGeoJson ', err);
   })
 },
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
