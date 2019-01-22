import * as React from "react";
import { OrderHelpPage } from "./OrderHelpPage"
import { Button } from "../../form/Button";
import { OrderDetails, Item } from "../../../store/order/types";
import { extractOrderSummary, itemDetailsToItemPreviewProps } from "../../../utils/transformers";
import { ItemsToggleList, Closed } from "../../item/ItemsToggleList"
import * as styles from "./ItemLevelHelpPage.scss";
import { PopupPage, Style } from "../PopupPage"
import { ItemPreviewProps } from "../../item/ItemPreview";
import { ItemIssue } from "../../item/ItemIssue";
import { SelectOption } from "../../form/Select";
import { Attachment } from "../../form/attachment/Attachment";
import { Ticket, TicketType, RefundMethod } from "../../../store/ticket/types";
import { isEmptyString, isEmptyArray } from "../../../utils/extras";

export class ItemLevelHelpPage extends React.Component<ItemLevelHelpPageProps, ItemLevelHelpPageState> {

    constructor(props: ItemLevelHelpPageProps) {
        super(props);
        this.state = { slideInPopup: false, selectedItems: [], attachments: [], attachmentUploading: false, enableWarning: false, warning: undefined }
    }

    togglePopup = (selectedSku?: string[], status?: Closed) => {
        if (selectedSku !== undefined) {
            const selected = this.props.order.package.orderItems.filter(im => selectedSku.indexOf(im.skuId) >= 0).map(itemDetailsToItemPreviewProps)
            this.setState({ slideInPopup: !this.state.slideInPopup, selectedItems: selected })
        } else {
            this.setState({ slideInPopup: !this.state.slideInPopup })
        }
    }

    getHeading = () => {
        return this.props.helpCategory === Category.missing ? 'Which item(s) are missing?' : 'Which item(s) do you have issues with?'
    }

    getTitle = () => {
        return this.props.helpCategory === Category.missing ? 'Missing Items' : 'Issue with Received Items'
    }

    getLabel = () => {
        return this.props.helpCategory === Category.missing ? 'How many are missing' : 'How many are affected?'
    }

    onQuantityChange = (sku: string, newQuantity: number) => {
        this.state.selectedItems.filter(im => im.sku === sku).forEach(im => im.selectedQuantity = newQuantity);
    }

    onIssueChange = (sku: string, newIssue: string) => {
        const all = [...this.state.selectedItems];
        all.filter(im => im.sku === sku).forEach(im => im.selectedIssue = newIssue);
    
        this.setState({
            selectedItems: all
        });

        if (isEmptyArray(this.getBlackItems())) {
            this.setState({
                warning: undefined
            });
        }
    }

    onRemoveSelection = (sku: string) => {
        const others = this.state.selectedItems.filter(im => im.sku !== sku)
        this.setState({ selectedItems: others })
    }

    onAttachmentUpload = (urls: string[]) => {
        this.setState({ attachments: urls });
    }

    onAttachmentUploadOnGoing = (onGoing: boolean) => {
        this.setState({ attachmentUploading: onGoing })
    }

    onCommentChange = (e: any) => {
        const value = e.target.value;
        this.setState({ comment: value })
    }

    commentsView = () => {
        return (
            <div className={styles.comments}>
                <div className={styles.title}>Additional Information  (optional)</div>
                <div className={styles.subtext}>e.g. If concern involves a multi-pack product, please indicate the number of pieces affected.</div>
                <textarea className={styles.comment} onChange={this.onCommentChange} />
            </div>
        )
    }

    getBlackItems = () => {
        return this.state.selectedItems.filter(item => isEmptyString(item.selectedIssue)).map(item => item.sku);
    }

    canSubmit = () => {
        let can: boolean = true;
        if (this.state.selectedItems.length === 0) {
            can = false;
        }

        const blankItems = this.getBlackItems();
        if (blankItems.length > 0 && this.props.helpCategory === Category.damaged) {
            can = false;
        }

        return can;
    }

    attempSubmit = () => {
        if (!this.canSubmit()) {
            this.setState( { enableWarning: true, warning: "Please select the issue for listed items" } )
            return;
        }

        this.setState({ enableWarning: false, warning: undefined }, this.submitTicket)
    }

    getPrimaryReasonCode = () => {
        const { helpCategory } = this.props;

        if (helpCategory === Category.missing) {
            return "1456125006589";
        } else {
            return issueList.filter(option => option.value === this.state.selectedItems[0].selectedIssue).map(option => option.primaryRC)[0];
        }
    }

    getSecondaryReasonCode = () => {
        const { helpCategory } = this.props;

        if (helpCategory === Category.missing) {
            return "1456125006489";
        } else {
            return issueList.filter(option => option.value === this.state.selectedItems[0].selectedIssue).map(option => option.value)[0];
        }
    }

    submitTicket = () => {
        const ticket: Ticket = {
            type: TicketType.ORDER,
            forLazada: true,
            publicId: this.props.order.detailInfo.tradeOrderId,
            memberId: this.props.order.buyerId,
            email: this.props.order.package.orderItems.map(item => item.buyerEmail)[0],
            comment: this.state.comment,
            attachments: this.state.attachments.map(url => { return { link: url, name: null } }),
            rpc: this.state.selectedItems.map(item => { return { id: item.sku, quantity: item.selectedQuantity, reasonCodeId: item.selectedIssue } }),
            primaryReasonCodeId: this.getPrimaryReasonCode(),
            secondaryReasonCodeId: this.getSecondaryReasonCode(),
            refundMethod: RefundMethod.CC_PAYPAL
        }
        this.props.createTicket(ticket);
    }

    issuesView = () => {

        const { helpCategory, inProgress } = this.props;
        const issues = helpCategory === Category.missing ? undefined : issueList;

        return (
            <div className={styles.selected_items}>
                {this.state.selectedItems.map(item => (
                    <ItemIssue
                        {...item}
                        issueTypes={issues}
                        pickerLabel={this.getLabel()}
                        quantityChanged={(oldQ, newQ) => { this.onQuantityChange(item.sku, newQ) }}
                        selectChanged={(newIssue) => { this.onIssueChange(item.sku, newIssue) }}
                        onDelete={() => { this.onRemoveSelection(item.sku) }}
                        enableWarning={this.state.enableWarning}
                        key={`selected-item-card-${item.sku}`}
                    />
                ))}
                <div className={styles.link_button}>
                    <Button text="Add More Items" style={{ width: '100%', margin: 'auto' }} onClick={() => this.togglePopup()} />
                </div>
                {helpCategory === Category.damaged && <div className={styles.attachment}><Attachment label="Add photo(s) of affected items" onChange={this.onAttachmentUpload} notifyOnProgress={this.onAttachmentUploadOnGoing} /></div>}
                {this.commentsView()}
                <div className={styles.submission}>
                    { helpCategory === Category.damaged && !isEmptyString(this.state.warning) && <div className={styles.warning_text}>&#9888; {this.state.warning}</div> }
                    <div className={styles.subtitle}>Upon verification of your claim, we will issue a refund to your original payment method within 24 business hours.</div>
                    <Button text="Submit" isPrimary={true} style={{ padding: '12px', width: '80%', margin: 'auto' }} isDisabled={this.state.attachmentUploading || inProgress} onClick={this.attempSubmit} />
                </div>
            </div>
        )
    }

    itemListPopupView = () => {
        const items: ItemPreviewProps[] = this.props.order.package.orderItems.map(itemDetailsToItemPreviewProps)

        const preSelected = items.map(im => im.sku).filter(sku => this.state.selectedItems.some(im => im.sku === sku))
        return (
            <PopupPage popupStyle={Style.FULLSCREEN} show={this.state.slideInPopup}>
                <ItemsToggleList
                    items={items}
                    onClose={this.togglePopup}
                    selectedSkus={preSelected}
                    header={this.getHeading()}
                />
            </PopupPage>
        )
    }

    body = () => {
        return (
            <div className={styles.content}>
                <div className={styles.title}>{this.getHeading()} </div>
                {this.state.selectedItems.length > 0 && this.issuesView()}
                {this.state.selectedItems.length === 0 && <Button text="Select Items" onClick={() => this.togglePopup()} style={{ width: '100%' }} />}
                {this.itemListPopupView()}
            </div>
        )
    }

    render() {
        return <OrderHelpPage title={this.getTitle()} body={this.body()} order={extractOrderSummary({ data: this.props.order, loading: false })} />
    }
}

interface ItemLevelHelpPageState {
    slideInPopup: boolean,
    enableWarning: boolean,
    warning?: string,
    selectedItems: ItemPreviewProps[],
    attachments: string[],
    comment?: string,
    attachmentUploading: boolean,
}

export const enum Category {
    missing = "missing",
    damaged = "damaged"
}

export interface ItemLevelHelpPageProps {
    order: OrderDetails,
    helpCategory: Category,
    createTicket: (ticket: Ticket) => void,
    inProgress: boolean
}

interface IssueReasonCode extends SelectOption {
    primaryRC: string
}

const issueList: IssueReasonCode[] = [
    { displayText: 'Item was broken', value: '1456125006689', primaryRC: '1456125006989' },
    { displayText: 'Item was dented', value: '1456125006789', primaryRC: '1456125006989' },
    { displayText: 'Item was leaking', value: '1456125006889', primaryRC: '1456125006989' },
    { displayText: 'The item is expired', value: '1456125007889', primaryRC: '1456125007989' },
    { displayText: 'The item is close to Expiry', value: '1456125008089', primaryRC: '1456125007989' },
    { displayText: 'The item was rotten or moldy', value: '1456125007289', primaryRC: '1456125007489' },
    { displayText: 'The item may be contaminated', value: '1456125007189', primaryRC: '1456125007489' },
    { displayText: 'Frozen item was thawed', value: '1456125007589', primaryRC: '1456125007789' },
    { displayText: 'Fresh item was frozen', value: '1456125007689', primaryRC: '1456125007789' },
];