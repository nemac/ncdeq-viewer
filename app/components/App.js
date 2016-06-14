
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import MainComponent from '../components/MainComponent';

function mapStateToProps(state) {
  //console.log(state.listData)
  return {
    listData: state.listData
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(MainComponent);

export default App;
