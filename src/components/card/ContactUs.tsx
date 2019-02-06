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
                <div className={styles.btns}>
                    <div className={styles.btn} onClick={props.onChatClick}>
                        <div className={styles.chat} />
                        <div className={styles.label}>{props.chatMessage}</div>
                    </div>
                    <a className={styles.btn} href="tel:+6562613456">
                        <div className={styles.call} />
                        <div className={styles.label}>
                            <span className={styles.only_mobile}>Call us</span>
                            <span className={styles.only_desktop}>Call +65 6261 3456</span>
                        </div>
                    </a>
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
