import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { OrderHelpLandingPage } from '../../../src/components/pages/order/OrderHelpLandingPage';
import { MemoryRouter } from 'react-router';
import { LinkTo } from '../../../src/components/order/OrderSummary';


storiesOf('page/order/OrderHelpLandingPage', module)
    .addDecorator(story => (<MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>))
    .add('pending', onPending, { notes: 'when order is scheduled' })
    .add('delivered', delivered, { notes: 'when order is delivered' });


function onPending() {
    return <OrderHelpLandingPage order={order} />;
}

function delivered() {
    const deliveredOrder = {...order, deliveryStatus: 'Delivered', itemThumnails: urls.slice(0, 1)}
    return <OrderHelpLandingPage order={deliveredOrder} />;
}

const urls: string[] = [
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8886316200561_0001_1520495296201.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111322239_0018_1529912505678.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8885003328533_0089_1470814620447.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111131800_4312_1441697885318.jpg'
];

const order = {
    tradeOrderId: '87543954549',
    packageId: '1',
    deliverySlot: 'Get by Fri 03 May',
    deliveryStatus: 'Payment pending',
    linkTo: LinkTo.ORDER_DETAILS,
    itemThumnails: urls
};