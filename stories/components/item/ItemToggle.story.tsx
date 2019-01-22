import { text, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ItemToggle, ItemToggleProps } from '../../../src/components/item/ItemToggle';

storiesOf('item/ItemToggle', module)
  .add('default', defaultIcon, { notes: 'default item toggle' })
  .add('selected', selected, { notes: 'default item toggle' });


function defaultIcon() {
  return <ItemToggle {...props}/>;
}

function selected() {
  return <ItemToggle {...props} isChecked={true}/>;
}

const props: ItemToggleProps = {
    sku: '4223',
    name: text("name", "Go Natural HiProtein Nut Crunch Choc Berry Bar Gluten Free"),
    unitPrice: text("unit price", "$2.90"),
    quantity: number('quantity', 4),
    thumbnail: text('thumbnail', "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9310846060153_0306_1525354846192.jpg"),
    isChecked: boolean('isChecked', false)
}
