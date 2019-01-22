import * as React from "react";
import * as styles from "./OrderHelpPage.scss";
import { setTitle } from '../../../utils/container'
import { OrderSummarySubcard, LinkTo, OrderSummaryProps } from '../../order/OrderSummary'

export const OrderHelpPage = (props: OrderHelpPageProps) => {

    setTitle(props.title)

    return (
        <div className={styles.content}>
            <div className={styles.order_summary}>{prepareOrderCard(props.order)}</div>
            {props.body && <div className={styles.body}>{props.body}</div>}
        </div>
    );
}

function prepareOrderCard(order: OrderSummaryProps) {
    return <OrderSummarySubcard
        {...order}
        linkTo={LinkTo.ORDER_DETAILS}
    />;
}

export interface OrderHelpPageProps {
    title: string,
    order: OrderSummaryProps,
    body?: React.ReactFragment
}