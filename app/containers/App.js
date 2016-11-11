
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import MainComponent from '../components/MainComponent';

//either rename the properties or rename it also in main
function mapStateToProps(state) {
  let DefaultMenuLists = state.menuLists.lists;
  let geography_levels = state.geography_levels.geography_levels;
  let charts = state.chartData;
  let chart_levels = state.chart_levels;
  let map_settings = state.mapConfig.mapconfig;
  let default_settings = state.default_settings.default_settings;
  let leafletMap = state.leafletMap;
  let fetching_chart = state.fetching_chart.fetching_chart;
  let fetching_map = state.fetching_map.fetching_map;
  let fetching_tra = state.fetching_tra.fetching_tra;
  let NLCDData = state.NLCDDATA.NLCDData;
  let CATCHMENTData = state.CATCHMENTDATA.CATCHMENTData;

  return {
    DefaultMenuLists,
    geography_levels,
    chart_levels,
    charts,
    map_settings,
    default_settings,
    leafletMap,
    fetching_chart,
    fetching_map,
    fetching_tra,
    NLCDData,
    CATCHMENTData,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default App;
