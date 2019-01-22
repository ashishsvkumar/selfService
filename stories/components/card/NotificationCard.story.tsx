import { text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { NotificationCard } from '../../../src/components/card/NotificationCard';

storiesOf('card/NotificationCard', module)
  .add('card', asCards, { notes: 'card theme' });


function asCards() {
  return <NotificationCard
    show={true}
    onClick={console.log}
    title={text('title', "Submitted!")}
    message={text('message', "Thank you for reporting an issue with your delivery. We will verify your claim and issue a refund accordingly.")}
    btnText={text('btnText', 'Done')}
  />
}
