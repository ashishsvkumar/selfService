import { text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Attachment } from '../../../src/components/form/attachment/Attachment';

storiesOf('form/Attachment', module)
  .add('default', defaultIcon, { notes: 'without any file selected' });


function defaultIcon() {
  return <Attachment label="Add photo(s) of affected items" onChange={console.log}/>;
}
