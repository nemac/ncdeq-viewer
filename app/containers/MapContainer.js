import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_defaultMapData, HandleMapEnd, set_mapToPoint, update_ChartVisiblity } from '../actions/actionCreators'

//import components
import MapComponent from '../components/MapComponent'

//either rename this or rename it also in main
const mapStateToProps = (state,props) => {
  let map_settings = state.mapConfig.mapconfig

  let charts = state.chartData;

  return {
    charts,
    map_settings,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_defaultMapData: bindActionCreators(get_defaultMapData, dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
    HandleMapEnd: bindActionCreators(HandleMapEnd, dispatch),
    set_mapToPoint: bindActionCreators(set_mapToPoint, dispatch),
  }
}

const MapContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MapComponent)

export default MapContainer
