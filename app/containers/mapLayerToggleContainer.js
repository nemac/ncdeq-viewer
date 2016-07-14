import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_defaultMapData, set_MapLayers} from '../actions/actionCreators'

//import components
import MapLayerToggleWrapper from '../components/MapLayerToggleWrapper'

//either rename the properties or rename it also in main
const mapStateToProps = (state,props) => {

  //Need to understand how to git rid of dthe double dot names... mapConfig.mapconfig default_settings.default_settings
  //  needs to happen in reducers i think?
  let map_settings = state.mapConfig.mapconfig;
  let leafletMap = state.leafletMap;

  return {
    map_settings,
    leafletMap,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_defaultMapData: bindActionCreators(get_defaultMapData, dispatch),
    set_MapLayers: bindActionCreators(set_MapLayers,dispatch)
  }
}

const MapLayerToggleContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MapLayerToggleWrapper)

export default MapLayerToggleContainer
