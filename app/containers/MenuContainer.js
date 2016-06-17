import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import actions
import { get_MenuList, get_ChartData_byID, set_CurrentID } from '../actions/actionCreators'

//import components
import MenuComponent from '../components/MenuComponent'


const mapStateToProps = (state,props) => {
  let RiverBasinData = state.menuLists.lists;
  let current_id = state.setCurrentID.current_id;
  let theChartDataByID = state.chartDataByID.chart_data;
  //console.log(state)
  return {
    theChartDataByID,
    RiverBasinData,
    current_id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMenus: bindActionCreators(get_MenuList, dispatch),
    setCurrentID: bindActionCreators(set_CurrentID, dispatch),
    getChartDataByID: bindActionCreators(get_ChartData_byID, dispatch),
  }
}

const MenuContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MenuComponent)

export default MenuContainer
