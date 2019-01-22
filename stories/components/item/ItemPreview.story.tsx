import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ItemPreview, ItemPreviewProps } from '../../../src/components/item/ItemPreview';

storiesOf('item/ItemPreview', module)
  .add('default', defaultIcon, { notes: 'default item preview' });


function defaultIcon() {
  return <ItemPreview {...props}/>;
}

const props: ItemPreviewProps = {
    sku: '4223',
    name: text("name", "Go Natural HiProtein Nut Crunch Choc Berry Bar Gluten Free"),
    unitPrice: text("unit price", "$2.90"),
    quantity: number('quantity', 4),
    thumbnail: text('thumbnail', "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9310846060153_0306_1525354846192.jpg")
}