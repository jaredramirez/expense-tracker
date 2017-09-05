// @flow
import {css} from 'aphrodite';
import {isEqual} from 'lodash';
import React, {Component} from 'react';
import curry from 'lodash/fp/curry';

import Button from '../Button';
import DateInput from '../DateInput';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import styles from './styles';
import {isEmail, hasNumber, isNumber} from './utils';

type ComponentMap = {
  text: any,
  select: any,
  date: any,
}

type FieldOptions = {
  defaultValue?: any,
  email?: boolean,
  password?: boolean,
  passwordConfirm?: boolean,
  containNumber?: boolean,
  onlyNumber?: boolean,
  minLength?: number,
  maxLength?: number,
  required?: boolean,
};

type Field = {
  name: string,
  label: string,
  type: string,
  values?: any,
  options: FieldOptions,
};

type Props = {
  fields: Array<Field>,
  onSubmit: (values: any) => void,
  submitButtonText: string,
  showCancel: boolean,
  onCancel: () => void;
  cancelButtonText: string,
  label: string,
  showLabelAction: boolean,
  onLabelAction: () => void,
  labelActionText: string,
  error: string,
  isLoading?: boolean,
  style?: any,
};

type State = {
  initial: any,
  inputs: any,
};

class Form extends Component {
  state: State;
  props: Props;
  inputComponentMap: ComponentMap;
  passwordFieldKey: string;

  static defaultProps = {
    submitButtonText: 'SUBMIT',
    showCancel: false,
    cancelButtonText: 'CANCEL',
    onCancel: () => {},
    showLabelAction: false,
    labelActionText: 'ACTION',
    onLabelAction: () => {},
    error: '',
    label: '',
    isLoading: false,
    style: {},
  }

  constructor(props: Props) {
    super(props);
    const initial = props.fields.reduce((acc: any, field: Field) => {
      let value = '';
      if (field.type === 'date') {
        value = +new Date();
      } else if (field.options.defaultValue) {
        value = field.options.defaultValue;
      }

      acc[field.name] = {
        ...field,
        method: curry(this.onChange)(field.name),
        valid: true,
        value,
        errorMsg: '',
      };
      if (field.options.password) {
        this.passwordFieldKey = field.name;
      }
      return acc;
    }, {});

    this.state = {
      initial,
      inputs: initial,
    };

    this.inputComponentMap = {
      text: TextInput,
      select: SelectInput,
      date: DateInput,
    };
  }
  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(this.props.fields, nextProps.fields)) {
      const initial = this.rebindDefaultValues(this.state, nextProps);
      this.setState({
        initial,
        inputs: initial,
      });
    }
  }
  rebindDefaultValues = (state: State, nextProps: Props) =>
    Object.keys(state.initial).reduce((acc: any, key: string) => {
      const input = state.initial[key];
      const nextInput = nextProps.fields.find((field: Field) => field.name === key);
      if (nextInput) {
        acc[key] = {
          ...input,
          value: nextInput.options.defaultValue || '',
        };
      }
      return acc;
    }, {});
  validateField = (
    value: string,
    options: FieldOptions,
  ): {valid: boolean, errorMsg: string} => {
    let valid = true;
    let errorMsg = '';
    if (options.email && !isEmail(value)) {
      errorMsg = 'Invaid email';
      valid = false;
    } else if (options.containNumber && !hasNumber(value)) {
      errorMsg = 'Must contain a number';
      valid = false;
    } else if (options.onlyNumber && !isNumber(value)) {
      errorMsg = 'Must be a number';
      valid = false;
    } else if (options.minLength && value.length < options.minLength) {
      errorMsg = `Cannot be less than ${options.minLength} characters`;
      valid = false;
    } else if (options.maxLength && value.length > options.maxLength) {
      errorMsg = `Cannot be longer than ${options.maxLength} characters`;
      valid = false;
    } else if (
      options.passwordConfirm &&
      value !== this.state.inputs[this.passwordFieldKey].value
    ) {
      errorMsg = 'Passwords don\'t match';
      valid = false;
    } else if (options.required && value === '') {
      errorMsg = 'Required';
      valid = false;
    }
    return {valid, errorMsg};
  }
  validate = () => Object.keys(this.state.inputs).reduce(
    (acc, key) => {
      const input = this.state.inputs[key];
      const {valid, errorMsg} = this.validateField(input.value, input.options);

      acc.valid = valid ? acc.valid : false;
      acc.inputs[input.name] = {
        ...input,
        valid,
        errorMsg,
      };
      return acc;
    },
    {valid: true, inputs: {}},
  );
  submit = () => {
    const {valid, inputs} = this.validate();
    if (valid) {
      const values = Object.keys(inputs).reduce((acc, key) => {
        acc[inputs[key].name] = inputs[key].type === 'date'
          ? parseInt(inputs[key].value, 10) : inputs[key].value;
        return acc;
      }, {});
      this.props.onSubmit(values);
      this.setState({inputs: this.state.initial});
    } else {
      this.setState({inputs});
    }
  }
  onChange = (fieldName: string, value: string) => {
    const {inputs} = this.state;
    const input = inputs[fieldName];
    const {valid, errorMsg} = this.validateField(value, input.options);

    this.setState({
      inputs: {
        ...this.state.inputs,
        [fieldName]: {
          ...input,
          value,
          valid,
          errorMsg,
        },
      },
    });
  }
  onKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.submit();
    }
  }
  render() {
    const {
      state,
      props,
      onKeyPress,
      inputComponentMap,
      submit,
    } = this;

    return (
      <div className={css(styles.container)} style={props.style}>
        <div className={css(styles.label)}>
          <span>{props.label}</span>
          {
            props.showLabelAction ? (
              <Button
                text={props.labelActionText}
                onClick={props.onLabelAction}
              />
              ) : null
          }
        </div>
        {Object.keys(state.inputs).map((key: string) => {
          const input = state.inputs[key];
          const InputComponent = inputComponentMap[input.type];
          return (
            <InputComponent
              key={input.name}
              label={input.label}
              value={input.value}
              onChange={input.method}
              valid={input.valid}
              errorMsg={input.errorMsg}

              password={input.options.password || input.options.passwordConfirm}
              options={input.values}

              onKeyPress={onKeyPress}
            />
          );
        })}
        <div className={css(styles.buttons)}>
          {
            props.showCancel
              ? <Button text={props.cancelButtonText} onClick={props.onCancel} />
              : null
          }
          <Button
            text={props.submitButtonText}
            onClick={submit}
            isLoading={props.isLoading}
          />
        </div>
        <span className={css(styles.invalid)}>
          {props.error.length > 0 ? props.error : String.fromCharCode(160)}
        </span>
      </div>
    );
  }
}

export default Form;
