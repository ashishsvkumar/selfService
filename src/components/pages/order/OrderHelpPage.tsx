import * as React from "react";
import * as styles from "./OrderHelpPage.scss";
import { setTitle } from '../../../utils/container'
import { OrderSummarySubcard, LinkTo, OrderSummaryProps, OrderSummaryCard } from '../../order/OrderSummary'

export const OrderHelpPage = (props: OrderHelpPageProps) => {

    setTitle(props.title)

    return (
        <div className={styles.content}>
            <div className={styles.desktop_title}>Order Help</div>
            <div className={styles.order_summary}>{prepareOrderCard(props.order)}</div>
            {props.body && <div className={styles.body}>{props.body}</div>}
        </div>
    );
}

function prepareOrderCard(order: OrderSummaryProps) {
    return (
        <React.Fragment>
            <div className={styles.only_mobile}>
                <OrderSummarySubcard
                    {...order}
                    linkTo={LinkTo.NONE}
                />
            </div>
            <div className={styles.only_desktop}>
                <OrderSummaryCard
                    {...order}
                    linkTo={LinkTo.NONE}
                />
            </div>
        </React.Fragment>
    );
}

export interface OrderHelpPageProps {
    title: string,
    order: OrderSummaryProps,
    body?: React.ReactFragment
}