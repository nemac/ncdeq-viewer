import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { get_ChartData, get_TRAData, update_ChartVisiblity, update_MapHeight, get_LayerInfo_ByValue, change_geographyLevelActive} from '../actions/actionCreators'
import ChartRowComponent from '../components/ChartRowComponent'

//either rename the properties or rename it also in main
const mapStateToProps = (state,props) => {
  return {
    charts: state.chartData,
    default_settings: state.default_settings.default_settings,
    geography_levels: state.geography_levels.geography_levels,
    tra_data: state.traData.tra_data,
    traInfo: state.mapConfig.trainfo,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_ChartData: bindActionCreators(get_ChartData,dispatch),
    get_TRAData: bindActionCreators(get_TRAData,dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
    update_MapHeight: bindActionCreators(update_MapHeight, dispatch),
    get_LayerInfo_ByValue: bindActionCreators(get_LayerInfo_ByValue, dispatch),
    change_geographyLevelActive: bindActionCreators(change_geographyLevelActive,dispatch),
  }
}
const ChartRowContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowComponent)

export default ChartRowContainer
