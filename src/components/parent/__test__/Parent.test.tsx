import React from 'react';
import Parent from '../Parent';
import {
  render,
  fireEvent,
  Matcher,
  MatcherOptions,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

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
