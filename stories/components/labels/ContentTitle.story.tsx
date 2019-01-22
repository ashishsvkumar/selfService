import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ContentTitle } from '../../../src/components/labels/ContentTitle';

storiesOf('label/ContentTitle', module)
  .add('with text', simpleTitle, { notes: 'A title component for page content section' });


function simpleTitle() {
  return <ContentTitle text={text('Title Text', 'What can we help you with?')} />;
}