import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { get_ChartData, get_TRAData, update_ChartVisiblity, update_MapHeight, get_LayerInfo_ByValue, change_geographyLevelActive, set_search_method, get_tra_info, update_ChartLevels, update_HeaderVis, get_nlcd_data, get_nlcd_data_huc12, get_catchment_data, get_LayerGeom_ByValue} from '../actions/actionCreators'
import ChartPieComponent from '../components/ChartPieComponent'

//either rename the properties or rename it also in main
const mapStateToProps = (state, props) => {
  return {
    chart_data: state.NLCDDATA.ncld_chart_data,
    chart_filter: state.chart_limit.chart_limit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_ChartData: bindActionCreators(get_ChartData,dispatch),
  }
}
const ChartPieContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartPieComponent)

export default ChartPieContainer
