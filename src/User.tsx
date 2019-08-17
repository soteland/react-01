import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import IUser, { ICompany, IGeo, IAddress } from './Interfaces'
import Todos from './Todos'

export interface UserProps extends RouteComponentProps<{ id: string; }> { }

const User: React.FC<UserProps> = ({ match: { params: { id } } }) => {
  const [user, setUser] = useState<IUser>({
    id: null,
    name: null,
    username: null,
    email: null,
    address: null,
    phone: null,
    website: null,
    company: null
  });
  const [company, setCompany] = useState<ICompany>({
    name: null,
    catchPhrase: null,
    bs: null
  });

  const getUser = async () => {
    let r = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    let user = await r.json();
    setUser(user);
    setCompany(user.company);
  }

  useEffect(() => { getUser() }, [id])

  return (
    <>
      <div className="card">
        <div className="card-header">
          Brukerinfo
        </div>
        <div className="card-body">
          <h5 className="card-title">{user.name} ({user.id})</h5>
          <h6 className="card-subtitle mb-2 text-muted">Brukernavn: {user.username}</h6>
          <ul className="card-text">
            <li>E-post: {user.email}</li>
            <li>Tlf: {user.phone}</li>
            <li>URL: {user.website}</li>
            <li>Bedrift: {company.name}</li>
          </ul>
        </div>
      </div>
      <Todos userid={user.id} />
    </ >
  );
}

export default User;
