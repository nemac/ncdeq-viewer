
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import ResourcesComponent from '../components/ResourcesComponent';


//import actions
import {  update_HeaderVis } from '../actions/actionCreators'

//either rename the properties or rename it also in main
function mapStateToProps(state) {

  return {
    charts: state.chartData,
    default_settings: state.default_settings.default_settings,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update_HeaderVis: bindActionCreators(update_HeaderVis, dispatch),
  }
}

const ResourcesContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ResourcesComponent)

export default ResourcesContainer
