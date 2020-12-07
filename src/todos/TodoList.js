import React, { useEffect } from "react";
import TodoListItem from "./TodoListItem";
import { connect } from "react-redux";
import { loadTodos } from "./thunks";
import NewTodoForm from "./NewTodoForm";
import { removeTodoRequest, updateTodoRequest } from "./thunks";
import {
  getTodosLoading,
  getIncompleteTodos,
  getCompleteTodos,
} from "./selectors";
import styled from "styled-components";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  completeTodos,
  incompleteTodos,
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos....</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm></NewTodoForm>
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      <h3>Complete:</h3>
      {completeTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};
const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  //todos:getTodos(state),
  completeTodos: getCompleteTodos(state),
  incompleteTodos: getIncompleteTodos(state),
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(updateTodoRequest(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
