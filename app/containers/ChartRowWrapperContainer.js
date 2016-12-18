import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { get_ChartData, get_TRAData, update_ChartVisiblity,
         get_LayerInfo_ByValue, change_geographyLevelActive, set_search_method,
         get_tra_info, update_ChartLevels, update_HeaderVis, get_nlcd_data, get_nlcd_data_huc12,
         get_catchment_data, get_LayerGeom_ByValue, get_all_geometries, get_chart_buttons} from '../actions/actionCreators'

import ChartRowWrapper from '../components/ChartRowWrapper'

//either rename the properties or rename it also in main
const mapStateToProps = (state,props) => {
  return {
    // charts: state.chartData,
    // default_settings: state.default_settings.default_settings,
    // geography_levels: state.geography_levels.geography_levels,
    // chart_levels: state.chartData.chart_levels,
    // tra_data: state.traData.tra_data,
    // traPointInfo: state.mapConfig.traPointInfo,
    // NLCDPointInfo: state.mapConfig.NLCDPointInfo,
    // searchMethod: state.mapConfig.searchMethod,
    // fetching_chart: state.fetching_chart.fetching_chart,
    // fetching_map: state.fetching_map.fetching_map,
    // fetching_tra: state.fetching_tra.fetching_tra,
    // fetching_geo: state.fetching_geo.fetching_geo,
    // fetching_menu: state.fetching_menu.fetching_menu,
    // ncld_chart_data: state.NLCDDATA.ncld_chart_data,
    // ncld_chart_data_huc12: state.NLCDDATA.ncld_chart_data_huc12,
    // catchment_chart_ar: state.CATCHMENTDATA.catchment_chart_ar,
    chart_buttons: state.chart_buttons.chart_buttons,

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // get_ChartData: bindActionCreators(get_ChartData,dispatch),
    // get_TRAData: bindActionCreators(get_TRAData,dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
    // get_LayerInfo_ByValue: bindActionCreators(get_LayerInfo_ByValue, dispatch),
    // change_geographyLevelActive: bindActionCreators(change_geographyLevelActive,dispatch),
    // set_search_method: bindActionCreators(set_search_method,dispatch),
    // get_tra_info: bindActionCreators(get_tra_info,dispatch),
    // update_ChartLevels: bindActionCreators(update_ChartLevels, dispatch),
    // update_HeaderVis: bindActionCreators(update_HeaderVis, dispatch),
    // get_nlcd_data: bindActionCreators(get_nlcd_data, dispatch),
    // get_catchment_data: bindActionCreators(get_catchment_data, dispatch),
    // get_LayerGeom_ByValue: bindActionCreators(get_LayerGeom_ByValue, dispatch),
    // get_all_geometries: bindActionCreators(get_all_geometries, dispatch),
    // get_chart_buttons:  bindActionCreators(get_chart_buttons, dispatch),

  }
}
const ChartRowWrapperContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowWrapper)

export default ChartRowWrapperContainer
