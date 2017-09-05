// @flow
import React from 'react';

export const BackArrow = ({onClick}: {onClick: (val: any) => void}) => (
  <svg
    onClick={onClick}
    fill={'#000000'}
    height={'36'}
    viewBox={'0 0 24 24'}
    width={'36'}
  >
    <path d={'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'} />
    <path d={'M0 0h24v24H0z'} fill={'none'} />
  </svg>
);

export const shouldShowArrow = (path: string, authId: string, urlId: string) => {
  if (authId !== urlId && path === '/users/:userId/expenses') {
    return true;
  }
  return path !== '/users/:userId/expenses' && path !== '/users';
};

export const shouldShowExpenses = (path: string) =>
  path === '/users/:userId/expenses' || path === '/users/:userId/expenses/:expenseId';
