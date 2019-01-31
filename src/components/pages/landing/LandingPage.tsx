import * as React from "react";
import * as styles from "./LandingPage.scss";
import { setTitle } from '../../../utils/container'
import { NavigationCard } from '../../card/NavigationCard'
import { ContentTitle } from "../../labels/ContentTitle"
import { RecentOrderCard, OrderSummaryProps, LinkTo } from '../../order/OrderSummary'
import cx from 'classnames';
import { ContactUs } from "../../card/ContactUs";
import { isEmptyString } from "../../../utils/extras";

export const LandingPage = (props: LandingPageProps) => {

    const { isLoggedIn, recentOrder } = props;
    setTitle('RedMart Help Center')

    const cardsClass = cx({ [styles.cards]: true, [styles.pull_up]: isLoggedIn })
    const hueBoxClass = cx({ [styles.hue_box]: true, [styles.shorten]: !isLoggedIn })

    return (
    
        <div className={styles.content}>
            <div className={hueBoxClass}>
                {props.userName && <div className={styles.callout}>{`Hi ${props.userName}, what can we help you with?`}</div>}
                {!props.userName && <div className={styles.callout}>Hi, what can we help you with?</div>}
            </div>
            <div className={styles.title}><ContentTitle text="What can we help you with?" /></div>
            <div className={cardsClass}>
                <div className={styles.first_card}>
                    {isLoggedIn && recentOrder ? <RecentOrderCard {...recentOrder} linkTo={LinkTo.ORDER_HELP} /> : <NavigationCard text="Past Orders" to="/orders" needLogin={true} />}
                </div>
                <div className={styles.other_cards}>
                    <NavigationCard text="About RedMart & Lazada Integration" to="/category/202592837/About+RedMart+&+Lazada+Integration" />
                    <NavigationCard text="Placing an Order" to="/category/202592867/Placing+an+Order" />
                    <NavigationCard text="RedMart Delivery" to="/category/202557897/RedMart+Delivery" />
                    <NavigationCard text="Products on RedMart" to="/category/202601828/Products+on+RedMart" />
                    <NavigationCard text="About RedMart" to="/faq/217371327/About-RedMart" />
                </div>
                <div className={styles.only_desktop}><ContactUs /></div>
            </div>
        </div>
    );
}

LandingPage.defaultProps = {
    isLoggedIn: false
}

export interface LandingPageProps {
    isLoggedIn: boolean,
    recentOrder?: OrderSummaryProps,
    userName: string
}