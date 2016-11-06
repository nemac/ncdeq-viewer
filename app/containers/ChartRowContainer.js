import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { get_ChartData, get_TRAData, update_ChartVisiblity, update_MapHeight, get_LayerInfo_ByValue, change_geographyLevelActive, set_search_method, get_tra_info, update_ChartLevels, update_HeaderVis} from '../actions/actionCreators'
import ChartRowComponent from '../components/ChartRowComponent'

//either rename the properties or rename it also in main
const mapStateToProps = (state,props) => {
  return {
    charts: state.chartData,
    default_settings: state.default_settings.default_settings,
    geography_levels: state.geography_levels.geography_levels,
    chart_levels: state.chartData.chart_levels,
    tra_data: state.traData.tra_data,
    traPointInfo: state.mapConfig.traPointInfo,
    NLCDPointInfo: state.mapConfig.NLCDPointInfo,
    traInfo: state.mapConfig.traInfo,
    huc8Info: state.mapConfig.huc8Info,
    searchMethod: state.mapConfig.searchMethod,
    fetching_chart: state.fetching_chart.fetching_chart,
    fetching_map: state.fetching_map.fetching_map,
    fetching_tra: state.fetching_tra.fetching_tra,

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
    set_search_method: bindActionCreators(set_search_method,dispatch),
    get_tra_info: bindActionCreators(get_tra_info,dispatch),
    update_ChartLevels: bindActionCreators(update_ChartLevels, dispatch),
    update_HeaderVis: bindActionCreators(update_HeaderVis, dispatch),
  }
}
const ChartRowContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowComponent)

export default ChartRowContainer
