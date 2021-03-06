import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { set_defaults, set_search_method, get_defaultMapData, HandleMapEnd, set_mapToPoint, update_ChartVisiblity,
          get_ChartData, change_geographyLevelActive,  change_geographyLevelFilter, set_MapLayers, set_LeafletMap,
          get_LayerInfo_ByPoint, update_HeaderVis, get_nlcd_data, get_catchment_data, get_nlcd_data_huc12,
          get_LayerGeom_ByValue, get_all_geometries, use_imagery} from '../actions/actionCreators'

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
  let geography_levels = state.geography_levels.geography_levels;
  let layerInfo = state.mapConfig.layerinfo;
  let traPointInfo = state.mapConfig.traPointInfo;
  let NLCDPointInfo = state.mapConfig.NLCDPointInfo;
  let huc8Info = state.mapConfig.huc8Info;
  let searchMethod = state.mapConfig.searchMethod;
  let traInfo = state.mapConfig.traInfo;
  let fetching_chart = state.fetching_chart.fetching_chart;
  let fetching_map = state.fetching_map.fetching_map;
  let fetching_tra = state.fetching_tra.fetching_tra;
  let fetching_geo = state.fetching_geo.fetching_geo;
  let fetching_menu = state.fetching_geo.fetching_menu;
  let hoverInfo = state.mapConfig.hoverInfo;

  return {
    charts,
    geography_levels,
    map_settings,
    default_settings,
    leafletMap,
    layerInfo,
    traInfo,
    traPointInfo,
    huc8Info,
    searchMethod,
    NLCDPointInfo,
    fetching_chart,
    fetching_map,
    fetching_tra,
    fetching_geo,
    fetching_menu,
    hoverInfo,
    active_hover: state.active_hover.active_hover,
    geometries: state.geometries.geometries,
    imagery_visibility: state.imagery_visibility.visibility,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_defaultMapData: bindActionCreators(get_defaultMapData, dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
    HandleMapEnd: bindActionCreators(HandleMapEnd, dispatch),
    set_mapToPoint: bindActionCreators(set_mapToPoint, dispatch),
    change_geographyLevelActive: bindActionCreators(change_geographyLevelActive,dispatch),
    change_geographyLevelFilter: bindActionCreators(change_geographyLevelFilter,dispatch),
    get_ChartData: bindActionCreators(get_ChartData,dispatch),
    set_MapLayers: bindActionCreators(set_MapLayers,dispatch),
    set_LeafletMap: bindActionCreators(set_LeafletMap,dispatch),
    get_LayerInfo_ByPoint: bindActionCreators(get_LayerInfo_ByPoint,dispatch),
    set_search_method: bindActionCreators(set_search_method,dispatch),
    update_HeaderVis: bindActionCreators(update_HeaderVis, dispatch),
    get_nlcd_data: bindActionCreators(get_nlcd_data, dispatch),
    get_nlcd_data_huc12: bindActionCreators(get_nlcd_data_huc12, dispatch),
    get_catchment_data: bindActionCreators(get_catchment_data, dispatch),
    get_LayerGeom_ByValue: bindActionCreators(get_LayerGeom_ByValue, dispatch),
    get_all_geometries: bindActionCreators(get_all_geometries, dispatch),
    use_imagery: bindActionCreators(use_imagery, dispatch),
    set_defaults: bindActionCreators(set_defaults, dispatch),

  }
}

const MapContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MapComponent)

export default MapContainer
