// @flow

// eslint-disable-next-line import/prefer-default-export
export const getAccessLabel = (access: number): string => {
  let label = '';
  if (access === 0) {
    label = 'Regular';
  } else if (access === 1) {
    label = 'Manager';
  } else if (access === 2) {
    label = 'Admin';
  }
  return label;
};
