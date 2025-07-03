import React, {Component} from "react";
import Todo from "./Todo";
import {fetchTodos, addTodo} from "../actions";
import {connect} from "react-redux";

class TodoList extends Component {
  state = {
    newTask: ""
  };

  componentDidMount() {
    this.props.fetchTodos();
  }

  handleChange = (e) => {
    this.setState({ newTask: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTask.trim()) {
      this.props.addTodo(this.state.newTask);
      this.setState({ newTask: "" })
    }
  }

  render() {
    const { todos } = this.props;
    console.log("Current todos in component:", todos);

    return (
      <div>
        {/* Form */}
        <form onSubmit={this.handleSubmit} className="add-todo-form">
          <input
            type="text"
            value={this.state.newTask}
            onChange={this.handleChange}
            placeholder="Add new task..."
          />
          <button type="submit">Add Todo</button>
        </form>

        {/* Todo List */}
        <ul className="todo-list">
          {todos && todos.length ? (
            todos.map((todo) => (
              <Todo 
                key={`todo-${todo.task_id}`} 
                todo={todo.task}
              />
            ))
          ) : (
            "No todos, yay!"
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  isLoading: state.loading,
  error: state.error
});

// const mapDispatchToProps = {
//   fetchTodos,
//   addTodo
// }

export default connect(mapStateToProps, { fetchTodos, addTodo })(TodoList);