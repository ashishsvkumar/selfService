import * as React from "react";
import * as styles from "./RMHelpPage.scss";
import cx from 'classnames';
import { setTitle } from '../../../utils/container'
import { ChatState } from "../../../store/chat/types";
import { isEmptyString } from "../../../utils/extras";
import { ArrowIcon, Direction } from "../../icons/ArrowIcon";
import { getBasePath } from "../../../config/environment";
import { Constants } from "../../../config/constants";
import { trackEvent } from "../../../utils/tracker";
import { currentEnvironment, Environments, isMobile } from "../../../config/environment";

export class RMHelpPage extends React.Component<RMHelpPageProps, RMHelpPageState> {

    constructor(props: RMHelpPageProps) {
        super(props);
        this.state = { showCall: false }
    }

    componentWillMount() {
        setTitle('Contact RedMart Support');
    }

    getGaLabel = () => {
        const path = location.href;
        if (path.indexOf('category') >= 0 && path.indexOf('faq') >= 0) {
            return 'Category > FAQ';
        } else if (path.indexOf('category') >= 0) {
            return 'Category';
        } else if (path.indexOf('faq') >= 0) {
            return 'FAQ';
        } else if (path.indexOf('orders') >= 0) {
            return 'Order';
        }
        return undefined;
    }

    handleChatClick = () => {
        trackEvent('Chat', 'click', this.getGaLabel());
    }

    getChatLink  = () => {
        if(currentEnvironment === Environments.production) {
            return "https://www.lazada.sg/help/chat?redmart=1";
        } else {
            return "https://helpcenter-pre.lazada.sg/help/chat?redmart=1";
        }
    }

    handleToggleExpander = () => {
        if (!this.state.showCall) {
            trackEvent('Phone', 'click', this.getGaLabel());
        }

        this.setState({ showCall: !this.state.showCall });
    }

    preparePair = (forCall: boolean) => {
        if (forCall) {
            return (
                <div className={styles.pair}>
                    <a className={styles.btn} href={`tel:${Constants.CS_PHONE_PLAIN}`}>
                        <div className={styles.center}>
                            <div className={cx([styles.call, styles.icon])} />
                            <div className={styles.btn_text}>Call us</div>
                        </div>
                    </a>
                    <div className={styles.timings}>{Constants.CALL_OPERATION_TIME}.</div>
                </div>
            );
        }

        return (
            <div className={styles.pair}>
                <a className={cx([styles.btn, "--js-csc-trigger"])} href = {this.getChatLink()} onClick={this.handleChatClick}>
                    <div className={styles.center}>
                        <div className={cx([styles.chat, styles.icon])} />
                        <div className={styles.btn_text}>Chat with us</div>
                    </div>
                </a>
                <div className={styles.timings}>We are online {Constants.OPERATION_TIME}.</div>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.content}>
                <div className={styles.body}>
                    <div className={styles.subtitle}>Need more help? Our customer support team will be here to assist you.</div>
                    {this.preparePair(false)}
                    <div className={styles.more_option}>
                        <div className={styles.expander} onClick={this.handleToggleExpander}>
                            <div className={styles.expander_text}>More options</div>
                            <div className={cx({ [styles.arrow]: true, [styles.open]: this.state.showCall })}>
                                {this.state.showCall && <ArrowIcon color="#ec472a" direction={Direction.UP} size={4} width={1} />}
                                {!this.state.showCall && <ArrowIcon color="#ec472a" direction={Direction.DOWN} size={4} width={1} />}
                            </div>
                            <div className={styles.clear} />
                        </div>
                        {this.state.showCall && this.preparePair(true)}
                    </div>
                </div>
            </div>
        );
    }
}

interface RMHelpPageState {
    showCall: boolean
}

export interface RMHelpPageProps {
    chat: ChatState,
    recentOrder?: string
}
