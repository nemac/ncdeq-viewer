import { connect } from 'react-redux'
import { getLists } from '../actions/actionCreators'
import MenuItemComponent from '../components/MenuItemComponent'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state,props) => {
  return {
        listData: state.listData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: () => {
      dispatch(getLists())
    }
  }
}

const MenuItemContainer
 = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItemComponent)

export default MenuItemContainer
