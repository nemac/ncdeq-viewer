var React = require('react');
var MapLayerToggleName = require('./MapLayerToggleName');
var PropTypes = React.PropTypes;

var MapLayerToggleWrapper = React.createClass({

  render: function() {
    return (
      <div className="column">
        <MapLayerToggleName  text='Layer Toggle'/>
          <div className="ui checkbox">
            <input type="checkbox" name="example" />
            <label>Layer Toggle</label>
          </div>
           {/*
              layer toggle buttons
             add project button
             project toggle
            */}

        </div>


    );
  }

});

module.exports = MapLayerToggleWrapper;
