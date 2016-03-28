var React = require('react');
var ProjectMapAdd = require('./ProjectMapAdd');
var MapLayerToggleName = require('./MapLayerToggleName');
var MapLayerToggle = require('./MapLayerToggle');
var PropTypes = React.PropTypes;

var ProjectMapWrapper = React.createClass({

  render: function() {
    return (
      <div className="row">
        <MapLayerToggleName text='Add a Project'/>
        <MapLayerToggle toggleText='Project Name'/>
        <br />
        <ProjectMapAdd placeholder='Search for a project' />
      </div>
    );
  }

});

module.exports = ProjectMapWrapper;
