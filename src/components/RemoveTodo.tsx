import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../store/todoSlice'
import { ITodo } from "../types/types"
import { AppDispatch } from '../store'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

interface RemoveTodoProps {
  id: string
}

export function RemoveTodo({ id }: RemoveTodoProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDeleteAndClose = () => {
    dispatch(deleteTodo(id))
    setOpen(false)
  }

  return (
  <>
    <DeleteIcon aria-label="Удалить задачу" onClick={handleClickOpen}/> 
    <Dialog
      open={open}
      onClose={handleClose}
      role="button"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Удаление элемента"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы действительно хотите удалить задачу?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button aria-label="Отмена" onClick={handleClose}>Отмена</Button>
        <Button aria-label="Да" onClick={handleDeleteAndClose} autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  </>
  )
}
