import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './store/todoSlice'
import App from './App'
import { Footer } from './components/Footer'
import { FilterType } from './types/types'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  const createTestStore = () => {
    return configureStore({
      reducer: {
        todos: todoReducer
      }
    })
  }

  it('Проверка вывода сообщения «Пока нет задач»', () => {
    const store = createTestStore()

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(screen.getByText('Пока нет задач')).toBeInTheDocument()
  })

  it('Проверка отображения компонентов TodoList и Footer, когда есть задачи', () => {
    const store = configureStore({
      reducer: { todos: todoReducer },
      preloadedState: {
        todos: {
          todos: [{ id: '1', content: 'Тест', completed: false }],
          filter: 'all' as FilterType
        }
      }
    })

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('1 items left')).toBeInTheDocument()
  })

  it('Проверка: Footer не отображается, когда нет задач', () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    
    expect(screen.queryByText(/items left/i)).not.toBeInTheDocument()
  })

  it('Проверка правильного отображения количества активных задач', () => {
    const store = configureStore({
      reducer: { todos: todoReducer },
      preloadedState: {
        todos: {
          todos: [
            { id: '1', content: 'Тест 1', completed: false },
            { id: '2', content: 'Тест 2', completed: true }
          ],
          filter: 'all' as FilterType
        }
      }
    })
  
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  
    expect(screen.getByText('1 items left')).toBeInTheDocument()
  })

  it('Проверка: добавление задачи обновляет счетчик в Footer', async () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  
    await userEvent.type(screen.getByPlaceholderText('Add todos...'), 'Новая задача')
    await userEvent.click(screen.getByText('Add Todo'))

    const footerCounter = await screen.findByText('1 items left')
    expect(footerCounter).toBeInTheDocument()
  })

})
