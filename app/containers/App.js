
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import MainComponent from '../components/MainComponent';

//either rename the properties or rename it also in main
function mapStateToProps(state) {
  let DefaultMenuLists = state.menuLists.lists;
  let geography_levels = state.geography_levels.geography_levels;
  let charts = state.chartData;
  let map_settings = state.mapConfig.mapconfig;
  let default_settings = state.default_settings.default_settings;
  let leafletMap = state.leafletMap;

  return {
    DefaultMenuLists,
    geography_levels,
    charts,
    map_settings,
    default_settings,
    leafletMap
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default App;
