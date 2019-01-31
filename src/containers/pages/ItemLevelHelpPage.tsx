import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { ItemLevelHelpPage as Component, ItemLevelHelpPageProps as ComponentProps, Category } from "../../components/pages/order/ItemLevelHelpPage"
import { fetchOrderDetails } from "../../store/order/actions";
import { setBreadcrumbs } from "../../store/breadcrumb/actions";
import { ApplicationState } from "../../store";
import { Spinner } from "../../components/icons/Spinner";
import { isLoggedIn } from "../../utils/session";
import { ProtectedPage } from "../../components/wrappers/AuthWrapper";
import { OrderDetails } from "../../store/order/types";
import { isEmptyObject } from "../../utils/extras";
import { createTicket } from "../../store/ticket/actions";
import { Ticket } from "../../store/ticket/types";
import { BreadcrumbEntry } from "../../store/breadcrumb/types";

export class ItemLevelHelpPage extends React.Component<ItemLevelHelpPageProps, ItemLevelHelpPageState> {

    constructor(props: ItemLevelHelpPageProps) {
        super(props);
    }

    componentWillMount() {
        log.info('Item level help page countainer will mount for order 📝', this.props.match.params.tradeOrderId);

        const title = this.props.match.params.category === Category.missing ? 'I have missing items' : 'I have problem with the received items';

        this.props.setBreadcrumbs([
            { text: 'Past Orders', url: '/orders', needLogin: true },
            { text: 'Order Help', url: `/orders/${this.props.match.params.tradeOrderId}`, needLogin: true },
            { text: title, url: location.href, needLogin: true }
        ]);

        if (isLoggedIn() && !this.getOrder()) {
            this.props.fetchOrderDetails(this.props.match.params.tradeOrderId);
        }
    }

    getOrder = (): OrderDetails => {
        const orderId = this.props.match.params.tradeOrderId
        const order: OrderDetails = this.props.orders ? this.props.orders[orderId] : null
        return isEmptyObject(order) ? null : order;
    }

    render() {
        const order = this.getOrder();
        if (order) {
            return <Component order={order} helpCategory={this.props.match.params.category} createTicket={this.props.createTicket} inProgress={this.props.ticketInProgress} />
        } else {
            return <ProtectedPage><Spinner /></ProtectedPage>
        }
    }
}

interface ItemLevelHelpPageState {

}

interface PropsFromDispatch {
    fetchOrderDetails: Function,
    createTicket: (ticket: Ticket) => void,
    setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

interface PropsFromState {
    orders: { [orderId: string]: OrderDetails },
    ticketInProgress: boolean
}

interface PropsFromRoute {
    match: { params: { tradeOrderId: string, category: Category } }
}

type ItemLevelHelpPageProps = PropsFromDispatch & PropsFromState & PropsFromRoute;

const mapDispatchToProps = {
    fetchOrderDetails: fetchOrderDetails,
    createTicket: createTicket,
    setBreadcrumbs: setBreadcrumbs
}

const maptStateToProps = ({ ordersDetails, ticket }: ApplicationState) => {

    const orders: { [propName: string]: OrderDetails } = {};

    Object.keys(ordersDetails)
        .filter(key => !ordersDetails[key].loading)
        .filter(key => typeof ordersDetails[key].data === 'object')
        .forEach(key => {
            const value = ordersDetails[key]
            orders[key] = value.data
        })

    return {
        orders: orders,
        ticketInProgress: ticket.inProgress
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(ItemLevelHelpPage);