var React = require('react');
var ProjectMapWrapper = require('./ProjectMapWrapper');
var MapLayerToggleWrapper = require('./MapLayerToggleWrapper');
var SearchMapWrapper = require('./SearchMapWrapper');

var PropTypes = React.PropTypes;

var MapLayerWrapper = React.createClass({

  render: function() {
    return (
        <div >
          <div className="ui basic segment">
            <SearchMapWrapper />
          </div>
          <div className="ui divider"></div>
          <div className="ui basic segment">
            <MapLayerToggleWrapper />
          </div>
          <div className="ui divider"></div>
          <div className="ui basic segment">
            <ProjectMapWrapper />
          </div>
        </div>

    );
  }

});

module.exports = MapLayerWrapper;
