
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import MainComponent from '../components/MainComponent';

function mapStateToProps(state) {

  let MenuData = state.menuLists.lists;
  let current_id = state.CurrentID.current_id;
  let theChartDataByID = state.chartDataByID.chart_data;
  let AllChartDataByID = state.AllChartDataByID.all_chart_data
  let geography_levels = state.geography_levels.geography_levels;

  return {
    AllChartDataByID,
    theChartDataByID,
    MenuData,
    current_id,
    geography_levels
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default App;
