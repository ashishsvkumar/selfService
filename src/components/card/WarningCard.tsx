import * as React from "react";
import * as styles from "./WarningCard.scss";
import { clearSession, reLogin } from "../../utils/session";
import { ProtectedLink } from "../wrappers/AuthWrapper";
import { refresh } from "../../utils/extras";
import { setTitle } from "../../utils/container";
import { Button } from "../form/Button";
import { Link } from "react-router-dom";

export const WarningCard = (props: WarningCardProps) => {

    const { message } = props;

    return (
        <div className={styles.content}>
            <div className={styles.warning}>
                {onSessionExpire(props.message)}
                {onNetworkTimeout(props.message)}
                {notFound(props.message)}
                {other(message)}
            </div>
        </div>
    )
};

function other(message: string) {
    const defaultMessage = 'Something went wrong. Please try again later.'
    if (message !== 'FAIL_SYS_HSF_ASYNC_TIMEOUT' && message !== 'FAIL_SYS_SESSION_EXPIRED' && message !== 'TIMEOUT' && message !== 'NOT_FOUND') {
        setTitle('Failure');
        return <div>&#9888; {message.length > defaultMessage.length ? message : defaultMessage}</div>
    }
}

function notFound(message: string) {
    if (message === 'NOT_FOUND') {
        setTitle('Page Not Found');
        return <div>Sorry, the page you are looking for could not be found. <Link to="/">Return to homepage</Link></div>
    }
}

function onNetworkTimeout(message: string) {
    if (message === 'FAIL_SYS_HSF_ASYNC_TIMEOUT' || message === 'TIMEOUT') {
        setTitle('Timeout');

        return (
            <div>
                Your request has timed-out. Please check you network connection and try again.
                <Button text="↻ Retry" style={btnStyle} onClick={refresh}/>
            </div>
        )
    }
}

function onSessionExpire(message: string) {
    if (message === 'FAIL_SYS_SESSION_EXPIRED') {
        setTitle('Session Expired');

        clearSession();
        return (
            <div>
                Your session has expired. Please click below to login again.
                <Button text="Login" style={btnStyle} onClick={reLogin} isPrimary={true}/>
            </div>
        )
    }
}

const btnStyle = {
    margin: '15px auto',
    padding: '16px',
    width: '100%'
}

export interface WarningCardProps {
    message?: string
}