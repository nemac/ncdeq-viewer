var axios = require('axios');
var L = require('leaflet');
var esri = require('esri-leaflet')

var ago_URL = 'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer'
var dataLayer = '/3'
var geogLevels = '/query?where=id<>%27%27&objectIds=&time=&resultType=none&outFields=+geography_level%2Cgeography_label&returnIdsOnly=false&returnCountOnly=false&returnDistinctValues=true&orderByFields=geography_level&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&f=pgeojson&token='
var RiverBasin_layer = '/0'
var RiverBasin_url = '/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
//0/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token=',

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


function getUserInfo (username){
  return axios.get('https://api.github.com/users/' + username + param)
}

function getRepos(username){
 return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars (repos) {
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0)
}

function getPlayersData (player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

function calculateScores (players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

function getItems(response){
  console.log(response.data)
}

var helpers = {
 getGeoJson: function(mapComp){

  //  var myStyle = {
  //    "color": "#ff7800",
  //    "weight": 5,
  //    "opacity": 0.65
  //  };


  return axios.get(RiverBasin_layer + RiverBasin_url)
   .then( function(result){
     //console.log(result.data)
    var map = mapComp.getLeafletElement();
    //var L = mapComp.leafletElement;

     L.geoJson(result.data).addTo(map);
    //  L.esri.featureLayer({
    //    url: 'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Heritage_Trees_Portland/FeatureServer/0'
    //  }).addTo(map);
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

          // d.properties.map(function(e){
          //   console.log(e)
          // })
        }
      )
      //var parsed = JSON.parse(result)
      //console.log(result.data.features)
    });
  },
  getPlayersInfo: function (players) {
    return axios.all(players.map(function(username){
      return getUserInfo(username)
    })).then(function(info){
      return info.map( function(user){
        return user.data;
      })
    }).catch( function(err){
      console.warn('Error in getPlayersInfo',err)
    })
  },
  battle: function (players) {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);
    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function (err) {console.warn('Error in getPlayersInfo: ', err)})
  }
};

module.exports = helpers;
