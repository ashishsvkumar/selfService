import { number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Checkbox } from '../../../src/components/form/Checkbox';

storiesOf('form/Checkbox', module)
  .add('unchecked', unchecked, { notes: 'unchecked checkbox' })
  .add('checked', checked, { notes: 'unchcheckedecked checkbox' });


function unchecked() {
  return <Checkbox radius={number('radius', 20)} isChecked={boolean('isChecked', false)}/>;
}


function checked() {
  return <Checkbox isChecked={boolean('isChecked', true)}/>;
}