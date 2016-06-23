import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { update_ChartVisiblity } from '../actions/actionCreators'

//import components
import MapComponent from '../components/MapComponent'

//either rename this or rename it also in main
const mapStateToProps = (state,props) => {
  let charts = state.chartData;

  return {
    charts,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
  }
}

const MapContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MapComponent)

export default MapContainer
