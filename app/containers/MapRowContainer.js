import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { set_defaults } from '../actions/actionCreators'
import MapRowComponent from '../components/MapRowComponent';

//either rename the properties or rename it also in main
const mapStateToProps = (state, props) => {
  return {
    default_settings: state.default_settings.default_settings,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    set_defaults: bindActionCreators(set_defaults, dispatch),
  }
}
const MapRowContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MapRowComponent)

export default MapRowContainer
