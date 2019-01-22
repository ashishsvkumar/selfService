import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { LandingPage as Component, LandingPageProps as ComponentProps } from "../../components/pages/landing/LandingPage"
import { fetchOrdersList } from "../../store/order/actions";
import { ApplicationState } from "../../store";
import { isLoggedIn } from '../../utils/session'
import { OrderSummaryProps } from "../../components/order/OrderSummary";
import { isEmptyArray } from "../../utils/extras";
import { orderSummaryToProps } from "../../utils/transformers";

export class LandingPage extends React.Component<LandingPageProps, LandingPageState> {

    constructor(props: LandingPageProps) {
        super(props);
    }

    componentWillMount() {
        log.info('Landing page countainer will mount');
        if (isLoggedIn()) {
            if (isLoggedIn()) {
                if (this.props.shouldFetch) {
                    log.info('Will fetch recent orders');
                    this.props.fetchOrdersList();
                }
            }
        }
    }

    render() {

        if (this.props.shouldFetch || this.props.fetching) {
            return <Component isLoggedIn={false} />;
        } else {
            return <Component isLoggedIn={isLoggedIn()} recentOrder={this.props.recentOrder} />
        }
    }
}

interface LandingPageState {

}

interface PropsFromDispatch {
    fetchOrdersList: () => void
}

interface PropsFromState {
    shouldFetch: boolean,
    fetching: boolean,
    recentOrder?: OrderSummaryProps
}

type LandingPageProps = PropsFromDispatch & PropsFromState;

const mapDispatchToProps = {
    fetchOrdersList: fetchOrdersList
}

const maptStateToProps = ({ ordersList }: ApplicationState) => {
    const fetching = ordersList.loading;
    const shouldFetch = ordersList.data === undefined;
    const orders = shouldFetch || fetching ? null : (isEmptyArray(ordersList.data.orders) ? [] : ordersList.data.orders.map(orderSummaryToProps))

    return {
        shouldFetch: shouldFetch,
        fetching: fetching,
        recentOrder: orders === null || orders.length === 0 ? null : orders[0]
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(LandingPage);