import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ArrowIcon, Direction } from '../../../src/components/icons/ArrowIcon';

storiesOf('icons/ArrowIcon', module)
  .add('default', defaultIcon, { notes: 'Directed in right' })
  .add('customized', customizedIcon, { notes: 'You can modify direction, color, width and size of the arrow' });


function defaultIcon() {
  return <ArrowIcon />;
}

function customizedIcon() {
  return <ArrowIcon 
    direction={text('direction', Direction.DOWN)} 
    width={number('width', 4)} size={number('size', 10)} 
    color={text("color", "#3a8794")} 
  />
}