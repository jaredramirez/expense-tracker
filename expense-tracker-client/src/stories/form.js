// @flow
import React from 'react';
import {storiesOf, action} from '@kadira/storybook';

import Button from '../components/Button';
import DateInput from '../components/DateInput';
import SelectInput from '../components/SelectInput';
import TextInput from '../components/TextInput';
import Form from '../components/Form';

storiesOf('Button', module)
  .add('base', () => (
    <Button text={'Submit'} onClick={action('clicked')} isLoading={false} />
  ))
  .add('isLoading', () => (
    <Button text={'Submit'} isLoading onClick={action('clicked')} />
  ));

storiesOf('DateInput', module)
  .add('base', () => (
    <DateInput
      value={''}
      label={'Date Input'}
      onChange={action('clicked')}
      valid
      errorMsg={''}
    />
  ))
  .add('error message', () => (
    <DateInput
      value={''}
      label={'Date Input'}
      onChange={action('clicked')}
      valid={false}
      errorMsg={'FAILED BOI'}
    />
  ));

const options = [
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'},
];
storiesOf('SelectInput', module)
  .add('base', () => (
    <SelectInput
      value={'one'}
      label={'One'}
      options={options}
      onChange={action('clicked')}
      valid
      errorMsg={''}
    />
  ))
  .add('error message', () => (
    <SelectInput
      value={'one'}
      label={'One'}
      options={options}
      onChange={action('clicked')}
      valid
      errorMsg={'error yo'}
    />
  ));

storiesOf('TextInput', module)
  .add('base', () => (
    <TextInput
      value={'jaredramirez@me.com'}
      label={'Email'}
      errorMsg={''}
      onChange={action('clicked')}
      valid
    />
  ))
  .add('error message', () => (
    <TextInput
      value={'jaredramirez@me.com'}
      label={'Email'}
      errorMsg={'asda'}
      onChange={action('clicked')}
      valid
    />
  ));

const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    options: {
      required: true,
      email: true,
    },
  }, {
    name: 'password',
    label: 'Password',
    type: 'text',
    options: {
      required: true,
      password: true,
      containNumber: true,
      minLength: 6,
      maxLength: 25,
    },
  }, {
    name: 'passwordConfirm',
    label: 'Password Confirm',
    type: 'text',
    options: {
      required: true,
      passwordConfirm: true,
    },
  }, {
    name: 'select',
    label: 'Select',
    type: 'select',
    values: options,
    options: {
      required: true,
    },
  }, {
    name: 'date',
    label: 'Date',
    type: 'date',
    options: {
      required: true,
    },
  },
];
storiesOf('Form', module)
  .add('basic', () => (
    <div style={{height: '100%'}}>
      <Form fields={fields} onSubmit={action('submit')} />
    </div>
  ))
  .add('with cancel button', () => (
    <div style={{height: '100%'}}>
      <Form fields={fields} onSubmit={action('submit')} onCancel={action('cancel')} />
    </div>
  ));
