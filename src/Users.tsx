import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import IUser from './Interfaces'

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    let r = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await r.json();
    setUsers(users);
  };

  useEffect(() => { getUsers(); }, []);

  return (
    <>
      <h1>Users</h1>
      <ul>
        {
          users.map((user, key) => (
            <li key={key}><Link to={`/user/${user.id}`}>{user.id} {user.name}</Link></li>
          ))
        }
      </ul>
    </>
  );
}

export default Users;
