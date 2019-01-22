import * as React from "react";
import * as styles from "./QueryFormPage.scss";
import cx from 'classnames';
import { setTitle } from '../../../utils/container'
import { isLoggedIn, getUserId } from "../../../utils/session"
import { Button } from "../../form/Button";
import { isEmptyString } from "../../../utils/extras";
import { ContactUs } from "../../card/ContactUs"
import { Ticket, TicketType } from "../../../store/ticket/types";

export class QueryFormPage extends React.Component<QueryFormPageProps, QueryFormPageState> {

    constructor(props: any) {
        super(props);
        this.state = { email: undefined, subject: undefined, comment: undefined, emailWarn: false, subjectWarn: false, commentWarn: false };
    }

    isValidEmail = (str: string): boolean => {
        if (isEmptyString(str)) {
            return false;
        }
        const atIndex = str.indexOf('@');
        const dotIndex = str.lastIndexOf('.');

        return atIndex > 0 && dotIndex > 0 && dotIndex < str.length - 1 && atIndex < dotIndex;
    }

    onEmailChange = (e: any) => {
        const value = e.target.value;
        this.setState({ email: value, emailWarn: !this.isValidEmail(value) })
    }

    onSubjectChange = (e: any) => {
        const value = e.target.value;
        this.setState({ subject: value, subjectWarn: isEmptyString(value) })
    }

    onCommentChange = (e: any) => {
        const value = e.target.value;
        this.setState({ comment: value, commentWarn: isEmptyString(value) })
    }

    canSubmit = (): boolean => {
        let can: boolean = true;

        if (!isLoggedIn()) {
            if (isEmptyString(this.state.email)) {
                this.setState({ emailWarn: true });
                can = false;
            }
        }

        if (isEmptyString(this.state.subject)) {
            this.setState({ subjectWarn: true });
            can = false;
        }

        if (isEmptyString(this.state.comment)) {
            this.setState({ commentWarn: true });
            can = false;
        }

        return can;
    }

    attemptSubmit = () => {
        this.setState({
            emailWarn: false,
            subjectWarn: false,
            commentWarn: false
        }, this.submitTicket)
    }

    submitTicket = () => {
        if (!this.canSubmit()) {
            return false;
        }

        const ticket: Ticket = {
            subject: this.state.subject,
            comment: this.state.comment,
            type: TicketType.MISCELLANEOUS,
            forLazada: true,
            email: this.state.email,
            memberId: getUserId()
        }
        this.props.createTicket(ticket);
    }

    render() {
        setTitle('Something else');

        const emailClassNames = cx({ [styles.text]: true, [styles.warn]: this.state.emailWarn });
        const subjectClassNames = cx({ [styles.text]: true, [styles.warn]: this.state.subjectWarn });
        const commentClassNames = cx({ [styles.details]: true, [styles.warn]: this.state.commentWarn });

        return (
            <div className={styles.content}>
                {!isLoggedIn() && <div className={styles.label}>Please provide your email address</div>}
                {!isLoggedIn() && <input className={emailClassNames} type="email" onChange={this.onEmailChange} />}
                {!isLoggedIn() && this.state.emailWarn && <div className={styles.warn_text}>&#9888; {`${ isEmptyString(this.state.email) ? 'Please don’t leave this empty' : 'Please provide a valid email address' }`}</div> }
                <div className={styles.label}>Let us know your main concern</div>
                <input className={subjectClassNames} type="text" onChange={this.onSubjectChange} />
                {this.state.subjectWarn && <div className={styles.warn_text}>&#9888; Please don’t leave this empty.</div>}
                <div className={styles.label}>Please provide us with more information so we can help you</div>
                <textarea className={commentClassNames} onChange={this.onCommentChange} />
                {this.state.commentWarn && <div className={styles.warn_text}>&#9888; Please don’t leave this empty.</div>}

                <div className={styles.submit}>
                    <Button text="Submit" isPrimary={true} style={{ padding: '12px', width: '80%', margin: 'auto' }} isDisabled={this.props.inProgress} onClick={this.attemptSubmit} />
                    <div className={styles.contact}><ContactUs /></div>
                </div>
            </div>
        );
    }
}

interface QueryFormPageState {
    email?: string,
    subject?: string,
    comment?: string,
    emailWarn: boolean,
    subjectWarn: boolean,
    commentWarn: boolean
}

export interface QueryFormPageProps {
    createTicket: (ticket: Ticket) => void,
    inProgress: boolean
}