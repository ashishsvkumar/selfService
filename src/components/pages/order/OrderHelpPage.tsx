import * as React from "react";
import * as styles from "./OrderHelpPage.scss";
import { setTitle } from '../../../utils/container'
import { LinkTo, OrderSummaryProps, OrderSummaryCard } from '../../order/OrderSummary'
import { isMobile } from "../../../config/environment";

export const OrderHelpPage = (props: OrderHelpPageProps) => {

    setTitle(props.title)

    return (
        <div className={styles.content}>
            <div className={styles.desktop_title}>{props.title || 'Order Help'}</div>
            <div className={styles.order_summary}>{prepareOrderCard(props.order)}</div>
            {props.body && <div className={styles.body}>{props.body}</div>}
        </div>
    );
}

function prepareOrderCard(order: OrderSummaryProps) {
    return (
        <OrderSummaryCard 
            {...order}
            linkTo={isMobile() ? LinkTo.NONE : LinkTo.ORDER_DETAIL}
        />
    );
}

export interface OrderHelpPageProps {
    title: string,
    order: OrderSummaryProps,
    body?: React.ReactFragment
}