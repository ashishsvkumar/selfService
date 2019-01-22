import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Spinner } from '../../../src/components/icons/Spinner';

storiesOf('icons/Spinner', module)
  .add('default', defaultIcon, { notes: 'default spinner' });


function defaultIcon() {
  return <Spinner />;
}
