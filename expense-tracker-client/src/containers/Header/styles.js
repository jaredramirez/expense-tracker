// @flow
import {StyleSheet} from 'aphrodite';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  for: {
    marginLeft: 15,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 85,
    color: '#1C3796',
    fontWeight: 300,
    textDecoration: 'none',
  },
  linkActive: {
    color: '#1C3796',
  },
});
