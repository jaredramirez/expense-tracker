// @flow
import {StyleSheet} from 'aphrodite';

const item = {
  flex: 1,
};

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100vh',
  },
  table: {
    flex: 2,
  },
  averages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  item,
  header: {
    ...item,
    fontWeight: 600,
  },
  placeholder: {
    ...item,
  },
});
