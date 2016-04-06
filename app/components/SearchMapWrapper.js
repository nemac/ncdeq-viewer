var React = require('react');
var SearchBar = require('./Search');
var MapLayerToggleName = require('./MapLayerToggleName');
var MapLayerToggle = require('./MapLayerToggle');

var PropTypes = React.PropTypes;

var SearchMapWrapper = React.createClass({

  render: function() {
    return (
      <div className="row">
        <MapLayerToggleName text='Search'/>
        <SearchBar placeholder='Search to zoom to a location' />
      </div>
    );
  }

});

module.exports = SearchMapWrapper;
