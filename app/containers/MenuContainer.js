import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_MenuList, set_CurrentID, get_ChartData, change_geographyLevelActive, change_geographyLevelFilter } from '../actions/actionCreators'

//import components
import MenuComponent from '../components/MenuComponent'

//either rename this or rename it also in main
const mapStateToProps = (state,props) => {
  let DefaultMenuLists = state.menuLists.lists;
  let geography_levels = state.geography_levels.geography_levels;
  let charts = state.chartData;

  return {
    DefaultMenuLists,
    charts,
    geography_levels
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMenus: bindActionCreators(get_MenuList, dispatch),
    change_geographyLevelActive: bindActionCreators(change_geographyLevelActive,dispatch),
    change_geographyLevelFilter: bindActionCreators(change_geographyLevelFilter,dispatch),
    get_ChartData: bindActionCreators(get_ChartData,dispatch)
  }
}

const MenuContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MenuComponent)

export default MenuContainer
