import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import { ITodo } from './Interfaces'

export interface TodosProps {
  userid: number | null,
}

const Todos: React.FC<TodosProps> = ({ userid }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const getUser = async () => {
    let r = await fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${userid}`);
    let todos = await r.json();
    setTodos(todos);
  }

  useEffect(() => { getUser() }, [userid])

  return (
    <>
      <div className="card">
        <div className="card-header">
          Todos
        </div>
        <ul>
          {todos.map((todo, key) => (
            <li key={key} > {todo.title}</li>
          ))}
        </ul>
      </div>
    </ >
  );
}

export default Todos;
