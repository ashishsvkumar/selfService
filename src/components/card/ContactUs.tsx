import * as React from "react";
import * as styles from "./ContactUs.scss";
import cx from 'classnames';
import { Link } from "react-router-dom";
import { Constants } from "../../config/constants";

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
                    <div className={cx([styles.btn, styles.disabled])} onClick={props.onMoreClick}>
                        <div className={styles.chat} />
                        <div className={styles.label}>Other Options</div>
                    </div>
                </div>
                <div className={styles.subtext}>{Constants.OPERATION_TIME}</div>
            </div>
        </div>
    )
};

export const PopupText = () => {
    return (
        <div style={{ border: '1px solid #ddd', padding: '12px 14px', fontSize: '14px' }}>
            <div style={{ fontSize: '14px', marginBottom: '12px', color: '#333' }}>Our Customer Service Hotline:</div>
            <span style={{ fontSize: '14px', color: '#333', fontWeight: 'bold', display: 'inline-block', marginRight: '12px' }}>+65 6261 3456 </span>
            <span style={{ color: '#666', display: 'inline-block', fontSize: '12px' }}>{Constants.OPERATION_TIME}</span>
        </div>
    );
}

export interface ContactUsProps {
    onChatClick: () => void,
    onMoreClick: () => void,
    chatMessage: string
}
