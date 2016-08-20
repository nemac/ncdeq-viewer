import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { get_ChartData, update_ChartVisiblity, update_MapHeight, get_LayerInfo_ByValue} from '../actions/actionCreators'
import ChartRowComponent from '../components/ChartRowComponent'

//either rename the properties or rename it also in main
const mapStateToProps = (state,props) => {
  return {
    charts: state.chartData,
    default_settings: state.default_settings.default_settings,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_ChartData: bindActionCreators(get_ChartData,dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
    update_MapHeight: bindActionCreators(update_MapHeight, dispatch),
    get_LayerInfo_ByValue: bindActionCreators(get_LayerInfo_ByValue, dispatch),
  }
}

const ChartRowContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowComponent)

export default ChartRowContainer
