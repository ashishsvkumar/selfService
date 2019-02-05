import * as log from 'loglevel';
import * as React from "react";
import { connect } from "react-redux";
import { ChatState } from '../../store/chat/types';
import { ApplicationState } from '../../store';
import { ContactUs as Component } from "../../components/card/ContactUs";

class ContactUs extends React.Component<ContactUsProps, {}> { 
    constructor(props: ContactUsProps) {
        super(props);
    }

    componentDidMount() {
        log.info('Contact us container will mount');
    }

    onChatClick = () => {
        if (this.props.loaded) {
            this.props.snapEngageInstance.startLink();
        }
    }

    render() {
        return (
            <Component onChatClick={this.onChatClick}/>
        );
    }
}

type ContactUsProps = ChatState;

const maptStateToProps = ({ chat }: ApplicationState) => {
    return chat;
}

export default connect(maptStateToProps, null)(ContactUs);
