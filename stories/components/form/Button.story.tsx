import { text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Button } from '../../../src/components/form/Button';

storiesOf('form/Button', module)
  .add('default', defaultIcon, { notes: 'default button' })
  .add('primay', primary, { notes: 'primary button' })
  .add('file', fileUpload, { notes: 'file upload button' });


function defaultIcon() {
  return <Button text={text('text', 'Add Photo(s)')} style={ { width: '100%' } }/>;
}

function primary() {
  return <Button text={text('text', 'Submit')} isPrimary={true} />;
}

function fileUpload() {
  return <Button text={text('text', 'Add Photo(s)')} fileProps={{ onClick: () => {console.log('File upload')} }} />;
}
