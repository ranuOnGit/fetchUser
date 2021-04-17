import React, { FC } from 'react';
import { User } from '../parent/Parent';
import './Child.css';

const Child: FC<{ person: User }> = (props) => {

  return (
    <div className='user'>
      <h2 className='user-h'>{props.person.name}</h2>
      <p>
        {props.person.email}
        <br />
        {props.person.phone}
      </p>
      <a href={props.person.website}>{props.person.website}</a>
      <hr />
      <p>
        {props.person.address.city}
        <br />
        {props.person.address.street}
        <br />
        {props.person.address.suite}
        <br />
        {props.person.address.zipcode}
      </p>
      <hr />
      <h4 className='user-h'>{props.person.company.name}</h4>
      {props.person.company.bs}
      <br />
      {props.person.company.catchPhrase}
    </div>
  );
};

export default Child;
