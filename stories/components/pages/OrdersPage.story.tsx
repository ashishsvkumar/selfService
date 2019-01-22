import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { OrdersPage } from '../../../src/components/pages/orders/OrdersPage';
import { MemoryRouter } from 'react-router';
import { OrderSummaryProps, LinkTo } from '../../../src/components/order/OrderSummary';


storiesOf('page/OrdersPage', module)
    .addDecorator(story => (<MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>))
    .add('default', defaultPage, { notes: 'orders selection screen' });


function defaultPage() {
    // @ts-ignore
    return <OrdersPage orders={orders} />;
}

const urls: string[] = [
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9300657162061_0042_1469785396616.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111384053_0001_1545045598308.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8886316200561_0001_1520495296201.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/img_1525353927674.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111190500_0001_1541671569247.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8881304288040_0051_1509360752012.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111322239_0018_1529912505678.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8885003328533_0089_1470814620447.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111131800_4312_1441697885318.jpg'
];


const orders: OrderSummaryProps[] = [
    {
        tradeOrderId: '89543957349',
        deliverySlot: 'Get by Fri 03 May',
        deliveryStatus: 'Payment pending',
        linkTo: LinkTo.ORDER_HELP,
        itemThumnails: urls.slice(0, 4)
    },
    {
        tradeOrderId: '89545957349',
        deliverySlot: 'Placed on by Fri 03 May',
        deliveryStatus: 'Shipped',
        linkTo: LinkTo.ORDER_HELP,
        itemThumnails: urls.slice(0, 2)
    },
    {
        tradeOrderId: '89543956749',
        deliverySlot: 'Get by Fri 03 May',
        deliveryStatus: 'Processing',
        linkTo: LinkTo.ORDER_HELP,
        itemThumnails: urls.slice(3, 5)
    },    {
        tradeOrderId: '89543954549',
        deliverySlot: 'Get by Fri 03 May',
        deliveryStatus: 'Delivered',
        linkTo: LinkTo.ORDER_DETAILS,
        itemThumnails: urls.slice(8, 10)
    },    {
        tradeOrderId: '87543954549',
        deliverySlot: 'Placed on Fri 03 May',
        deliveryStatus: 'Cancelled',
        linkTo: LinkTo.ORDER_DETAILS,
        itemThumnails: urls.slice(8, 10)
    }
]