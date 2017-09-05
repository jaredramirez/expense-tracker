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
    borderWidth: 1,
    borderColor: '#979797',
    padding: '14px 25px',
    fontSize: 16,
    ':focus': {
      outline: 'none',
    },
  },
  invalid: {
    borderColor: '#cc0000',
  },
});
