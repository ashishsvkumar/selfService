import * as React from "react";
import { ProtectedLink } from "../wrappers/AuthWrapper";
import * as styles from "./OrderSummary.scss";
import { ArrowIcon } from "../icons/ArrowIcon";
import * as moment from "moment";
import cx from "classnames";
import { currentEnvironment, Environments, isMobile } from '../../config/environment'

export const enum LinkTo {
    ORDER_HELP = "order-help",
    ORDER_DETAILS = "order-details"
}

export class OrderSummary extends React.Component<OrderSummaryProps, OrderSummaryState> {

    static defaultProps = {
        isAsap: false,
        linkTo: LinkTo.ORDER_HELP
    }

    constructor(props: OrderSummaryProps) {
        super(props);
    }

    prepareItemthumnail = (url: string, index: number) => {        
        return (
            <div className={styles.thumbail_holder} key={`item-thumbnail-${url}-${index}`}>
                <div className={styles.thumbail} style={{ backgroundImage: `url("${url}")` }}></div>
            </div>
        )
    }

    trimSlot = () => {
        return this.props.deliverySlot.indexOf("Get by") === 0 ? this.props.deliverySlot.replace("Get by", "") : moment(this.props.deliverySlot, 'DD MMM YYYY HH:mm:ss').format('ddd DD MMM');
    }

    label = () => {
        return this.props.deliverySlot === 'Cancelled' ? "Placed On" : "Delivery Time";
    }

    statusColor = () => {
        switch (this.props.deliveryStatus) {
            case "Payment pending":
                return "#f29d38";
            case "Delivered":
                return "#89a836";
            case "Cancelled":
                return "#999";    
            case "Processing":
            case "Shipped":
            default:
                return "#7fc6d8";
        }
    }

    render() {
        const {deliveryStatus, itemThumnails, linkTo} = this.props;
        const thumbnailClass = cx({ [styles.thumbnails]: true, [styles.greyscale]: deliveryStatus === 'Cancelled' })

        return (
            <React.Fragment>
                <div className={styles.slot}>
                    <div className={styles.label}>Delivery Time</div>
                    <div className={styles.time}>{this.trimSlot()}</div>
                    <div className={styles.status} style={{ color: this.statusColor() }}>{deliveryStatus}</div>
                    <div className={styles.clear}></div>
                </div>
                <div className={thumbnailClass}>
                    {itemThumnails.slice(0, 4).map((url, index) => this.prepareItemthumnail(url, index))}
                    <div className={styles.arrow}><ArrowIcon /></div>
                    <div className={styles.help}>{linkTo === LinkTo.ORDER_HELP ? 'Get Help' : 'View Order'}</div>
                    <div className={styles.clear}></div>
                </div>
                <div className={styles.clear}></div>
            </React.Fragment>
        )
    }
}

export const OrderSummaryCard = (props: OrderSummaryProps) => {
    return (
        <ProtectedLink to={prepareOrderHelpLink(props.linkTo, props.tradeOrderId)} needLogin={true} className={cx([styles.content, styles.card])}>
            <OrderSummary {...props} />
        </ProtectedLink>
    )
}

export const OrderSummarySubcard = (props: OrderSummaryProps) => {
    return (
        <ProtectedLink to={prepareOrderHelpLink(props.linkTo, props.tradeOrderId)} needLogin={true} className={cx([styles.content, styles.subcard])}>
            <OrderSummary {...props} />
        </ProtectedLink>
    )
}

export const RecentOrderCard = (props: OrderSummaryProps) => {
    return (
        <div className={cx([styles.content, styles.card, styles.pack])}>
            <div className={styles.recent}>Most Recent Order</div>
            <OrderSummarySubcard {...props} />
            <ProtectedLink className={styles.all_orders} to="/orders">
                <div className={styles.arrow}><ArrowIcon /></div>
                <div className={styles.help}>Need help with another order</div>
                <div className={styles.arrow_2}><ArrowIcon /></div>
                <div className={styles.clear}></div>
            </ProtectedLink>
        </div>
    )
}

function prepareOrderHelpLink(linkTo: LinkTo, tradeOrderId: string) {
    if (linkTo === LinkTo.ORDER_HELP) {
        return `/orders/${tradeOrderId}`;
    }
    else {
        if (currentEnvironment === Environments.production) {
            return isMobile() ? `https://my-m.lazada.sg/order/order-detail?tradeOrderId=${tradeOrderId}` : `https://my.lazada.sg/customer/order/view/?tradeOrderId=${tradeOrderId}`;
        } else if (currentEnvironment === Environments.development) {
            return isMobile() ? `https://my-rm-p.lazada.sg/order/order-detail?tradeOrderId=${tradeOrderId}` : `https://my-rm.lazada.sg/customer/order/view/?tradeOrderId=${tradeOrderId}`;
        } else {
            return isMobile() ? `http://pages.lazada.test/wow/i/sg/order/order-detail?tradeOrderId=${tradeOrderId}&wh_weex=true` : `http://buyer.lazada.test/customer/order/view/?tradeOrderId=${tradeOrderId}`;
        }
    }
}

interface OrderSummaryState {

}

export interface OrderSummaryProps {
    tradeOrderId: string,
    deliverySlot: string,
    deliveryStatus: string,
    itemThumnails?: string[],
    isAsap?: boolean,
    linkTo?: LinkTo
}
