import { TodoItem } from "./TodoItem"
import { useSelector } from 'react-redux'
import { RootState } from "../store"
import List from '@mui/material/List'
import styles from './TodoList.module.scss'

export function TodoList () {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const filter = useSelector((state: RootState) => state.todos.filter)

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })
  
  return (
    <List className={styles.list}>
      {filteredTodos.map(unitElement => (
        <TodoItem
          key={unitElement.id}
          unitElement={unitElement}
        />
      ))}
    </List>
  )
}
