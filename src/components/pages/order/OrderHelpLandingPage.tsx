import * as React from "react";
import { NavigationCard, Theme } from "../../card/NavigationCard";
import { OrderHelpPage } from "./OrderHelpPage"
import * as styles from "../../../base.scss";
import { RedMartOrder } from "../../../store/package/types";

export const OrderHelpLandingPage = (props: OrderHelpLandingPageProps) => {
    return <OrderHelpPage title="Order Help" body={prepareHelpLinks(props)} order={props}/>
}

export type OrderHelpLandingPageProps = RedMartOrder;

function prepareHelpLinks(props: OrderHelpLandingPageProps) {
    const links = helpLinks(props.tradeOrderId).filter(link => link.enableOn.indexOf(props.status) >= 0)

    return (
        <div style={{marginTop: '-2px'}}>
            {links.map(prepareStrip)}
            {links.map(prepareCard)}
        </div>
    )
}

function prepareStrip(link: HelpLink) {
    return <div className={styles.only_mobile} key={`mobile-${link.url}`}><NavigationCard text={link.text} to={link.url} theme={Theme.STRIP}/></div>;
}

function prepareCard(link: HelpLink) {
    if (link.hideInDesktop === true) {
        return null;
    }

    return <div className={styles.only_desktop} style={{marginBottom: '10px'}} key={`desktop-${link.text}`}><NavigationCard text={link.text} to={link.url} theme={Theme.CARD}/></div>;
}

interface HelpLink {
    text: string,
    url: string,
    enableOn: string[],
    hideInDesktop?: boolean
}

const helpLinks = (tradeOrderId: string): HelpLink[] => [
    /* TEMPORARY */
    { text: "I have missing items", url: `/orders/${tradeOrderId}/help/missing`, enableOn: ["Payment pending", "Processing", "Shipped", "Delivered", "Cancelled"] },
    { text: "I have problem with the received items", url: `/orders/${tradeOrderId}/help/damaged`, enableOn: ["Payment pending", "Processing", "Shipped", "Delivered", "Cancelled"] },

    /* For not delivered */
    { text: "Can I add or remove items from the order?", url: `/orders/${tradeOrderId}/faq/200376704`, enableOn: ["Payment pending", "Processing", "Shipped"] },
    { text: "What if I'm not home for delivery?", url: `/orders/${tradeOrderId}/faq/200376874`, enableOn: ["Payment pending", "Processing", "Shipped"] },
    { text: "How do I track the status of my order?", url: `/orders/${tradeOrderId}/faq/200389390`, enableOn: ["Payment pending", "Processing", "Shipped"] },
    { text: "Can I cancel the order?", url: `/orders/${tradeOrderId}/faq/216795548`, enableOn: ["Payment pending", "Processing", "Shipped"] },
    /* For delivered */
    { text: "Can I return products to RedMart", url: `/orders/${tradeOrderId}/faq/200376804`, enableOn: ["Delivered"] },
    { text: "Why didn't I receive a free gift with my purchase?", url: `/orders/${tradeOrderId}/faq/217926027`, enableOn: ["Delivered"] },
    { text: "Why did the item I received looks different from the website?", url: `/orders/${tradeOrderId}/faq/203052204`, enableOn: ["Delivered"] },
    /* For all */
    { text: "Need more help", url: `/orders/${tradeOrderId}/contact`, enableOn: ["Payment pending", "Processing", "Shipped", "Delivered", "Cancelled"], hideInDesktop: true },
]
