import { connect } from 'react-redux'
import { menuList, get_basinsAC } from '../actions/actionCreators'
import MenuComponent from '../components/MenuComponent'


const mapStateToProps = (state,props) => {
  return {
        listData: state.listData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMenuClick: () => {
      dispatch(get_basinsAC())
    }
  }
}

const MenuContainer
 = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent)

export default MenuContainer
