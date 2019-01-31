import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { OrdersPage as Component } from "../../components/pages/orders/OrdersPage"
import { Spinner } from "../../components/icons/Spinner"
import { fetchOrdersList } from "../../store/order/actions";
import { setBreadcrumbs } from "../../store/breadcrumb/actions";
import { ApplicationState } from "../../store";
import { isLoggedIn } from '../../utils/session'
import { ProtectedPage } from "../../components/wrappers/AuthWrapper"
import { OrderSummaryProps } from "../../components/order/OrderSummary";
import { orderSummaryToProps } from "../../utils/transformers";
import { isEmptyArray } from "../../utils/extras";
import { BreadcrumbEntry } from "../../store/breadcrumb/types";

export class OrdersPage extends React.Component<OrdersPageProps, OrdersPageState> {

    constructor(props: OrdersPageProps) {
        super(props);
    }

    componentWillMount() {
        log.info('Orders page countainer will mount 📖');
        this.props.setBreadcrumbs([ { text: 'Past Orders', url: location.href, needLogin: true } ]);

        if (isLoggedIn()) {
            if (this.props.shouldFetch) {
                log.info('Will fetch recent orders');
                this.props.fetchOrdersList();
            }
        }
    }

    render() {
        if (this.props.shouldFetch || this.props.fetching) {
            return <ProtectedPage><Spinner /></ProtectedPage>
        } else {
            return <Component orders={this.props.orders} />
        }
    }
}

interface OrdersPageState {

}

interface PropsFromDispatch {
    fetchOrdersList: () => void,
    setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

interface PropsFromState {
    shouldFetch: boolean,
    fetching: boolean,
    orders: OrderSummaryProps[]
}

type OrdersPageProps = PropsFromDispatch & PropsFromState;

const mapDispatchToProps = {
    fetchOrdersList: fetchOrdersList,
    setBreadcrumbs: setBreadcrumbs
}

const maptStateToProps = ({ ordersList }: ApplicationState) => {
    const fetching = ordersList.loading;
    const shouldFetch = ordersList.data === undefined;

    return {
        shouldFetch: shouldFetch,
        fetching: fetching,
        orders: shouldFetch || fetching ? null : (isEmptyArray(ordersList.data.orders) ? [] : ordersList.data.orders.map(orderSummaryToProps))
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(OrdersPage);