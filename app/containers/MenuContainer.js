import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_MenuList, get_ChartData_byID, set_CurrentID, get_AllChartData_byID, change_geographyLevelActive, change_geographyLevelFilter } from '../actions/actionCreators'

//import components
import MenuComponent from '../components/MenuComponent'

//either rename this or rename it also in main
const mapStateToProps = (state,props) => {
  let CompleteMenuLists = state.menuLists.lists;
  let theChartDataByID = state.chartDataByID.chart_data;
  let AllChartDataByID = state.AllChartDataByID.all_chart_data;
  let geography_levels = state.geography_levels.geography_levels;

  return {
    AllChartDataByID,
    theChartDataByID,
    CompleteMenuLists,
    geography_levels
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMenus: bindActionCreators(get_MenuList, dispatch),
    //setCurrentID: bindActionCreators(set_CurrentID, dispatch),
    getChartDataByID: bindActionCreators(get_ChartData_byID, dispatch),
    getAllChartDataByID: bindActionCreators(get_AllChartData_byID, dispatch),
    change_geographyLevelActive: bindActionCreators(change_geographyLevelActive,dispatch),
    change_geographyLevelFilter: bindActionCreators(change_geographyLevelFilter,dispatch),
  }
}

const MenuContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MenuComponent)

export default MenuContainer
