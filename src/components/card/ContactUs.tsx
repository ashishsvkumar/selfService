import * as React from "react";
import * as styles from "./ContactUs.scss";

export const ContactUs = () => {

    return (
        <div className={styles.content}>
            <div className={styles.btns}>
                <div className={styles.btn}>
                    <div className={styles.chat} />
                    <div className={styles.label}>Chat with us</div>
                </div>
                <a className={styles.btn} href="tel:+6562613456">
                    <div className={styles.call} />
                    <div className={styles.label}>Call us</div>
                </a>
            </div>
            <div className={styles.subtext}>7am - 11pm SGT Daily</div>
        </div>
    )
};
