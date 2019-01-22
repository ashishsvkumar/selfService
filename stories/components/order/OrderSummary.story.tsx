import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { OrderSummary, RecentOrderCard, LinkTo } from '../../../src/components/order/OrderSummary';
import { MemoryRouter } from 'react-router';

storiesOf('order/OrderSummary', module)
  .addDecorator(story => (<MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>))
  .add('card', asCard, { notes: 'as independent card' })
  .add('recent order', asRecentOrder, { notes: 'as recent order card' });


function asCard() {
  return <OrderSummary
    tradeOrderId={text('tradeOrderId', '89543957349')}
    deliverySlot={text('deliverySlot', 'Get by Fri 03 May')}
    deliveryStatus={text('deliveryStatus', 'Payment pending')}
    linkTo={LinkTo.ORDER_HELP}
    itemThumnails={urls}
  />;
}

function asRecentOrder() {
  return <RecentOrderCard
    tradeOrderId={text('tradeOrderId', '89543957349')}
    deliverySlot={text('deliverySlot', 'Get by Fri 03 May')}
    deliveryStatus={text('deliveryStatus', 'Delivered')}
    linkTo={LinkTo.ORDER_DETAILS}
    itemThumnails={urls}
  />;
}




const urls: string[] = [
  'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9300657162061_0042_1469785396616.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111384053_0001_1545045598308.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8886316200561_0001_1520495296201.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/img_1525353927674.jpg'
];