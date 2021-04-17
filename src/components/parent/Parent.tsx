import React, { MouseEvent, ChangeEvent, FC, useState } from 'react';
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await axios.get(
      `http://jsonplaceholder.typicode.com/users/${query}`,
    );
    console.log(res.data);
    setUser(res.data);
    setQuery('');
  };

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
        <Child person={user} />
      </div>
      <h5>a react-typescript-jest app</h5>
    </div>
  );
};

export default Parent;
