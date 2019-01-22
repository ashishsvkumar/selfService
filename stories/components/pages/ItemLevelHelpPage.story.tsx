import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ItemLevelHelpPage, Category } from '../../../src/components/pages/order/ItemLevelHelpPage';
import { MemoryRouter } from 'react-router';

storiesOf('page/ItemLevelHelpPage', module)
    .addDecorator(story => (<MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>))
    .add('missing', missing, { notes: 'for missing items' })
    .add('damaged', damaged, { notes: 'for damaged items' });


function missing() {
    return <ItemLevelHelpPage order={order} helpCategory={Category.missing} createTicket={null} inProgress={false}/>;
}

function damaged() {
    return <ItemLevelHelpPage order={order} helpCategory={Category.damaged} createTicket={null} inProgress={false} />;
}


const items = [
    {
        skuId: '4223',
        title: "Go Natural HiProtein Nut Crunch Choc Berry Bar Gluten Free",
        price: "$2.90",
        quantity: 4,
        picUrl: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9310846060153_0306_1525354846192.jpg"
    },
    {
        skuId: '54334',
        title: "DoDo Crab Flavored Sticks - Chilled",
        price: "$2.15",
        quantity: 2,
        picUrl: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8888450913307_0001_1500622779513.jpg"
    },
    {
        skuId: '876',
        title: "RedMart White Tea And Ginger Handwash",
        price: "$8.00",
        quantity: 9,
        picUrl: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/888130428828600331024_1463047159043.jpg"
    },
    {
        skuId: '564',
        title: "Dettol Sensitive Anti-Bacterial Hand Wash Refill Twinpack",
        price: "$4.25",
        quantity: 1,
        picUrl: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/9556111985466_0001_1487058612994.jpg"
    },
    {
        skuId: '852',
        title: "Selezione Oro Red Chard Salad",
        price: "$0.25",
        quantity: 10,
        picUrl: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8888450913307_0001_1500622779513.jpg"
    },
    {
        skuId: '213',
        title: "Fruit Monkeys XO Durians Fruit Monkeys XO Durians",
        price: "$50.90",
        quantity: 200,
        picUrl: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/1111111234891_0001_1500532906895.jpg"
    },
    {
        skuId: '087',
        title: "Tiger Lager Beer - 30 x 330ml Case (CNY Limited Edition Pack)",
        price: "$60.23",
        quantity: 4,
        picUrl: "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/img_1545613212764.jpg"
    }
]

const order: any = {
    detailInfo: {
        createdAt: 'Placed on 02 Jan 2019  16:34:34',
        tradeOrderId: '849401198013',
    },
    'package': {
        isLiveUp: false,
        packageId: '1',
        tag: 'package',
        shippingInfo: {
            statusMap: {
                active: 'Processing',
                all: [
                    'Payment pending',
                    'Processing',
                    'Shipped',
                    'Delivered'
                ]
            },
        },
        orderItems: items
    }
};