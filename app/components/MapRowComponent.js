var React = require('react');

var MapWrapper = require('./MapWrapper');
var ProjectMapWrapper = require('./ProjectMapWrapper');
var MapLayerToggleWrapper = require('./MapLayerToggleWrapper');
var SearchMapWrapper = require('./SearchMapWrapper');

var PropTypes = React.PropTypes;

var MapRowComponent = React.createClass({
  componentDidMount: function() {
    //do something
  },
  propTypes: {
    mapHeight: PropTypes.number.isRequired,
    rowPadding: PropTypes.number.isRequired
  },
  getDefaultProps: function() {
    return {
      mapHeight: 300,
      rowPadding: 1
    };
  },

  getInitialState: function () {
    return {
      rowPadding: this.props.rowPadding,
    }
  },
  render: function() {
    return (
      <div className="ui stackable internally celled grid">
        <div className="stretched row" >

          <MapWrapper
             rowPadding={this.props.rowPadding}
             mapHeight={this.props.mapHeight} />

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
