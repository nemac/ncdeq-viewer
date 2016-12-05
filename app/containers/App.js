
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import MainComponent from '../components/MainComponent';

//either rename the properties or rename it also in main
function mapStateToProps(state) {
  let charts = state.chartData;
  let default_settings = state.default_settings.default_settings;

  return {
    charts,
    default_settings,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default App;
