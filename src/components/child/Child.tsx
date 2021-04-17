import React, { FC } from 'react';
import { User } from '../parent/Parent';
import './Child.css';

const Child: FC<{ person: User }> = (props) => {
  return (
    <div className='user'>
      <h2 className='user-h'>{props.person.name}</h2>
      <div className='div1'>
        contact:
        <p>
          email: {props.person.email}
          <br />
          phone: {props.person.phone}
        </p>
        <a href={props.person.website}>{props.person.website}</a>
      </div>
      <div className='div1'>
        <p>
          city: {props.person.address.city}
          <br />
          street: {props.person.address.street}
          <br />
          suite: {props.person.address.suite}
          <br />
          zip-code: {props.person.address.zipcode}
        </p>
      </div>
      <div className='div1'>
        work:
        <p className='work-h'>{props.person.company.name}</p>
        <p>
          {props.person.company.bs}
          <br />
          {props.person.company.catchPhrase}
        </p>
      </div>
    </div>
  );
};

export default Child;
