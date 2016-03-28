var React = require('react');
var ProjectMapAdd = require('./ProjectMapAdd');
var MapLayerToggleName = require('./MapLayerToggleName');
var MapLayerToggle = require('./MapLayerToggle');
var PropTypes = React.PropTypes;

var ProjectMapWrapper = React.createClass({

  render: function() {
    return (
      <div className="row bottom-toggles" >
        <div className="column padded">
          <MapLayerToggleName  text='Add my Project'/>
        </div>
        <div className="column padded">
          <ProjectMapAdd />
        </div>
        <div className="column padded">
          <MapLayerToggle  toggleText='project'/>
        </div>
      </div>
    );
  }

});

module.exports = ProjectMapWrapper;
