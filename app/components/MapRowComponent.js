var React = require('react');

var MapWrapper = require('./MapWrapper');
var ProjectMapWrapper = require('./ProjectMapWrapper');
var MapLayerToggleWrapper = require('./MapLayerToggleWrapper');

var PropTypes = React.PropTypes;

var MapRowComponent = React.createClass({

  render: function() {
    return (
      <div className="ui stackable internally celled grid">
        <div className="stretched row" >

          <MapWrapper />

          <div className="four wide column">

            <div className="ui internally celled grid">
              <div className="row">
                <div className="sixteen wide column">
                  <MapLayerToggleWrapper    />
                </div>
              </div>
              <div className="row">
                <div className="sixteen wide column">
                  <ProjectMapWrapper />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>


    );
  }

});

module.exports = MapRowComponent;
