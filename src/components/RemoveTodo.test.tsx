import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../store/todoSlice';
import { RemoveTodo } from './RemoveTodo';
import { ITodo } from '../models/models';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FilterType } from '../models/models'; 

describe('RemoveTodo', () => {
  const mockTodo: ITodo = {
    id: '1',
    content: 'Test task',
    completed: false
  };

  const createTestStore = (todos: ITodo[] = [mockTodo]) => {
    return configureStore({
      reducer: { todos: todoReducer },
      preloadedState: {
        todos: {
          todos,
          filter: 'all' as FilterType
        }
      }
    });
  };

  it('Модальное окно открывается при клике на иконку удаления', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <RemoveTodo unitElement={mockTodo} />
      </Provider>
    );

    expect(screen.queryByText('Удаление элемента')).not.toBeInTheDocument();

    // Ищем иконку по aria-label
    const deleteIcon = screen.getByLabelText('Удалить задачу');
    await userEvent.click(deleteIcon);

    expect(screen.getByText('Удаление элемента')).toBeInTheDocument();
    expect(screen.getByText('Вы действительно хотите удалить задачу?')).toBeInTheDocument();
  });

  it('Задача удаляется после подтверждения', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <RemoveTodo unitElement={mockTodo} />
      </Provider>
    );

    await userEvent.click(screen.getByLabelText('Удалить задачу'));
    await userEvent.click(screen.getByText('Да')); // Ищем по точному тексту

    expect(store.getState().todos.todos).toHaveLength(0);
    expect(screen.queryByText('Удаление элемента')).not.toBeInTheDocument();
  });

  it('Задача не удаляется при отмене', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <RemoveTodo unitElement={mockTodo} />
      </Provider>
    );

    await userEvent.click(screen.getByLabelText('Удалить задачу'));
    await userEvent.click(screen.getByText('Отмена')); // Ищем по точному тексту

    expect(store.getState().todos.todos).toHaveLength(1);
    expect(screen.queryByText('Удаление элемента')).not.toBeInTheDocument();
  });
});
