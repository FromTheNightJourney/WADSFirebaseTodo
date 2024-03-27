// actions.js
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  UPDATE_SEARCH_TERM,
  MARK_ALL_AS_DONE,
  FILTER_LIST,
} from './actionTypes';

import { v4 as uuidv4 } from 'uuid';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text, id: uuidv4() },
});

export const toggleTodo = (id, completed) => ({
  type: TOGGLE_TODO,
  payload: { id, completed },
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});

export const markCompleted = (id) => ({
  type: MARK_COMPLETED,
  payload: { id },
});

export const markIncomplete = (id) => ({
  type: MARK_INCOMPLETE,
  payload: { id },
});

export const filterTodos = (filter) => ({
  type: FILTER_LIST,
  payload: { filter },
});

export const markAllCompleted = () => ({
  type: MARK_ALL_AS_DONE,
});

export const updateSearchTerm = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  payload: { searchTerm },
});

