import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_MenuList, get_ChartData, change_geographyLevelActive, change_geographyLevelFilter, handleSearchChange, update_ChartVisiblity, update_MapHeight } from '../actions/actionCreators'

//import components
import MenuComponent from '../components/MenuComponent'

//either rename the properties or rename it also in main
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
    get_MenuList: bindActionCreators(get_MenuList, dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
    update_MapHeight: bindActionCreators(update_MapHeight, dispatch),
    change_geographyLevelActive: bindActionCreators(change_geographyLevelActive,dispatch),
    change_geographyLevelFilter: bindActionCreators(change_geographyLevelFilter,dispatch),
    get_ChartData: bindActionCreators(get_ChartData,dispatch),
    handleSearchChange: bindActionCreators(handleSearchChange, dispatch),
  }
}

const MenuContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MenuComponent)

export default MenuContainer
