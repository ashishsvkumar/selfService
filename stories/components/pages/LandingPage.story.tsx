import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { LandingPage } from '../../../src/components/pages/landing/LandingPage';
import { MemoryRouter } from 'react-router';
import { LinkTo } from '../../../src/components/order/OrderSummary';

storiesOf('page/LandingPage', module)
    .addDecorator(story => (<MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>))
  .add('default', defaultPage, { notes: 'without login' })
  .add('logged-in', whenLoggedIn, { notes: 'with login' });


function defaultPage() {
  return <LandingPage userName={null}/>;
}

function whenLoggedIn() {
    return <LandingPage 
        isLoggedIn={true}
        recentOrder={
            {
                tradeOrderId: text('tradeOrderId', '89543957349'),
                packageId: text('packageId', '3'),
                deliverySlot: text('deliverySlot', 'Get by Fri 03 May'),
                deliveryStatus: text('deliveryStatus', 'Processing'),
                linkTo: LinkTo.ORDER_HELP,
                itemThumnails: urls
            }
        }
        userName="Anurag Saini"
    />;
  }




const urls: string[] = [
  'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9300657162061_0042_1469785396616.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111384053_0001_1545045598308.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8886316200561_0001_1520495296201.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/img_1525353927674.jpg'
];