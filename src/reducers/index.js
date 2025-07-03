import { FETCH_TODOS, ADD_TODO, ADD_TODO_ERROR } from "../actions/types";

const initialState = {
  todos: [],
  loading: false,
  error: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return { 
        ...state,
        todos: action.payload,
        error: null
      };
    
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        loading: false,
        error: null
      };

    case ADD_TODO_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    default:
      return state;
  }
}