
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import actions
import { set_constants} from '../actions/actionCreators';
import HeaderComponent from '../components/HeaderComponent';

//either rename the properties or rename it also in main
const mapStateToProps = (state, props) => {
  let constants = state.constants.constants;

  return {
    constants,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    set_constants: bindActionCreators(set_constants, dispatch),
  }
}

const HeaderContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(HeaderComponent)

export default HeaderContainer
