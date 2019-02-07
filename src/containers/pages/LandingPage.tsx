import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { LandingPage as Component } from "../../components/pages/landing/LandingPage"
import { fetchOrdersList } from "../../store/order/actions";
import { fetchRedMartPackages } from "../../store/package/actions";
import { clearBreadcrumbs } from "../../store/breadcrumb/actions";
import { ApplicationState } from "../../store";
import { isLoggedIn } from '../../utils/session'
import { OrderSummaryProps } from "../../components/order/OrderSummary";
import { isEmptyArray, isEmptyObject } from "../../utils/extras";
import { orderSummaryToProps } from "../../utils/transformers";

export class LandingPage extends React.Component<LandingPageProps, LandingPageState> {

    constructor(props: LandingPageProps) {
        super(props);
    }

    componentWillMount() {
        log.info('Landing page countainer will mount');
        this.props.clearBreadcrumbs();
        this.props.fetchRedMartPackages();
        // if (isLoggedIn()) {
        //     if (isLoggedIn()) {
        //         if (this.props.shouldFetch) {
        //             log.info('Will fetch recent orders');
        //             this.props.fetchOrdersList();
        //         }
        //     }
        // }
    }

    render() {

        if (this.props.shouldFetch || this.props.fetching) {
            return <Component isLoggedIn={false} userName={null}/>;
        } else {
            return <Component isLoggedIn={isLoggedIn()} recentOrder={this.props.recentOrder} userName={this.props.userName}/>
        }
    }
}

interface LandingPageState {

}

interface PropsFromDispatch {
    fetchOrdersList: () => void,
    clearBreadcrumbs: () => void,
    fetchRedMartPackages: () => void
}

interface PropsFromState {
    shouldFetch: boolean,
    fetching: boolean,
    recentOrder?: OrderSummaryProps,
    userName: string
}

type LandingPageProps = PropsFromDispatch & PropsFromState;

const mapDispatchToProps = {
    fetchOrdersList: fetchOrdersList,
    clearBreadcrumbs: clearBreadcrumbs,
    fetchRedMartPackages: fetchRedMartPackages
}

const maptStateToProps = ({ ordersList, user }: ApplicationState) => {
    const fetching = ordersList.loading;
    const shouldFetch = ordersList.data === undefined;
    const orders = shouldFetch || fetching ? null : (isEmptyArray(ordersList.data.orders) ? [] : ordersList.data.orders.map(orderSummaryToProps))

    return {
        shouldFetch: shouldFetch,
        fetching: fetching,
        recentOrder: orders === null || orders.length === 0 ? null : orders[0],
        userName: !user.fetching && !isEmptyObject(user.user) ? user.user.name : null
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(LandingPage);