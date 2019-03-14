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
    { 
        text: "I want to check my order details", 
        url: prepareOrderDetailsLink(order.tradeOrderId), 
        shouldEnable: () => isMobile() && !(!isEmpty(document.referrer) && (document.referrer.indexOf('/support') < 0))
     },
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

    /* For not delivered */
    { 
        text: "Can I add or remove items from the order?", 
        url: `/orders/${order.tradeOrderId}/faq/200376704`, 
        shouldEnable: () => ["Payment pending", "Processing", "Shipped"].indexOf(order.status) >= 0  
    },
    { 
        text: "What if I'm not home for delivery?", 
        url: `/orders/${order.tradeOrderId}/faq/200376874`, 
        shouldEnable: () => ["Payment pending", "Processing", "Shipped"].indexOf(order.status) >= 0 
    },
    // { 
    //     text: "How do I track the status of my order?", 
    //     url: `/orders/${order.tradeOrderId}/faq/200389390`,
    //     shouldEnable: () => ["Payment pending", "Processing", "Shipped"].indexOf(order.status) >= 0 
    // },
    { 
        text: "Can I cancel the order?", 
        url: `/orders/${order.tradeOrderId}/faq/360019789213`, 
        shouldEnable: () => ["Payment pending", "Processing", "Shipped"].indexOf(order.status) >= 0
    },
    /* For delivered */
    { 
        text: "Can I return products to RedMart?", 
        url: `/orders/${order.tradeOrderId}/faq/360019787013`,
        shouldEnable: () => ["Delivered", "Refunded"].indexOf(order.status) >= 0
    },
    { 
        text: "Why didn't I receive a free gift with my purchase?", 
        url: `/orders/${order.tradeOrderId}/faq/360019789273`,
        shouldEnable: () => ["Delivered", "Refunded"].indexOf(order.status) >= 0
    },
    { 
        text: "Why does the item I received look different from the website?",
        url: `/orders/${order.tradeOrderId}/faq/360019611074`,
        shouldEnable: () => ["Delivered", "Refunded"].indexOf(order.status) >= 0
    },
    /* For all */
    { 
        text: "Need more help?", 
        url: `/orders/${order.tradeOrderId}/contact`,
        shouldEnable: () => isMobile() 
    },
]

export function prepareOrderDetailsLink(tradeOrderId: string) {
    if (currentEnvironment === Environments.production) {
        return isMobile() ? `https://my-m.lazada.sg/order/order-detail?tradeOrderId=${tradeOrderId}` : `https://my.lazada.sg/customer/order/view/?tradeOrderId=${tradeOrderId}`;
    } else {
        return isMobile() ? `https://my-p.lazada.sg/order/order-detail?tradeOrderId=${tradeOrderId}` : `https://my.lazada.sg/customer/order/view/?tradeOrderId=${tradeOrderId}`;
    }
}

