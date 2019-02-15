import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { OrderHelpLandingPage as Component } from "../../components/pages/order/OrderHelpLandingPage"
import { fetchRedMartOrders } from "../../store/package/actions";
import { setBreadcrumbs } from "../../store/breadcrumb/actions";
import { ApplicationState } from "../../store";
import { isLoggedIn } from '../../utils/session'
import { Spinner } from "../../components/icons/Spinner"
import { ProtectedPage } from "../../components/wrappers/AuthWrapper"
import { isEmpty } from 'lodash';
import { BreadcrumbEntry } from "../../store/breadcrumb/types";
import { RedMartOrder } from "../../store/package/types";
import { NotFound } from "../../components/pages/notFound/NotFound";

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

        if (isLoggedIn() && this.props.order === null && !this.props.fetching) {
            log.info('Fetching order details');
            this.props.fetchRedMartOrders();
        }
    }

    render() {
        if (this.props.notFound) {
            return <NotFound message="Sorry, the order you are looking for could not be found."/>;
        }
        else if (this.props.fetching || this.props.order === null) {
            return <ProtectedPage><Spinner /></ProtectedPage>
        }
        else {
            return <Component {...this.props.order} />
        }
    }
}

interface OrderHelpPageState {

}

interface PropsFromDispatch {
    fetchRedMartOrders: () => void,
    setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

interface PropsFromState {
    fetching: boolean,
    order: RedMartOrder,
    notFound: boolean
}

interface PropsFromRoute {
    match: { params: { tradeOrderId: string } }
}

type OrderHelpPageProps = PropsFromDispatch & PropsFromState & PropsFromRoute;

const mapDispatchToProps = {
    fetchRedMartOrders: fetchRedMartOrders,
    setBreadcrumbs: setBreadcrumbs
}

const maptStateToProps = ({ redmartOrders }: ApplicationState, ownProps: OrderHelpPageProps) => {
    const orderId = ownProps.match.params.tradeOrderId;
    const orders = isEmpty(redmartOrders.orders) ? null : redmartOrders.orders.filter(o => o.tradeOrderId == orderId);
    const notFound = redmartOrders.fetched && (redmartOrders.noOrders || (redmartOrders.orders || []).filter(o => o.tradeOrderId == orderId).length === 0);

    return {
        fetching: redmartOrders.fetching,
        notFound,
        order: isEmpty(orders) ? null : orders[0],
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(OrderHelpLandingPage);