import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { OrderHelpLandingPage as Component } from "../../components/pages/order/OrderHelpLandingPage"
import { fetchOrderDetails } from "../../store/order/actions";
import { setBreadcrumbs } from "../../store/breadcrumb/actions";
import { ApplicationState } from "../../store";
import { isLoggedIn } from '../../utils/session'
import { Spinner } from "../../components/icons/Spinner"
import { ProtectedPage } from "../../components/wrappers/AuthWrapper"
import { extractOrderSummary } from "../../utils/transformers";
import { isEmptyArray } from "../../utils/extras";
import { OrderDetailsState } from "../../store/order/types";
import { BreadcrumbEntry } from "../../store/breadcrumb/types";

export class OrderHelpLandingPage extends React.Component<OrderHelpPageProps, OrderHelpPageState> {

    constructor(props: OrderHelpPageProps) {
        super(props);
    }

    componentWillMount() {
        log.info('Order details page countainer will mount for order 🧾', this.props.match.params.tradeOrderId);
        this.props.setBreadcrumbs([
            { text: 'Past Orders', url: '/orders', needLogin: true },
            { text: 'Order Help', url: location.href, needLogin: true }
        ]);

        if (isLoggedIn() && (!this.props.loading && this.props.order === null)) {
            this.props.fetchOrderDetails(this.props.match.params.tradeOrderId);
        }
    }

    render() {
        if (this.props.order === null || this.props.loading) {
            return <ProtectedPage><Spinner /></ProtectedPage>
        }
        else if (this.props.order.errors) {
            return <Spinner />;
        }
        else {
            return <Component order={extractOrderSummary(this.props.order)} />
        }
    }
}

interface OrderHelpPageState {

}

interface PropsFromDispatch {
    fetchOrderDetails: Function,
    setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

interface PropsFromState {
    loading: boolean,
    order: OrderDetailsState
}

interface PropsFromRoute {
    match: { params: { tradeOrderId: string } }
}

type OrderHelpPageProps = PropsFromDispatch & PropsFromState & PropsFromRoute;

const mapDispatchToProps = {
    fetchOrderDetails: fetchOrderDetails,
    setBreadcrumbs: setBreadcrumbs
}

const maptStateToProps = ({ ordersDetails }: ApplicationState, ownProps: OrderHelpPageProps) => {

    const id = ownProps.match.params.tradeOrderId;
    const orders = Object.keys(ordersDetails)
        .filter(key => key === id)
        .map(key => ordersDetails[key]);

    if (isEmptyArray(orders)) {
        return { loading: false, order: null }
    } else if (orders[0].loading) {
        return { loading: true, order: null }
    } else {
        return { loading: false, order: orders[0] }
    }
}

export default connect(maptStateToProps, mapDispatchToProps)(OrderHelpLandingPage);