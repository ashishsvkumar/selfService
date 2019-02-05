import * as React from "react";
import * as styles from "./ContactUs.scss";
import cx from 'classnames';
import { startChat } from '../../chat/snapengage';

export const ContactUs = () => {

    return (
        <div className={styles.content}>
            <div className={cx([styles.only_desktop, styles.title])}>Need further help?</div>
            <div className={styles.btns}>
                <div className={styles.btn} onClick={startChat}>
                    <div className={styles.chat}/>
                    <div className={styles.label}>Chat with us</div>
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
    )
};

