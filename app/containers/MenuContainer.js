import { connect } from 'react-redux'
import { menuList, get_basinsAC } from '../actions/actionCreators'
import MenuComponent from '../components/MenuComponent'


const mapStateToProps = (state) => {
  let RiverBasinData = state.listData.lists;
  // console.log('redux props:')
  // console.log(RiverBasinData)
  return {RiverBasinData}
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
