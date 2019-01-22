import { text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { NavigationCard, Theme } from '../../../src/components/card/NavigationCard';

storiesOf('card/NavigationCard', module)
  .add('card', asCards, { notes: 'card theme' })
  .add('strip', asStrips, { notes: 'strip theme' });


function asCards() {
  return <div>
    <NavigationCard
      theme={Theme.CARD}
      text={text('text', 'I did not receive my order')}
      to={text('link', '/help/missing')}
      needLogin={true}
    />
    <NavigationCard
      theme={Theme.CARD}
      text={text('text', 'Item I received were of bad quality')}
      to={text('link', '/help/quality')}
      needLogin={true}
    />
  </div>;
}

function asStrips() {
  return <div>
    <NavigationCard
      theme={Theme.STRIP}
      text={text('text', 'I want to give feedback')}
      to={text('link', '/feedback')}
      needLogin={true}
    />
    <NavigationCard
      theme={Theme.STRIP}
      text={text('text', 'How can I track my order?')}
      to={text('link', '/faq/track-order')}
      needLogin={true}
    />
  </div>;
}