import * as log from 'loglevel';
import * as React from "react";
import { connect } from "react-redux";
import { ChatState } from '../../store/chat/types';
import { ApplicationState } from '../../store';
import { ContactUs as Component } from "../../components/card/ContactUs";
import { fetchOrdersList } from '../../store/order/actions';
import { isLoggedIn } from '../../utils/session';
import { isEmptyObject, isEmptyArray, isEmptyString } from '../../utils/extras';

class ContactUs extends React.Component<ContactUsProps, {}> {
    constructor(props: ContactUsProps) {
        super(props);
    }

    componentDidMount() {
        log.info('Contact us container will mount');
    }

    onChatClick = () => {
        if (this.props.chat.loaded) {
            if (!isEmptyString(this.props.recentOrder)) {
                this.props.chat.snapEngageInstance.setCustomField('OrderNumber', `${this.props.recentOrder}`);
            }
            this.props.chat.snapEngageInstance.startLink();
        }
    }

    render() {
        return (
            <Component onChatClick={this.onChatClick} />
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


type ContactUsProps = PropsFromDispatch & PropsFromState;

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

export default connect(maptStateToProps, mapDispatchToProps)(ContactUs);
