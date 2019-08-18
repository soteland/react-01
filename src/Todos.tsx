import React, { useState, useEffect } from 'react';
import { ITodo } from './Interfaces'

export interface TodosProps {
  userid: number | null,
}

const Todos: React.FC<TodosProps> = ({ userid }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async () => {
    let r = await fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${userid}`);
    let todos = await r.json();
    setTodos(todos);
    setIsLoading(true);
  }

  // eslint-disable-next-line
  useEffect(() => { getUser() }, [userid])

  function handleClick(i: number) {
    let newTodos = todos;
    newTodos[i].completed = !newTodos[i].completed;
    setTodos(newTodos);
    setIsLoading(!isLoading);
  }

  function handleClickDelete(i: number) {
    let newTodos = todos;
    newTodos.splice(i, 1);
    setTodos(newTodos);
    setIsLoading(!isLoading);
  }

  return (
    <>
      <h1>Todos</h1>
      <div className="list-group mb-3">
        {todos.map((todo, key) => (
          <div
            className={"list-group-item list-group-item-action" +
              (todo.completed ? ' list-group-item-success' : '')}
            key={key}
            onClick={() => handleClick(key)}
          >
            {todo.title}
            <button className="btn float-right btn-danger" onClick={() => handleClickDelete(key)}>X</button>
          </div>
        ))}
      </div>

    </ >
  );
}

export default Todos;
