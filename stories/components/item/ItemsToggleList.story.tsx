import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ItemsToggleList, ItemsToggleListProps, Closed } from '../../../src/components/item/ItemsToggleList';

storiesOf('item/ItemToggleList', module)
  .add('default', defaultIcon, { notes: 'default item toggle list' });


function defaultIcon() {
  return <ItemsToggleList {...props}/>;
}

const props: ItemsToggleListProps = {
  header: 'Which items(s) are missing?',
  items: [
    {
      sku: '4223',
      name: "Go Natural HiProtein Nut Crunch Choc Berry Bar Gluten Free",
      unitPrice: "$2.90",
      quantity: 4,
      thumbnail: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9310846060153_0306_1525354846192.jpg"
    },
    {
      sku: '54334',
      name: "DoDo Crab Flavored Sticks - Chilled",
      unitPrice: "$2.15",
      quantity: 2,
      thumbnail: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8888450913307_0001_1500622779513.jpg"
    },
    {
      sku: '876',
      name: "RedMart White Tea And Ginger Handwash",
      unitPrice: "$8.00",
      quantity: 9,
      thumbnail: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/888130428828600331024_1463047159043.jpg"
    },
    {
      sku: '564',
      name: "Dettol Sensitive Anti-Bacterial Hand Wash Refill Twinpack",
      unitPrice: "$4.25",
      quantity: 1,
      thumbnail: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9556111985466_0001_1487058612994.jpg"
    },
    {
      sku: '852',
      name: "Selezione Oro Red Chard Salad",
      unitPrice: "$0.25",
      quantity: 10,
      thumbnail: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8888450913307_0001_1500622779513.jpg"
    },
    {
      sku: '213',
      name: "Fruit Monkeys XO Durians Fruit Monkeys XO Durians",
      unitPrice: "$50.90",
      quantity: 200,
      thumbnail: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111234891_0001_1500532906895.jpg"
    },
    {
      sku: '087',
      name: "Tiger Lager Beer - 30 x 330ml Case (CNY Limited Edition Pack)",
      unitPrice: "$60.23",
      quantity: 4,
      thumbnail: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/img_1545613212764.jpg"
    },
  ],
  selectedSkus: ['852', '54334'],
  onClose: (list: string[], status: Closed) => { console.log("Closed panel with status:", status, "and items", list) }
}


