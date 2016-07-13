import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_defaultMapData, HandleMapEnd, set_mapToPoint, update_ChartVisiblity, update_MapHeight, get_ChartData, change_geographyLevelActive,  change_geographyLevelFilter, set_MapLayers, set_LeafletMap} from '../actions/actionCreators'

//import components
import MapComponent from '../components/MapComponent'

//either rename the properties or rename it also in main
const mapStateToProps = (state,props) => {

  //Need to understand how to git rid of dthe double dot names... mapConfig.mapconfig default_settings.default_settings
  //  needs to happen in reducers i think?
  let map_settings = state.mapConfig.mapconfig;
  let charts = state.chartData;
  let default_settings = state.default_settings.default_settings;
  let leafletMap = state.leafletMap;

  return {
    charts,
    map_settings,
    default_settings,
    leafletMap,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_defaultMapData: bindActionCreators(get_defaultMapData, dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
    HandleMapEnd: bindActionCreators(HandleMapEnd, dispatch),
    set_mapToPoint: bindActionCreators(set_mapToPoint, dispatch),
    update_MapHeight: bindActionCreators(update_MapHeight, dispatch),
    change_geographyLevelActive: bindActionCreators(change_geographyLevelActive,dispatch),
    change_geographyLevelFilter: bindActionCreators(change_geographyLevelFilter,dispatch),
    get_ChartData: bindActionCreators(get_ChartData,dispatch),
    set_MapLayers: bindActionCreators(set_MapLayers,dispatch),
    set_LeafletMap: bindActionCreators(set_LeafletMap,dispatch),
  }
}

const MapContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MapComponent)

export default MapContainer
