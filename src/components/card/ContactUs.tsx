import * as React from "react";
import * as styles from "./ContactUs.scss";
import cx from 'classnames';
import { Link } from "react-router-dom";

export const ContactUs = (props: ContactUsProps) => {

    return (
        <div className={cx(styles.content)}>
            <div className={styles.only_mobile}>
                <div className={styles.link_to_contact}>
                    <span>If you still need help,</span> <Link to="/contact">contact RedMart Support</Link>.
                </div>
            </div>
            <div className={styles.only_desktop}>
                <div className={cx([styles.only_desktop, styles.title])}>Need further help?</div>
                <div className={styles.subtitle}>Our customer support team will be here to assist you.</div>
                <div className={styles.btns}>
                    <div className={styles.btn} onClick={props.onChatClick}>
                        <div className={styles.chat} />
                        <div className={styles.label}>{props.chatMessage}</div>
                    </div>
                    <div className={cx([styles.btn, styles.disabled])} onClick={props.onChatClick}>
                        <div className={styles.chat} />
                        <div className={styles.label}>More Options</div>
                    </div>
                </div>
                <div className={styles.subtext}>7am - 11pm SGT Daily</div>
            </div>
        </div>
    )
};

export interface ContactUsProps {
    onChatClick: () => void,
    chatMessage: string
}
