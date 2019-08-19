import React, { useState } from 'react'
import './todo.css'
//import { func } from 'prop-types';

export interface TodolistProps { }
export interface Todo {
  content: string,
  isCompleted: boolean,
}

const Todolist: React.FC<TodolistProps> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      content: 'Example TODO marked as finished',
      isCompleted: true,
    },
    {
      content: '"Backspace" on empty TODO deletes it',
      isCompleted: false,
    },
    {
      content: 'Move between TODOs using up and down arrow',
      isCompleted: false,
    },
    {
      content: '"Enter" to add TODO after current TODO',
      isCompleted: false,
    },
    {
      content: 'Click on check-circle to toggle TODO status',
      isCompleted: false,
    }
  ]);

  function handleKeyDown(e: any, i: number) {
    if (e.key === "Enter") {
      createTodoAtIndex(e, i);
    } else if (e.keyCode == '38') {
      if (i > 0) {
        let focusTodo: HTMLElement = document.forms[0].elements[i - 1] as HTMLElement;
        setTimeout(() => {
          focusTodo.focus();
        }, 0);
      }
    } else if (e.keyCode == '40') {
      if (i < todos.length - 1) {
        let focusTodo: HTMLElement = document.forms[0].elements[i + 1] as HTMLElement;
        setTimeout(() => {
          focusTodo.focus();
        }, 0);
      }
    } else if (e.key === 'Backspace' && todos[i].content === '') {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
  }

  function removeTodoAtIndex(i: number) {
    if (todos.length > 1) {
      let ntodos = [...todos];
      ntodos.splice(i, 1);
      setTodos(ntodos);
      if (i > 0) {
        let focusTodo: HTMLElement = document.forms[0].elements[i - 1] as HTMLElement;
        setTimeout(() => {
          focusTodo.focus();
        }, 0);
      }
    }
  }

  function createTodoAtIndex(e: any, i: number) {
    //BOOM just learned the ... new array thingy... -_-
    let ntodos = [...todos];
    ntodos.splice(i + 1, 0, {
      content: "",
      isCompleted: false
    });
    setTodos(ntodos);
    setTimeout(() => {
      let focusTodo: HTMLElement = document.forms[0].elements[i + 1] as HTMLElement;
      focusTodo.focus();
    }, 0);

  }

  function updateTodoAtIndex(e: any, i: number) {
    let ntodos = [...todos];
    ntodos[i].content = e.target.value;
    setTodos(ntodos);
  }

  function handleTodoStatusClicked(e: any, i: number) {
    let ntodos = [...todos];
    ntodos[i].isCompleted = !ntodos[i].isCompleted;
    setTodos(ntodos);
  }

  return (
    <>
      <h2>My own TODO-list app</h2>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <div
              className={"todo " + (todo.isCompleted ? 'todo-is-completed' : '')}
              key={i}>
              <div
                className="checkbox"
                onClick={e => handleTodoStatusClicked(e, i)} >
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </div>
              <input
                className=""
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>

      </form>
    </>
  )
}

export default Todolist