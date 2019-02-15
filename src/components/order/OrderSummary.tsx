import * as React from "react";
import { ProtectedLink } from "../wrappers/AuthWrapper";
import * as styles from "./OrderSummary.scss";
import { ArrowIcon } from "../icons/ArrowIcon";
import * as moment from "moment";
import cx from "classnames";
import { currentEnvironment, Environments, isMobile } from '../../config/environment'
import { RedMartOrder } from "../../store/package/types";
import { isEmpty } from 'lodash';

export const enum LinkTo {
    ORDER_HELP = "order-help",
    NONE = "none"
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
        const showCount: boolean = index === 3 && index < this.props.items.length - 1;
        return (
            <div className={styles.thumbail_holder} key={`item-thumbnail-${url}-${index}`}>
                <div className={styles.thumbail} style={{ backgroundImage: `url("${url}")` }}>
                 {showCount && <div className={styles.count_holder}></div>}
                 {showCount && <div className={styles.count}>+{this.props.items.length - 3}</div>}
                </div>
            </div>
        )
    }

    trimSlot = () => {
        let out = this.props.deliverySlot.indexOf("Get by") === 0 ? this.props.deliverySlot.replace("Get by", "") : moment(this.props.deliverySlot, 'DD MMM YYYY HH:mm:ss').format('ddd DD MMM');
        out = out.replace('-', ' - ');
        try {
            return out.replace('-', ' - ').replace(/([0-9]{2} [A-Za-z]{3}), ([0-9]{2})/, '$1 · $2');
        } catch(err) {
            // Cause I don't trust myself
            return out;
        }
    }

    label = () => {
        return this.props.deliverySlot === 'Cancelled' ? "Placed On" : "Delivery Time";
    }

    statusColor = () => {
        switch (this.props.status) {
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
        const { status, items, linkTo } = this.props;
        const thumbnailClass = cx({ [styles.thumbnails]: true, [styles.greyscale]: status === 'Cancelled' })

        return (
            <React.Fragment>
                <div className={styles.slot}>
                    <div className={styles.label}>Delivery Time</div>
                    <div className={styles.time}>{this.trimSlot()}</div>
                    <div className={styles.status} style={{ color: this.statusColor() }}>{status}</div>
                    <div className={styles.clear}></div>
                </div>
                <div className={thumbnailClass}>
                    {items.slice(0, 5).map(im => im.thumbnail).map((url, index) => this.prepareItemthumnail(url, index))}
                    {linkTo === LinkTo.ORDER_HELP && <div className={styles.help_btn}>Get Help</div>}
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

interface ExtraProps {
    linkTo?: LinkTo
}

export type OrderSummaryProps = RedMartOrder & ExtraProps;
