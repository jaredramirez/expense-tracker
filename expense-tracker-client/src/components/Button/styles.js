// @flow
import {StyleSheet} from 'aphrodite';


export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: 16,
    color: '#1C3796',
    backgroundColor: 'white',
    height: 50,
    width: 135,

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#979797',

    cursor: 'pointer',
    outline: 'none',

    ':hover': {
      backgroundColor: '#E7E7E7',
    },
  },
  containerLoading: {
    pointerEvents: 'none',
    backgroundColor: '#E7E7E7',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
