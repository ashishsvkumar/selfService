import * as React from "react";
import * as styles from "./Sidebar.scss";
import cx from 'classnames';
import { ProtectedLink } from "../wrappers/AuthWrapper";

export const Sidebar = () => {
    return (
        <div className={styles.content}>
            <div className={styles.title}>Categories</div>
            <div className={styles.links}>{links.map(prepareLink)}</div>
        </div>
    )
}

function prepareLink(link: SidebarLink) {
    const isHighlighted = location.pathname.indexOf(link.url) > 0;
    const className = cx({ [styles.link]: true, [styles.highlighted]: isHighlighted });

    return (
        <ProtectedLink to={link.url} needLogin={link.needLogin} className={className} key={link.url}>{link.text}</ProtectedLink>
    );
}

interface SidebarLink {
    text: string,
    url: string,
    needLogin: boolean
}

const links: SidebarLink[] = [
    {
        text: 'My RedMart Orders',
        url: '/orders',
        needLogin: true
    },
    {
        text: 'RedMart & Lazada Integration',
        url: '/category/redmart-on-lazada/About+RedMart+&+Lazada+Integration',
        needLogin: false
    },
    {
        text: 'Placing an Order',
        url: '/category/placing-an-order/Placing+an+Order',
        needLogin: false
    },
    {
        text: 'RedMart Delivery',
        url: '/category/redmart-delivery/RedMart+Delivery',
        needLogin: false
    },
    {
        text: 'Products on RedMart',
        url: '/category/products-on-redmart/Products+on+RedMart',
        needLogin: false
    },
    {
        text: 'About RedMart',
        url: '/category/about-redmart/About-RedMart',
        needLogin: false
    }
];