import { connect } from 'react-redux'
import { get_ChartData_byID } from '../actions/actionCreators'
import ChartRowWrapper from '../components/ChartRowWrapper'


const mapStateToProps = (state) => {
  let theChartDataByID = state.chartDataByID.data;
  return {theChartDataByID}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getChartDataByID: (id) => {
      dispatch(get_ChartData_byID(id))
    },
  }
}

const ChartRowWrapperContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowWrapper)

export default ChartRowWrapperContainer
