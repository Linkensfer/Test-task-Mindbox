import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../store"
import { deleteCompletedTodo, setFilter } from "../store/todoSlice"
import { AppDispatch } from '../store'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import styles from './Footer.module.scss'

export function Footer () {
  const todos = useSelector((state: RootState) => state.todos.todos)

  const dispatch = useDispatch<AppDispatch>()

  const countLeftTodo = todos.filter(todo => !todo.completed).length
  
  return (
    <div className={styles.wrapper}>
      <Box>{countLeftTodo} items left</Box>

      <Box className={styles.footer}>
        <ButtonGroup size="small" aria-label="Small button group">
          <Button key="one" onClick={() => dispatch(setFilter('all'))}>All</Button>
          <Button key="two" onClick={() => dispatch(setFilter('active'))}>Active</Button>
          <Button key="three" onClick={() => dispatch(setFilter('completed'))}>Completed</Button>
          <Button key="four"
            onClick={() => dispatch(deleteCompletedTodo())}
            disabled={!todos.some(todo => todo.completed)}
          >
            Clear Completed
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}
