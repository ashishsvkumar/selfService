import * as React from "react";
import * as styles from "./LandingPage.scss";
import { setTitle } from '../../../utils/container'
import { NavigationCard } from '../../card/NavigationCard'
import { ContentTitle } from "../../labels/ContentTitle"
import { RecentOrderCard, OrderSummaryProps, LinkTo } from '../../order/OrderSummary'

export const LandingPage = (props: LandingPageProps) => {

    const { isLoggedIn, recentOrder } = props;
    setTitle('RedMart Help Center')

    return (
        <div className={styles.content}>
            <ContentTitle text="What can we help you with?" />
            <div className={styles.cards}>
                {isLoggedIn && recentOrder ? <RecentOrderCard {...recentOrder} linkTo={LinkTo.ORDER_HELP} /> : <NavigationCard text="Past Orders" to="/orders" needLogin={true} />}
                <NavigationCard text="About RedMart & Lazada Integration" to="/category/202592837/About+RedMart+&+Lazada+Integration" />
                <NavigationCard text="Placing an Order" to="/category/202592867/Placing+an+Order" />
                <NavigationCard text="RedMart Delivery" to="/category/202557897/RedMart+Delivery" />
                <NavigationCard text="Products on RedMart" to="/category/202601828/Products+on+RedMart" />
                <NavigationCard text="Send Feedback / Enquiry" to="https://redmart.typeform.com/to/A3SPs0" />
                <NavigationCard text="About RedMart" to="/faq/217371327/About-RedMart" />
            </div>
        </div>
    );
}

LandingPage.defaultProps = {
    isLoggedIn: false
}

export interface LandingPageProps {
    isLoggedIn: boolean,
    recentOrder?: OrderSummaryProps
}