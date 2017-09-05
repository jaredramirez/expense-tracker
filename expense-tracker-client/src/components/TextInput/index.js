// @flow
import {css} from 'aphrodite';
import React from 'react';

import styles from './styles';

type Props = {
  value: string;
  label: string,
  onChange: (val: string) => void,
  valid: boolean,
  errorMsg: string,
  password?: boolean,
  onKeyPress?: () => any,
  style?: any,
};

const TextInput = ({
  value,
  label,
  onChange,
  valid,
  errorMsg,
  password,
  onKeyPress,
  style,
}: Props) => (
  <div className={css(styles.container)} style={style}>
    <div className={css(styles.label)}>
      <span>{label}</span>
      <span className={css(styles.labelError)}>{errorMsg}</span>
    </div>
    <input
      value={value}
      type={password ? 'password' : 'text'}
      className={css(
        styles.input,
        !valid ? styles.invalid : null,
      )}
      onChange={event => onChange(event.target.value)}
      onKeyPress={onKeyPress}
    />
  </div>
);

TextInput.defaultProps = {
  password: false,
  style: {},
  onKeyPress: () => null,
};

export default TextInput;
