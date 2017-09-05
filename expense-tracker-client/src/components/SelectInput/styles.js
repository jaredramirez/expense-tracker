// @flow
import {StyleSheet} from 'aphrodite';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 12,
  },
  labelError: {
    color: '#cc0000',
    marginLeft: 15,
  },
  input: {
    borderStyle: 'solid',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#979797',
  },
  invalid: {
    borderColor: '#cc0000',
  },
});
