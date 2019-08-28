import { HotKeys } from "react-hotkeys";

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home'
import Users from './Users'
import User from './User'
import Todolist from './Todolist'
import Weather from './Weather'
import Calculator from './Calculator'


const keyMap = {
  MOVE_UP: "up",
  GLOBAL_SEARCH: "f",
}

const handlers = {
  MOVE_UP: (event: any) => console.log("Move up hotkey called!"),
  GLOBAL_SEARCH: (event: any) => console.log("SEARCH FFS YAY!")
}

const App: React.FC = () => {
  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <Router >
        <Header />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/user/:id" component={User} />
          <Route path="/todolist" component={Todolist} />
          <Route path="/weather" component={Weather} />
          <Route path="/calculator" component={Calculator} />
        </div>
      </Router>
    </HotKeys>
  );
}

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <span className="navbar-brand mb-0 h1">Playground</span>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/todolist">Todolist</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/weather">Weather</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/calculator">Calculator</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
