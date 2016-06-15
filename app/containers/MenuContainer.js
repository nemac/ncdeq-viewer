import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/actionCreators'
import MenuComponent from '../components/MenuComponent'

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case 'SHOW_ALL':
//       return todos
//     case 'SHOW_COMPLETED':
//       return todos.filter(t => t.completed)
//     case 'SHOW_ACTIVE':
//       return todos.filter(t => !t.completed)
//   }
// }

const mapStateToProps = (state,props) => {
  return {
        listData: state.listData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMenuClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: () => {
//       dispatch(getLists())
//     }
//   }
// }

const MenuContainer
 = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent)

export default MenuContainer
