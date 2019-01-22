import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { NumberPicker } from '../../../src/components/form/NumberPicker';

storiesOf('form/NumberPicker', module)
  .add('default', defaultIcon, { notes: 'default number picker' });


function defaultIcon() {
  return <NumberPicker 
    label={text('label', 'How many are missing?')} 
    min={number('min', 1)} 
    max={number('max', 4)} 
    value={number('value', 1)} 
    valueChanged={ console.log }
  />;
}
