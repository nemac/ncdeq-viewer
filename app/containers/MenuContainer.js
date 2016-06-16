import { connect } from 'react-redux'
import { get_MenuList } from '../actions/actionCreators'
import MenuComponent from '../components/MenuComponent'


const mapStateToProps = (state) => {
  let RiverBasinData = state.menuLists.lists;
  return {RiverBasinData}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMenus: () => {
      dispatch(get_MenuList())
    },
  }
}

const MenuContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MenuComponent)

export default MenuContainer
