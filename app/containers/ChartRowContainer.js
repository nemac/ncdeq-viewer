import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { set_CurrentID, get_ChartData} from '../actions/actionCreators'
import ChartRowComponent from '../components/ChartRowComponent'


const mapStateToProps = (state) => {
  return {
    current_id: state.CurrentID.current_id,
    chart_data: state.chartData.chart_data,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_ChartData: bindActionCreators(get_ChartData,dispatch)
  }
}

const ChartRowContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowComponent)

export default ChartRowContainer
