
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import ResourcesComponent from '../components/ResourcesComponent';

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

const ResourceContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ResourcesComponent)

export default ResourceContainer
