import * as React from "react";
import { OrderSummaryProps } from '../../order/OrderSummary'
import { NavigationCard, Theme } from "../../card/NavigationCard";
import { OrderHelpPage } from "./OrderHelpPage"

export const OrderHelpLandingPage = (props: OrderHelpLandingPageProps) => {
    return <OrderHelpPage title="Order Help" body={prepareHelpLinks(props)} order={props.order}/>
}

export interface OrderHelpLandingPageProps {
    order: OrderSummaryProps,
    error?: string
}

function prepareHelpLinks(props: OrderHelpLandingPageProps) {
    const links = helpLinks(props.order.tradeOrderId).filter(link => link.enableOn.indexOf(props.order.deliveryStatus) >= 0)

    return (
        <div style={{marginTop: '-2px'}}>
            {links.map(link => <NavigationCard text={link.text} to={link.url} theme={Theme.STRIP} key={link.text + link.url}/>)}
        </div>
    )
}

interface HelpLink {
    text: string,
    url: string,
    enableOn: string[]
}

const helpLinks = (tradeOrderId: string): HelpLink[] => [
    /* TEMPORARY */
    { text: "I have missing items", url: `/orders/${tradeOrderId}/help/missing`, enableOn: ["Payment pending", "Processing", "Shipped", "Delivered", "Cancelled"] },
    { text: "I have problem with the received items", url: `/orders/${tradeOrderId}/help/damaged`, enableOn: ["Payment pending", "Processing", "Shipped", "Delivered", "Cancelled"] },

    /* For not delivered */
    { text: "Can I add or remove items from the order?", url: '/faq/200376704', enableOn: ["Payment pending", "Processing", "Shipped"] },
    // { text: "Can I reschedule my delivery?", url: '/faq/reschedule-delivery', enableOn: ["Payment pending", "Processing", "Shipped"] },
    // { text: "Can I change delivery address or phone number?", url: '/faq/change-address-or-phone', enableOn: ["Payment pending", "Processing", "Shipped"] },
    { text: "What if I'm not home for delivery?", url: '/faq/200376874', enableOn: ["Payment pending", "Processing", "Shipped"] },
    { text: "How do I track the status of my order?", url: '/faq/200389390', enableOn: ["Payment pending", "Processing", "Shipped"] },
    { text: "Can I cancel the order?", url: '/faq/216795548', enableOn: ["Payment pending", "Processing", "Shipped"] },
    /* For delivered */
    // { text: "I have missing items", url: `/orders/${tradeOrderId}/help/missing`, enableOn: ["Delivered"] },
    // { text: "I have problem with the received items", url: `/orders/${tradeOrderId}/help/damaged`, enableOn: ["Delivered"] },
    { text: "Can I return products to RedMart", url: '/faq/200376804', enableOn: ["Delivered"] },
    { text: "Why didn't I receive a free gift with my purchase?", url: '/faq/217926027', enableOn: ["Delivered"] },
    { text: "Why did the item I received looks different from the website?", url: '/faq/203052204', enableOn: ["Delivered"] },
    { text: "Feedback for this delivery", url: 'https://redmart.typeform.com/to/A3SPs0', enableOn: ["Delivered"] },
    /* For all */
    { text: "Something else?", url: '/query', enableOn: ["Payment pending", "Processing", "Shipped", "Delivered", "Cancelled"] },
]
