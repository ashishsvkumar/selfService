import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ItemIssue, ItemIssueProps } from '../../../src/components/item/ItemIssue';

storiesOf('item/ItemIssue', module)
  .add('default', defaultIcon, { notes: 'default item picker' });


function defaultIcon() {
  return <ItemIssue {...props} />;
}

const props: ItemIssueProps = {
  sku: '4223',
  pickerLabel: text('picker label', 'How many are affected?'),
  name: text("name", "Go Natural HiProtein Nut Crunch Choc Berry Bar Gluten Free"),
  unitPrice: text("unit price", "$2.90"),
  quantity: number('quantity', 4),
  thumbnail: text('thumbnail', "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9310846060153_0306_1525354846192.jpg"),
  issueTypes: [
    { displayText: 'Item was broken', value: 'broken' },
    { displayText: 'Item was mouldy', value: 'moudly' }
  ],
  onDelete: () => { console.log('Cross clicked') },
  selectChanged: (value: string) => { console.log(`${value} picked from select box`); },
  quantityChanged: (oldV: number, newV: number) => { console.log(`quantity changed from ${oldV} to ${newV}`) }
}