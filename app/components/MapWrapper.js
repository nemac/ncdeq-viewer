var React = require('react');
var MapContainer = require('../containers/MapContainer')
var MapLayerWrapper = require('../components/MapLayerWrapper')
var PropTypes = React.PropTypes;

var MapWrapper = React.createClass({

  render: function() {
    return (
          <div className="ui stackable three column divided grid">
              <div className="eleven wide column">
                <MapContainer />
              </div>
              <div className="five wide column">
                  <MapLayerWrapper />
              </div>
          </div>
    );
  }

});

module.exports = MapWrapper;
