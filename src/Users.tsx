import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
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
      <br /><h1>Users</h1><p>Getting users from a test API at JSONPLaceholder.typicode.com.</p><br />
      <div className="list-group">
        {
          users.map((user, key) => (
            <Link
              key={key}
              to={`/user/${user.id}`}
              className="list-group-item list-group-item-action">
              {user.id} {user.name}
            </Link>
          ))
        }
      </div>

    </>
  );
}

export default Users;
