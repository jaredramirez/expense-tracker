// @flow
import {css} from 'aphrodite';
import React from 'react';
import Loader from 'halogen/ClipLoader';

import styles from './styles';

type Props = {
  text: string,
  onClick: () => void,
  isLoading?: boolean,
  style?: any,
};

const Button = ({text, onClick, isLoading, style}: Props) => (
  <button
    className={css(
      styles.container,
      isLoading ? styles.containerLoading : null,
    )}
    onClick={onClick}
    style={style}
  >
    {!isLoading
      ? text : <Loader className={css(styles.loading)} color={'gray'} size={'16px'} />}
  </button>
);

Button.defaultProps = {
  isLoading: false,
  style: {},
};

export default Button;
