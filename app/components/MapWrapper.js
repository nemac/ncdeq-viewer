var React = require('react');
var MapContainer = require('../containers/MapContainer')
var PropTypes = React.PropTypes;

var MapWrapper = React.createClass({

  render: function() {
    return (
      <div className="column">
        <div className="ui raised padded segment">
          <div className="ui grid">
            <div className="two column row">
              <div className="column">
                <MapContainer />
              </div>
              <div className="column">
                {/* add layer wrapper*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MapWrapper;
