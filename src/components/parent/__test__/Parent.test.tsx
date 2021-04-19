import React from 'react';
import Parent from '../Parent';
import Child from '../../child/Child';

import {
  render,
  fireEvent,
  Matcher,
  MatcherOptions,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import axios from 'axios';

Enzyme.configure({ adapter: new EnzymeAdapter() });

let getByTestId: {
  (arg0: string): any;
  (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown,
  ): HTMLElement;
};

beforeEach(() => {
  const component = render(<Parent />);
  getByTestId = component.getByTestId;
});

test('header renders with correct text', () => {
  const headerEl = getByTestId('header');
  expect(headerEl.textContent).toBe('Search User By ID');
});

test('search button renders with correct text', () => {
  const searchBtnEl = getByTestId('searchBtn');
  expect(searchBtnEl.textContent).toBe('SEARCH');
});

test('change value of input works corrrectly', () => {
  const inputEl = getByTestId('input');
  expect(inputEl.value).toBe('');
  fireEvent.change(inputEl, {
    target: {
      value: '7',
    },
  });
  expect(inputEl.value).toBe('7');
});

test('async test', async () => {
  expect.assertions(1);
  const result = await axios.get(`http://jsonplaceholder.typicode.com/users/1`);
  expect(result.data.name).toBe('Leanne Graham');
});

describe('parent component', () => {
  it('renders Child component', () => {
    const wrapper = shallow(<Parent />);
    expect(wrapper.find(Child).length).toEqual(1);
  });
});

test('modal does not pop-up', () => {
  const inputEl = getByTestId('input');
  const searchBtnEl = getByTestId('searchBtn');
  const modalEl = getByTestId('modal');
  fireEvent.change(inputEl, {
    target: {
      value: '7',
    },
  });
  expect(inputEl.value).toBe('7');
  fireEvent.click(searchBtnEl);
  expect(modalEl).toBeTruthy();
});



test('modal pops-up', () => {
  const inputEl = getByTestId('input');
  const searchBtnEl = getByTestId('searchBtn');
  const modalEl = getByTestId('modal');
  fireEvent.change(inputEl, {
    target: {
      value: '13',
    },
  });
  expect(inputEl.value).toBe('13');
  fireEvent.click(searchBtnEl);
  expect(modalEl.textContent).toBe(
    'Invalid Input!Please search for a number between 1 - 10',
  );
});
