import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { ItemLevelHelpPage as Component, Category } from "../../components/pages/order/ItemLevelHelpPage"
import { fetchRedMartOrders } from "../../store/package/actions";
import { setBreadcrumbs } from "../../store/breadcrumb/actions";
import { ApplicationState } from "../../store";
import { Spinner } from "../../components/icons/Spinner";
import { isLoggedIn } from "../../utils/session";
import { ProtectedPage } from "../../components/wrappers/AuthWrapper";
import { createTicket } from "../../store/ticket/actions";
import { Ticket } from "../../store/ticket/types";
import { BreadcrumbEntry } from "../../store/breadcrumb/types";
import { RedMartOrder } from "../../store/package/types";
import { isEmpty } from 'lodash';

export class ItemLevelHelpPage extends React.Component<ItemLevelHelpPageProps, {}> {

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

        if (isLoggedIn() && this.props.order === null && !this.props.fetching) {
            this.props.fetchRedMartOrders();
        }
    }

    render() {
        const { fetching, order } = this.props;
        if (fetching || order === null) {
            return <ProtectedPage><Spinner /></ProtectedPage>
        } else {
            return <Component order={order} helpCategory={this.props.match.params.category} createTicket={this.props.createTicket} inProgress={this.props.ticketInProgress} />
        }
    }
}

interface PropsFromDispatch {
    fetchRedMartOrders: () => void,
    createTicket: (ticket: Ticket) => void,
    setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

interface PropsFromState {
    fetching: boolean,
    order: RedMartOrder,
    ticketInProgress: boolean
}

interface PropsFromRoute {
    match: { params: { tradeOrderId: string, category: Category } }
}

type ItemLevelHelpPageProps = PropsFromDispatch & PropsFromState & PropsFromRoute;

const mapDispatchToProps = {
    fetchRedMartOrders: fetchRedMartOrders,
    createTicket: createTicket,
    setBreadcrumbs: setBreadcrumbs
}

const maptStateToProps = ({ redmartOrders, ticket }: ApplicationState, ownProps: ItemLevelHelpPageProps) => {
    const orderId = ownProps.match.params.tradeOrderId;
    const orders = isEmpty(redmartOrders.orders) ? null : redmartOrders.orders.filter(o => o.tradeOrderId == orderId);

    return {
        feching: redmartOrders.fetching,
        order: isEmpty(orders) ? null : orders[0],
        ticketInProgress: ticket.inProgress
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(ItemLevelHelpPage);