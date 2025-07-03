import axios from "axios";
import { FETCH_TODOS, ADD_TODO, ADD_TODO_ERROR } from "./types";

export const addTodo = (task) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:9091/api/todo", { task });
    console.log("Add response:", response.data);
    dispatch({
      type: ADD_TODO,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADD_TODO_ERROR,
      payload: error.message
    });
  }
}

export function fetchTodos() {
  return function(dispatch) {
    return axios.get("http://localhost:9091/api/todo").then(({ data }) => {
      console.log("Todos received:", data.todos);
      dispatch(setTodos(data.todos));
    });
  };
}

function setTodos(todosArray) {
  return {
    type: FETCH_TODOS,
    payload: todosArray
  };
}