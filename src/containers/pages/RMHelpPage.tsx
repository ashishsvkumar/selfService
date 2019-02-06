import * as log from 'loglevel';
import * as React from "react";
import { connect } from "react-redux";
import { ChatState } from '../../store/chat/types';
import { ApplicationState } from '../../store';
import { RMHelpPage as Component } from "../../components/pages/contact/RMHelpPage";
import { fetchOrdersList } from '../../store/order/actions';
import { isLoggedIn } from '../../utils/session';
import { isEmptyObject, isEmptyArray } from '../../utils/extras';
import { getBasePath } from '../../config/environment';

class RMHelpPage extends React.Component<RMHelpPageProps, {}> {
    constructor(props: RMHelpPageProps) {
        super(props);
    }

    componentDidMount() {
        log.info('Contact us container will mount');
    }

    onLeaveMessage = () => {
        // @ts-ignore
        window.location = `${getBasePath()}query`;
    }

    render() {
        return (
            <Component chat={this.props.chat} recentOrder={this.props.recentOrder} />
        );
    }
}

interface PropsFromDispatch {
    fetchOrdersList: () => void
}

interface PropsFromState {
    chat: ChatState,
    shouldFetchOrders: boolean,
    recentOrder?: string
}


type RMHelpPageProps = PropsFromDispatch & PropsFromState;

const mapDispatchToProps = {
    fetchOrdersList: fetchOrdersList
}

const maptStateToProps = ({ chat, ordersList }: ApplicationState) => {
    const shouldFetch = isLoggedIn() && !ordersList.loading && isEmptyObject(ordersList.data);
    const orders = isEmptyObject(ordersList.data) ? [] : ordersList.data.orders;

    return {
        chat: chat,
        shouldFetchOrders: shouldFetch,
        recentOrder: isEmptyArray(orders) ? undefined : '' + orders[0].tradeOrderId
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(RMHelpPage);
