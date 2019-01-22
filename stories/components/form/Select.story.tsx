import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Select, SelectOption } from '../../../src/components/form/Select';

storiesOf('form/Select', module)
  .add('default', defaultIcon, { notes: 'default dropdown' });


function defaultIcon() {
  return <Select options={options} inputOptions={ { placeholder: 'Select an item' } }/>;
}

const options: SelectOption[] = [
  { displayText: 'Lazada', value: "lz" },
  { displayText: 'RedMart', value: "rm"},
  { displayText: 'Alibaba', value: "al" }
]