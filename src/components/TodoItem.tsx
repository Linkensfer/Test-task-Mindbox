import { memo } from "react"
import { ITodo } from "../models/models"
import { RemoveTodo } from "./RemoveTodo"
import { useDispatch } from 'react-redux'
import { updateTodo } from "../store/todoSlice"
import { AppDispatch } from '../store'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import styles from './TodoItem.module.scss'

interface TodoItemProps {
  unitElement: ITodo
}

export const TodoItem = memo(
  function TodoItem ({ unitElement }: TodoItemProps) {
    const dispatch = useDispatch<AppDispatch>()
    return (
      <ListItem className={styles.elem}>
        <ListItemButton onClick={() => dispatch(updateTodo(unitElement.id))} dense>
          <ListItemIcon>
            <Checkbox
              checked={unitElement.completed}
            />
          </ListItemIcon>
  
          <ListItemText primary={unitElement.content} />
        
        </ListItemButton>
  
        <RemoveTodo
          unitElement={unitElement}
        />
  
      </ListItem>
    )
  }  
)
