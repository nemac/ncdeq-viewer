var React = require('react');
var ReactLeaflet = require('react-leaflet')
var agoHelpers = require('../utils/ago-helpers');
import ESRIFeatureLayer from '../components/ESRIFeatureLayer';

var PropTypes = React.PropTypes;

var MapContainer = React.createClass({
  componentDidMount: function() {



    var riverBasin_features = {name:'River Basins',lists:[]};
    var catalogingUnits_features = {name:'Cataloging Units',lists:[]};
    var HUC12_features = {name:'HUC12',lists:[]};


    agoHelpers.get_BasinsAll()
      .then(function(returnedData){
        console.log(JSON.stringify(returnedData))
    })

    agoHelpers.get_GeographyLevels()
      .then(function(returnedData){
        console.log(JSON.stringify(returnedData))
      })
    //dataJSON.push({name:'River Basins',lists:[]});
    //var dataJSON = [{name:'River Basins',lists:[]}]
    //console.log(dataJSON[0].lists)
    //this.refs.map

    agoHelpers.get_Basins()
      .then(function(returnedData){
        console.log(JSON.stringify(returnedData))
        // var JSONdata = [];
        // JSONdata.push(riverBasin_features);
        // //console.log(JSON.stringify(basins))
        // basins.features.map(function(features) {
        //    //console.log(JSON.stringify(features.properties))
        //    JSONdata[0].lists.push(features.properties)
        // })
        // console.log(JSON.stringify(JSONdata))

      })

      // agoHelpers.getAllBasins()
      //   .then(function(basins){
      //   //  console.log(JSON.stringify(basins))
      //
      //
      //
      //
      //     //console.log(JSON.stringify(basins))
      //     // //console.log(JSON.stringify(basins))
      //     // basins.features.map(function(features) {
      //     //   //console.log(features.properties)
      //     //   dataJSON[0].lists.push(features.properties)
      //     //   // features.properties.map(function(attributes) {
      //     //   //     console.log(attributes.id)
      //     //   // })
      //     // })
      //     //console.log(JSON.stringify(dataJSON));
      //   })


    // agoHelpers.getFiltered()
    //   .then(function(data){
    //     //console.log(data)
    //   })
      // console.log(basinFilter)
    var map = this.refs.map.getLeafletElement();
    this.setState({map:this.refs.map,l:L})

  },
  getInitialState: function() {
    return {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      zoom: this.props.zoom,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      tileUrl:'http://api.tiles.mapbox.com/v3/daveism.oo0p88l4/{z}/{x}/{y}.png',
    }
  },
  render: function() {
    return (
      <ReactLeaflet.Map  ref='map' onLeafletZoomEnd={this.props.HandleMapZoomEnd.bind(null,this)} onLeafletMoveend={this.props.handleMapMoveEnd.bind(null,this)} onLeafletClick={this.props.handleMapClick.bind(null,this)} center={[this.props.latitude,this.props.longitude]} zoom={this.props.zoom}>
        <ReactLeaflet.TileLayer
          attribution={this.state.attribution}
          url={this.state.tileUrl}
        />
      <ESRIFeatureLayer
        url='http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/0'
        layerStyle='{"color":"#696969","fillColor":"#DCDCDC","fillOpacity":0,"weight":8}'
        zoom={this.props.zoom}
      />
      <ESRIFeatureLayer
        url='http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/1'
        layerStyle='{"color":"#808080","fillColor":"#DCDCDC","fillOpacity":0,"weight":6}'
        zoom={this.props.zoom}
      />
      <ESRIFeatureLayer
        url='http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/2'
        layerStyle='{"color":"#C0C0C0","fillColor":"#DCDCDC","fillOpacity":0,"weight":2}'
        zoom={this.props.zoom}
      />
    </ReactLeaflet.Map>
    );
  }
});

module.exports = MapContainer;
