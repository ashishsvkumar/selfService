import * as React from "react";
import * as styles from "./ChatEntry.scss";
import cx from 'classnames';
import { currentEnvironment, Environments, isMobile } from "../../../config/environment";
import { setTitle } from "../../../utils/container";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { showMessage } from "../../../store/alert/actions";
import { PopupText } from "../../../components/card/ContactUs";
import { setBreadcrumbs } from "../../../store/breadcrumb/actions";
import { BreadcrumbEntry } from "../../../store/breadcrumb/types";
import { ContentTitle } from "../../labels/ContentTitle";


class ChatEntry extends React.Component<ChatEntryProps, {}> {
    
    constructor(props: ChatEntryProps) {
        super(props);
    }

    componentWillMount() {
        setTitle('Contact RedMart');
        this.props.setBreadcrumbs([
            { text: 'Contact RedMart', url: location.href, needLogin: false }
        ]);
    }

    ordersLink = () => {
        if (currentEnvironment === Environments.production) {
            return isMobile() ? 'https://my-m.lazada.sg/order/order-management' : 'https://my.lazada.sg/customer/order/index'
        } else {
            return isMobile() ? 'https://my-rm-p.lazada.sg/order/order-management' : 'https://my-rm.lazada.sg/customer/order/index'
        }
    }

    prepareCard = (title: string, subtitle: string, url: string) => {
        const frag = (
            <React.Fragment>
                <div className={styles.card_title}>{title}</div>
                <div className={styles.card_subtitle}>{subtitle}</div>
            </React.Fragment>
        );

        if (url.indexOf('://') < 0) {
            return <Link className={styles.card} to={url}>{frag}</Link>;
        } else {
            return <a className={styles.card} href={url}>{frag}</a>
        }
    }

    onMore = () => {
        this.props.showMessage('Contact Us', PopupText(), 'Close');
    }
    
    render() {
        return (
            <div className={styles.container}>
                <div className={cx([styles.only_desktop])}><ContentTitle text="Contact RedMart"/></div>
                <div className={styles.content}>
                    <div className={styles.title}>Hi, how can we help you?</div>
                    <div className={styles.cards}>
                        {this.prepareCard('I want to update my delivery', 'Change your delivery slot and shipping information', this.ordersLink())}
                        {this.prepareCard('I want to cancel my order', 'Items in your order cannot be amended upon check-out', this.ordersLink())}
                        {this.prepareCard('I want to report an issue for my received order', 'Request for a refund and provide your feedback', '/orders')}
                        {this.prepareCard('I have a question about a product or RedMart', 'Ask us about RedMart product features here', '/')}
                    </div>
                    <div className={styles.others}>
                        <div>I have another question</div>
                        <Link to="/" className={styles.link_back}>Browse Help Center &nbsp;&nbsp;❯</Link>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>Contact Us</div>
                    <div className={styles.card_subtitle}>Can't find the answer you are looking for? Contact us through <b>Live Chat</b> and we will assist you.</div>
                    <div className={styles.btn} onClick={this.onMore}>
                        <div className={styles.center}>
                            <div className={styles.icon}/>
                            <div className={styles.btn_text}>Chat Now</div>
                            <div className={styles.clear}/>
                        </div>
                    </div>
                    <div className={styles.timings}>7am - 11pm SGT daily.</div>
                    <br/>
                    <div className={styles.card_subtitle}>Still Need Help? <span className={styles.more} onClick={this.onMore}>Click here.</span></div>
                </div>
            </div>
        )
    }
}

interface PropsFromDispatch {
    showMessage: (title: string, message: any, btnText: string) => void,
    setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

type ChatEntryProps = PropsFromDispatch;

const mapDispatchToProps = {
    showMessage: showMessage,
    setBreadcrumbs: setBreadcrumbs
}

export default connect(null, mapDispatchToProps)(ChatEntry);
