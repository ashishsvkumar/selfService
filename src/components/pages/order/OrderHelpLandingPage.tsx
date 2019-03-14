import * as React from "react";
import { NavigationCard, Theme } from "../../card/NavigationCard";
import { OrderHelpPage } from "./OrderHelpPage"
import * as styles from "../../../base.scss";
import { RedMartOrder } from "../../../store/package/types";
import { currentEnvironment, Environments, isMobile } from "../../../config/environment";
import { isEmpty } from "lodash";

export const OrderHelpLandingPage = (props: OrderHelpLandingPageProps) => {
    return <OrderHelpPage title="Order Help" body={prepareHelpLinks(props)} order={props} />
}

export type OrderHelpLandingPageProps = RedMartOrder;

function prepareHelpLinks(props: OrderHelpLandingPageProps) {
    const links = helpLinks(props).filter(link => link.shouldEnable())

    return (
        <div style={{ marginTop: '-2px' }}>
            {links.map(prepareStrip)}
            {links.map(prepareCard)}
        </div>
    )
}

function prepareStrip(link: HelpLink) {
    return <div className={styles.only_mobile} key={`mobile-${link.url}`}><NavigationCard text={link.text} to={link.url} theme={Theme.STRIP} /></div>;
}

function prepareCard(link: HelpLink) {
    return <div className={styles.only_desktop} style={{ marginBottom: '10px' }} key={`desktop-${link.text}`}><NavigationCard text={link.text} to={link.url} theme={Theme.CARD} /></div>;
}

interface HelpLink {
    text: string,
    url: string,
    shouldEnable: () => boolean
}

const helpLinks = (order: RedMartOrder): HelpLink[] => [
    // For All
    { 
        text: "I want to check my order details", 
        url: prepareOrderDetailsLink(order.tradeOrderId), 
        shouldEnable: () => isMobile() && !(!isEmpty(document.referrer) && (document.referrer.indexOf('/support') < 0))
     },


    // Payment pending
    {
        text: 'How do I make payment for a pending order?',
        url: `/orders/${order.tradeOrderId}/faq/360019823373`, 
        shouldEnable: () => ["Payment pending"].indexOf(order.status) >= 0
    },
    {
        text: 'Was payment successful for my order?',
        url: `/orders/${order.tradeOrderId}/faq/360019643974`,
        shouldEnable: () => ["Payment pending"].indexOf(order.status) >= 0
    },

    // Scheduled / Processing / Shipped
    {
        text: 'Can I add or remove items from my order?',
        url: `/orders/${order.tradeOrderId}/faq/200376704`,
        shouldEnable: () => ["Processing", "Shipped", "Scheduled"].indexOf(order.status) >= 0
    },
    {
        text: 'How can I cancel my order?',
        url: `/orders/${order.tradeOrderId}/faq/360019789213`,
        shouldEnable: () => ["Processing", "Shipped", "Scheduled"].indexOf(order.status) >= 0
    },
    {
        text: 'Can I change my delivery address and phone number for an existing order?',
        url: `/orders/${order.tradeOrderId}/faq/360019610994`,
        shouldEnable: () => ["Processing", "Shipped", "Scheduled"].indexOf(order.status) >= 0
    },
    {
        text: "I need to change my delivery slot",
        url: `/orders/${order.tradeOrderId}/faq/360019651834`,
        shouldEnable: () => ["Processing", "Shipped", "Scheduled"].indexOf(order.status) >= 0
    },
    {
        text: "What if I'm not at home for my delivery?",
        url: `/orders/${order.tradeOrderId}/faq/200376874`,
        shouldEnable: () => ["Processing", "Shipped", "Scheduled"].indexOf(order.status) >= 0
    },
    {
        text: 'What if I want to give an Authority To Leave (ATL) for my delivery to my doorstep/security guard/concierge?',
        url: `/orders/${order.tradeOrderId}/faq/200376854`,
        shouldEnable: () => ["Processing", "Shipped", "Scheduled"].indexOf(order.status) >= 0
    },
    {
        text: 'Can my Lazada orders be delivered together with my RedMart order?',
        url: `/orders/${order.tradeOrderId}/faq/360019611274`,
        shouldEnable: () => ["Processing", "Shipped", "Scheduled"].indexOf(order.status) >= 0
    },
    

    // Delivered
    { 
        text: "I have missing items", 
        url: `/orders/${order.tradeOrderId}/help/missing`, 
        shouldEnable: () => ["Delivered"].indexOf(order.status) >= 0 && !isEmpty(order.refundableItems)
    },
    { 
        text: "I have issues with my received items", 
        url: `/orders/${order.tradeOrderId}/help/damaged`, 
        shouldEnable: () => ["Delivered"].indexOf(order.status) >= 0 && !isEmpty(order.refundableItems)
    },
    {
        text: 'Can I return items to Redmart?',
        url: `/orders/${order.tradeOrderId}/faq/360019787013`,
        shouldEnable: () => ["Delivered", "Refunded", "Cancellation initiated", "Cancelled"].indexOf(order.status) >= 0
    },
    {
        text: 'One or more of the products I ordered did not arrive. What should I do?',
        url: `/orders/${order.tradeOrderId}/faq/217371367`,
        shouldEnable: () => ["Delivered"].indexOf(order.status) >= 0
    },
    {
        text: "Why didn't I receive a free gift with my RedMart purchase?",
        url: `/orders/${order.tradeOrderId}/faq/360019789273`,
        shouldEnable: () => ["Delivered"].indexOf(order.status) >= 0
    },
    {
        text: 'How long is the refund process?',
        url: `/orders/${order.tradeOrderId}/faq/360019824453`,
        shouldEnable: () => ["Delivered", "Refunded", "Cancellation initiated", "Cancelled"].indexOf(order.status) >= 0
    },
    {
        text: 'Why does the item I received look different from the one on the website?',
        url: `/orders/${order.tradeOrderId}/faq/360019611074`,
        shouldEnable: () => ["Delivered"].indexOf(order.status) >= 0
    },

    // Refunded / Cancellation initiated / Cancelled
    {
        text: 'I used a voucher on my order, but some of the items were not available at delivery. Why did I not get a full refund on those items?',
        url: `/orders/${order.tradeOrderId}/faq/360019638254`,
        shouldEnable: () => ["Refunded", "Cancellation initiated", "Cancelled"].indexOf(order.status) >= 0
    },
    {
        text: 'What happens if I cancel an order that I applied a voucher to?',
        url: `/orders/${order.tradeOrderId}/faq/360019817993`,
        shouldEnable: () => ["Refunded", "Cancellation initiated", "Cancelled"].indexOf(order.status) >= 0
    },

    // For all
    { 
        text: "Need more help?", 
        url: `/orders/${order.tradeOrderId}/contact`,
        shouldEnable: () => isMobile() 
    }
]

export function prepareOrderDetailsLink(tradeOrderId: string) {
    if (currentEnvironment === Environments.production) {
        return isMobile() ? `https://my-m.lazada.sg/order/order-detail?tradeOrderId=${tradeOrderId}` : `https://my.lazada.sg/customer/order/view/?tradeOrderId=${tradeOrderId}`;
    } else {
        return isMobile() ? `https://my-p.lazada.sg/order/order-detail?tradeOrderId=${tradeOrderId}` : `https://my.lazada.sg/customer/order/view/?tradeOrderId=${tradeOrderId}`;
    }
}
