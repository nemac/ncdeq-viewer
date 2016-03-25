var React = require('react');
var MapContainer = require('../containers/MapContainer')
var MapLayerToggleWrapper = require('../components/MapLayerToggleWrapper')
var PropTypes = React.PropTypes;

var MapWrapper = React.createClass({

  render: function() {
    return (
      <div className="column">
        <div className="ui raised padded segment">
          <div className="ui stackable three column grid">
            <div className="row">
              <div className="ten wide column">
                <MapContainer />
              </div>
              <div className="five wide column">
                <MapLayerToggleWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MapWrapper;
