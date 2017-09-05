// @flow
import {StyleSheet} from 'aphrodite';

const sub = {
  margin: '0px 25px',
};

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  form: {
    ...sub,
    flex: 2,
  },
  table: {
    ...sub,
    flex: 3,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    color: '#1C3796',
    fontWeight: 300,
    textDecoration: 'none',
  },
  linkActive: {
    color: '#1C3796',
  },
});
