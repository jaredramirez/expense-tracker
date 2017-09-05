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
});
