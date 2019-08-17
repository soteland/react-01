import React, { useEffect, useState } from 'react';

export interface ITodo {
  userid: number,
  id: number,
  title: string,
  completed: boolean,
}
export interface IUser {
  id: number | null,
  name: string | null,
  username: string | null,
  email: string | null,
  address: IAddress | null,
  phone: string | null,
  website: string | null,
  company: ICompany | null,
}
export interface IAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: IGeo,
}
export interface IGeo {
  lat: string,
  lng: string
}
export interface ICompany {
  name: string | null,
  catchPhrase: string | null,
  bs: string | null
}

export default IUser