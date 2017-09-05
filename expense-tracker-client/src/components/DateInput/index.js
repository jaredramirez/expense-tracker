// @flow
import 'react-date-picker/index.css';
import {css} from 'aphrodite';
import React from 'react';
import {DateField, DatePicker} from 'react-date-picker';

import './styles.css';
import styles from './styles';

type Props = {
  value: string;
  label: string,
  onChange: (val: string) => void,
  valid: boolean,
  errorMsg: string,
  onKeyPress?: () => any,
  style?: any,
};

const DateInput = ({
  value,
  label,
  onChange,
  valid,
  errorMsg,
  onKeyPress,
  style,
}: Props) => (
  <div className={css(styles.container)} style={style}>
    <div className={css(styles.label)}>
      <span>{label}</span>
      <span className={css(styles.labelError)}>{errorMsg}</span>
    </div>
    <DateField
      dateFormat="YYYY-MM-DD hh:mm a"
      forceValidDate
      defaultValue={value}
      onChange={(_dateString, {dateMoment}) => onChange(dateMoment.valueOf())}
      className={css(
        styles.input,
        !valid ? styles.invalid : null,
      )}
      onKeyPress={onKeyPress}
    >
      <DatePicker
        navigation
        locale="en"
        forceValidDate
        highlightWeekends
        highlightToday
        weekStartDay={0}
        weekNumbers={false}
        weekDayNames={false}
        clearButton={false}
        cancelButton={false}
        className={css(styles.input)}
      />
    </DateField>
  </div>
);

DateInput.defaultProps = {
  onKeyPress: () => null,
  style: {},
};

export default DateInput;
