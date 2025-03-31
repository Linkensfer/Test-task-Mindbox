import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITodo, FilterType } from "../models/models"

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as ITodo[],
    filter: 'all' as FilterType
  },
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: new Date().toISOString(),
        content: action.payload,
        completed: false
      });
    },
    updateTodo(state, action: PayloadAction<string>) {
      const toggledTodo: ITodo | undefined = state.todos.find(todo => todo.id === action.payload)
      if (toggledTodo) {toggledTodo.completed = !toggledTodo.completed}
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    deleteCompletedTodo(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload
    },
  }
})

export const {addTodo, updateTodo, deleteTodo, deleteCompletedTodo, setFilter } = todoSlice.actions

export default todoSlice.reducer
