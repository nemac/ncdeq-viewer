import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_defaultMapData, update_ChartVisiblity } from '../actions/actionCreators'

//import components
import MapComponent from '../components/MapComponent'

//either rename this or rename it also in main
const mapStateToProps = (state,props) => {
  let mapConfig = state.mapConfig
  let charts = state.chartData;

  return {
    charts,
    mapConfig,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_defaultMapData: bindActionCreators(get_defaultMapData, dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
  }
}

const MapContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MapComponent)

export default MapContainer
