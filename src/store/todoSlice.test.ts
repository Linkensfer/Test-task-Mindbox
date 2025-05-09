import todoReducer, {
  addTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodo,
  setFilter
} from './todoSlice'
import { ITodo } from "../types/types"

describe('todoSlice', () => {
  const initialState = {
    todos: [] as ITodo[],
    filter: 'all' as const
  }

  it('Проверка обработки начального состояния', () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('Проверка обработки addTodo', () => {
    const content = 'Новая задача'
    const actual = todoReducer(initialState, addTodo(content))
    
    expect(actual.todos).toHaveLength(1)
    expect(actual.todos[0].content).toEqual(content)
    expect(actual.todos[0].completed).toBe(false)
  })

  it('Проверка обработки updateTodo', () => {
    const todo = { id: '1', content: 'Test', completed: false }
    const state = { ...initialState, todos: [todo] }
    
    const actual = todoReducer(state, updateTodo('1'))
    expect(actual.todos[0].completed).toBe(true)
  })

  it('Проверка обработки deleteTodo', () => {
    const todo = { id: '1', content: 'Test', completed: false }
    const state = { ...initialState, todos: [todo] }
    
    const actual = todoReducer(state, deleteTodo('1'))
    expect(actual.todos).toHaveLength(0)
  })

  it('Проверка обработки deleteCompletedTodo', () => {
    const todos = [
      { id: '1', content: 'Задача 1', completed: false },
      { id: '2', content: 'Задача 2', completed: true }
    ]
    const state = { ...initialState, todos }
    
    const actual = todoReducer(state, deleteCompletedTodo())
    expect(actual.todos).toHaveLength(1)
    expect(actual.todos[0].id).toBe('1')
  })

  it('Проверка обработки setFilter', () => {
    const actual = todoReducer(initialState, setFilter('active'))
    expect(actual.filter).toBe('active')
  })
})
