import * as log from 'loglevel';
import * as React from "react";
import { connect } from "react-redux";
import { ChatState } from '../../store/chat/types';
import { setup } from "../../store/chat/actions";
import { ApplicationState } from '../../store';
import { UserInfoState } from '../../store/user/types';
import { fetchOrdersList } from "../../store/order/actions";
import { isEmptyObject, isEmptyArray, isEmptyString } from '../../utils/extras';
import { isLoggedIn } from '../../utils/session';

class Chat extends React.Component<ChatProps, {}> { 
    constructor(props: ChatProps) {
        super(props);
    }

    componentDidMount() {
        log.info('Chat container will mount');
        if (!this.props.chat.loading && !this.props.chat.loaded) {
            this.props.setup();
        }
        if (this.props.shouldFetchOrders) {
            this.props.fetchOrdersList();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: ChatProps) {
        if (nextProps.chat.loaded) {

            const se = nextProps.chat.snapEngageInstance;

            if (!isEmptyObject(nextProps.user.user)) {
                se.setUserName(nextProps.user.user.name);
                se.setUserEmail(nextProps.user.user.email, false);
            }

            if (!isEmptyString(nextProps.recentOrder)) {
                se.setCustomField('OrderNumber', `${nextProps.recentOrder}`);
            }

        }
    }

    render() {
        return (
            <React.Fragment>{this.props.children}</React.Fragment>
        );
    }
}

interface PropsFromDispatch {
    setup: () => void,
    fetchOrdersList: () => void
}

interface PropsFromState {
    chat: ChatState,
    user: UserInfoState,
    shouldFetchOrders: boolean,
    recentOrder?: string
}

type ChatProps = PropsFromDispatch & PropsFromState;

const mapDispatchToProps = {
    setup: setup,
    fetchOrdersList: fetchOrdersList
}

const maptStateToProps = ({ chat, user, ordersList }: ApplicationState) => {
    const shouldFetch = isLoggedIn() && !ordersList.loading && isEmptyObject(ordersList.data);
    const orders = isEmptyObject(ordersList.data) ? [] : ordersList.data.orders;

    return {
        chat: chat,
        user: user,
        shouldFetchOrders: shouldFetch,
        recentOrder: isEmptyArray(orders) ? undefined : '' + orders[0].tradeOrderId
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(Chat);
