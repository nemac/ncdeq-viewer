import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { get_ChartData, update_ChartVisiblity} from '../actions/actionCreators'
import ChartRowComponent from '../components/ChartRowComponent'


const mapStateToProps = (state,props) => {
  return {
    charts: state.chartData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_ChartData: bindActionCreators(get_ChartData,dispatch),
    update_ChartVisiblity: bindActionCreators(update_ChartVisiblity, dispatch),
  }
}

const ChartRowContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChartRowComponent)

export default ChartRowContainer
