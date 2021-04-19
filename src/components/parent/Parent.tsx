import React, { MouseEvent, ChangeEvent, FC, useState, useEffect } from 'react';
import './Parent.css';
import Child from '../child/Child';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
  };

  phone: string;
  website: string;
  company: {
    name: string;
    bs: string;
    catchPhrase: '';
  };
}

const initUser: User = {
  id: '',
  name: '',
  email: '',
  address: {
    city: '',
    street: '',
    suite: '',
    zipcode: '',
  },
  phone: '',
  website: '',
  company: {
    name: '',
    bs: '',
    catchPhrase: '',
  },
};

const Parent: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [user, setUser] = useState<User>(initUser);
  const [modal, setModal] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUser(initUser);
    let regExp = /^(?:[1-9]|0[1-9]|10)$/;
    if (!query || !regExp.test(query)) {
      setModal(true);
    } else {
      setModal(false);
      const res = await axios.get(
        `http://jsonplaceholder.typicode.com/users/${query}`,
      );
      setUser(res.data);
    }
    setQuery('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setModal(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className='container'>
      <h2 data-testid='header'>Search User By ID</h2>

      <div className='parent'>
        <input
          data-testid='input'
          type='text'
          placeholder='enter id'
          value={query}
          onChange={handleChange}
        />
        <button data-testid='searchBtn' onClick={handleSearch}>
          SEARCH
        </button>
      </div>
      <div className='child'>
        <div data-testid='modal'>
          {modal && (
            <p className='modal'>
              Invalid Input!
              <br />
              <br />
              Please search for a number between
              <br /> 1 - 10
            </p>
          )}
        </div>
        <Child person={user} />
      </div>
      <h5>a react-typescript-jest app</h5>
    </div>
  );
};

export default Parent;
