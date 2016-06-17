import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { get_ChartData_byID, set_CurrentID } from '../actions/actionCreators'
import ChartRowWrapper from '../components/ChartRowWrapper'


const mapStateToProps = (state) => {
  console.log(state)
  let theChartDataByID = state.chartDataByID.data;
  return {theChartDataByID}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      getChartDataByID: bindActionCreators(get_ChartData_byID, dispatch),
      setCurrentID: bindActionCreators(set_CurrentID, dispatch)
  }
}

const ChartRowWrapperContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowWrapper)

export default ChartRowWrapperContainer
