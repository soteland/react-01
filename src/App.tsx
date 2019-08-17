import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home'
import Users from './Users'
import User from './User'

const App: React.FC = () => {
  return (
    <Router >
      <Header />
      <div className="container">
        <h1>Playground</h1>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/user/:id" component={User} />
      </div>
    </Router>
  );
}

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user">User</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
