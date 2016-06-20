import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { get_ChartData_byID, set_CurrentID, get_AllChartData_byID} from '../actions/actionCreators'
import ChartRowComponent from '../components/ChartRowComponent'


const mapStateToProps = (state) => {
  // let theChartDataByID = state.chartDataByID.chart_data;
  // let current_id = state.setCurrentID.current_id;
  return {
    theChartDataByID: state.chartDataByID.chart_data,
    AllChartDataByID: state.AllChartDataByID.all_chart_data,
    current_id: state.CurrentID.current_id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      getChartDataByID: bindActionCreators(get_ChartData_byID, dispatch),
      getAllChartDataByID: bindActionCreators(get_AllChartData_byID, dispatch),
      setCurrentID: bindActionCreators(set_CurrentID, dispatch)
  }
}

const ChartRowContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowComponent)

export default ChartRowContainer
