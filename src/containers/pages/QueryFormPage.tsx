import * as React from "react";
import { connect } from "react-redux";
import { QueryFormPage as Component } from "../../components/pages/query/QueryFormPage"
import { createTicket } from "../../store/ticket/actions";
import { ApplicationState } from "../../store";
import { Ticket } from "../../store/ticket/types";

export class QueryFormPage extends React.Component<QueryFormPageProps, QueryFormPageState> {

    constructor(props: QueryFormPageProps) {
        super(props);
    }

    render() {
        return <Component createTicket={this.props.createTicket} inProgress={this.props.ticketInProgress} />
    }
}

interface QueryFormPageState {

}

interface PropsFromDispatch {
    createTicket: (ticket: Ticket) => void
}

interface PropsFromState {
    ticketInProgress: boolean
}

type QueryFormPageProps = PropsFromDispatch & PropsFromState;

const mapDispatchToProps = {
    createTicket: createTicket
}

const maptStateToProps = ({ ticket }: ApplicationState) => {
    return {
        ticketInProgress: ticket.inProgress
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(QueryFormPage);