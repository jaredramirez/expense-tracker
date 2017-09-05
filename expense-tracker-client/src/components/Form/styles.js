// @flow
import {StyleSheet} from 'aphrodite';

const label: any = {
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  fontSize: 24,
};

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  label,
  buttons: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  invalid: {
    label,
    fontSize: 16,
    color: '#cc0000',
  },
});
