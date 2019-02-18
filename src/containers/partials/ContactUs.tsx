import * as log from 'loglevel';
import * as React from "react";
import { connect } from "react-redux";
import { ChatState } from '../../store/chat/types';
import { ApplicationState } from '../../store';
import { ContactUs as Component, PopupText } from "../../components/card/ContactUs";
import { isEmpty } from 'lodash';
import { showMessage } from "../../store/alert/actions";
import { isLoggedIn } from '../../utils/session';
import { getBasePath } from '../../config/environment';

class ContactUs extends React.Component<ContactUsProps, {}> {
    constructor(props: ContactUsProps) {
        super(props);
    }

    componentDidMount() {
        log.info('Contact us container will mount');
    }

    onChatClick = () => {
        // if (!this.props.chat.loaded || this.props.chat.isOffline) {
        //     this.onLeaveMessage();
        // } else {
        //     this.onChat();
        // }
        this.onChat();
    }

    onChat = () => {
        if (this.props.chat.loaded) {
            if (!isEmpty(this.props.recentOrder)) {
                this.props.chat.snapEngageInstance.setCustomField('OrderNumber', `${this.props.recentOrder}`);
            }
            this.props.chat.snapEngageInstance.startLink();
        }
    }

    onLeaveMessage = () => {
        // @ts-ignore
        window.location = `${getBasePath()}query`;
    }

    onMore = () => {
        this.props.showMessage('Contact Us', PopupText(), 'Close');
    }

    render() {
        return (
            <Component onChatClick={this.onChatClick} chatMessage={this.props.chat.isOffline ? 'Chat with us' : 'Chat with us'} onMoreClick={this.onMore}/>
        );
    }
}

interface PropsFromDispatch {
    showMessage: (title: string, message: any, btnText: string) => void
}

interface PropsFromState {
    chat: ChatState,
    shouldFetchOrders: boolean,
    recentOrder?: string
}


type ContactUsProps = PropsFromDispatch & PropsFromState;

const mapDispatchToProps = {
    showMessage: showMessage
}

const maptStateToProps = ({ chat, redmartOrders }: ApplicationState) => {
    const shouldFetchOrders = isLoggedIn() && !redmartOrders.fetching && isEmpty(redmartOrders.orders);
    const orders = isEmpty(redmartOrders.orders) ? [] : redmartOrders.orders;

    return {
        chat: chat,
        shouldFetchOrders: shouldFetchOrders,
        recentOrder: isEmpty(orders) ? undefined : '' + orders[0].tradeOrderId
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(ContactUs);
