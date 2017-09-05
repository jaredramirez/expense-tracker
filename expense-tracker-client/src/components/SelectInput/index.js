// @flow
import 'react-select/dist/react-select.css';
import {css} from 'aphrodite';
import React from 'react';
import Select from 'react-select';

import './styles.css';
import styles from './styles';

type Option = {
  value: string,
  label: string,
};

type Props = {
  label: string,
  value: string,
  options: Array<Option>,
  onChange: (value: string) => void;
  valid: boolean,
  onKeyPress?: () => any,
  errorMsg: string,
};

const SelectInput = ({
  label,
  onChange,
  valid,
  errorMsg,
  ...props
}: Props) => (
  <div className={css(styles.container)}>
    <div className={css(styles.label)}>
      <span>{label}</span>
      <span className={css(styles.labelError)}>{errorMsg}</span>
    </div>
    <Select
      placeholder={''}
      onChange={(option: Option) => onChange(option ? option.value : '')}
      className={css(
        styles.input,
        !valid ? styles.invalid : null,
      )}
      {...props}
    />
  </div>
);

SelectInput.defaultProps = {
  onKeyPress: () => null,
};

export default SelectInput;
