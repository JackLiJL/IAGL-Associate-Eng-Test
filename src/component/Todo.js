import React from "react";
import { connect } from "react-redux";

const Todo = ({ todo }) => {
  const taskText = typeof todo === 'string' ? todo : todo.task;
  return (
    <li className="todo-item">
      <span
        className="todo-item__text"
      >
        {taskText}
      </span>
    </li>
  );
};

export default Todo;
// export default connect(
//   null
// )(Todo);