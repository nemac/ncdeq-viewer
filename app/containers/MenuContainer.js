import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_MenuList, get_ChartData_byID, set_CurrentID, get_AllChartData_byID } from '../actions/actionCreators'

//import components
import MenuComponent from '../components/MenuComponent'


const mapStateToProps = (state,props) => {
  let MenuData = state.menuLists.lists;
  let current_id = state.CurrentID.current_id;
  let theChartDataByID = state.chartDataByID.chart_data;
  let AllChartDataByID = state.AllChartDataByID.all_chart_data
  //console.log(state)
  return {
    AllChartDataByID,
    theChartDataByID,
    MenuData,
    current_id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMenus: bindActionCreators(get_MenuList, dispatch),
    setCurrentID: bindActionCreators(set_CurrentID, dispatch),
    getChartDataByID: bindActionCreators(get_ChartData_byID, dispatch),
    getAllChartDataByID: bindActionCreators(get_AllChartData_byID, dispatch),
  }
}

const MenuContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MenuComponent)

export default MenuContainer
