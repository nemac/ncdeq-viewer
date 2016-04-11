var React = require('react');

var MapWrapper = require('./MapWrapper');
var ProjectMapWrapper = require('./ProjectMapWrapper');
var MapLayerToggleWrapper = require('./MapLayerToggleWrapper');
var SearchMapWrapper = require('./SearchMapWrapper');

var PropTypes = React.PropTypes;

function MapRowComponent (props) {
  return(
    <div className="ui stackable internally celled grid">
      <div className="stretched row" >

        <MapWrapper handleSetCenter={props.handleSetCenter}  latitude={props.latitude} longitude={props.longitude} handleMapClick={props.handleMapClick} rowPadding={props.rowPadding} mapHeight={props.mapHeight} />
        <div>
          <button className="big ui button" onClick={props.handleCenter}>
            re-center
          </button>
        </div>

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
  )
}

MapRowComponent.PropTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  handleCenter: PropTypes.func.isRequired,
  handleMapClick: PropTypes.func.isRequired,
  handleSetCenter: PropTypes.func.isRequired,
  mapHeight: PropTypes.number,
  rowPadding: PropTypes.number
}

module.exports = MapRowComponent;
