import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, MARK_COMPLETED, MARK_INCOMPLETE, UPDATE_SEARCH_TERM, FILTER_LIST, MARK_ALL_AS_DONE } from './actionTypes';

const initialState = {
  todos: [],
  filter: 'ALL',
  searchTerm: '',
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { text: action.payload.text, completed: false, id: Date.now() }],
      };

      case TOGGLE_TODO:
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
          ),
        };
      
      case REMOVE_TODO:
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload.id),
        };

      case MARK_COMPLETED:
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, completed: true }
              : todo
          ),
        };
  
      case MARK_INCOMPLETE:
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, completed: false }
              : todo
          ),
        };
        
      case FILTER_LIST:
          return {
          ...state,
            filter: action.payload.filter,
          };

    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case MARK_ALL_AS_DONE:
      return {
        ...state,
        todos: state.todos.map((todo) => ({ ...todo, completed: true })),
      };

    default:
      return state;
  }
};

export default todoReducer;