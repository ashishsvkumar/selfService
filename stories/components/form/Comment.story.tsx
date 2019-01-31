import { text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Comment } from '../../../src/components/form/Comment';

storiesOf('form/Comment', module)
  .add('withCheckbox', withCheckbox, { notes: 'with Checkbox comment box' });


function withCheckbox() {
  return <Comment 
    checkBoxTitle={text('checkbox', 'The concern involves a multipack product.')} 
    showWarning={boolean('warning', true)}
    subtitle={text('subtitle', 'Please indicate the number of pieces affected')}
    onChange={onChange}
  />;
}

function onChange(str: string) {
  console.log('Changed', str);
}