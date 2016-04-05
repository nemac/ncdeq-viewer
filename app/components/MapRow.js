var React = require('react');
var MapWrapper = require('./MapWrapper');
var PropTypes = React.PropTypes;

var MapRow = React.createClass({
  propTypes: {
    ref: PropTypes.string,
    mapHeight: PropTypes.number,
    rowPadding: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      ref:'Title',
      rowPadding: 1,
      mapHeight: 250
    };
  },
  getInitialState: function () {
    return {
      ref: this.props.refText,
      height: this.props.height,
      rowPadding: this.props.rowPadding
    }
  },
  render: function() {
    return (
      <div className="ui stackable internally celled grid">
        <div ref="mapMain"className="stretched row" style={{padding:'0px'}}>

          <MapWrapper rowPadding={this.props.rowPadding} mapHeight={this.props.mapHeight} />

          <div className="four wide column">

            <div className="ui internally celled grid">
              <div className="row">
                <div className="sixteen wide column">
                  <p>Toggle</p>
                </div>
              </div>
              <div className="row">
                <div className="sixteen wide column">
                  <p>Projects</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }

});

module.exports = MapRow;
