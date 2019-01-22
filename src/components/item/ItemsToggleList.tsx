import * as React from "react";
import * as styles from "./ItemsToggleList.scss";
import { ItemPreviewProps } from "./ItemPreview";
import { Button } from "../form/Button";
import { ItemToggle } from "./ItemToggle";


export class ItemsToggleList extends React.Component<ItemsToggleListProps, ItemsToggleListState> {

    constructor(props: ItemsToggleListProps) {
        super(props)
        this.state = { draftSku: this.props.selectedSkus ? this.props.selectedSkus : [] }
    }

    isSelected = (item: ItemPreviewProps) => {
        return this.state.draftSku.indexOf(item.sku) >= 0;
    }

    onToggle = (sku: string) => {
        if (this.state.draftSku.indexOf(sku) >= 0) {
            this.setState({ draftSku: this.state.draftSku.filter(sl => sl !== sku) })
        }
        else {
            this.setState({ draftSku: [...this.state.draftSku, sku] })
        }
    }

    listItem = (item: ItemPreviewProps) => {
        return (
            <ItemToggle
                {...item}
                key={`item-row-${item.sku}-${item.name}`}
                isChecked={this.isSelected(item)}
                onToggle={() => { this.onToggle(item.sku) }}
            />
        )
    }

    onCancel = () => {
        this.props.onClose && this.props.onClose(this.props.selectedSkus, Closed.CANCELLED);
        this.setState({ draftSku: this.props.selectedSkus })
    }

    onSave = () => {
        this.props.onClose && this.props.onClose(this.state.draftSku, Closed.SAVED)
    }

    render() {
        const { header, items } = this.props;

        return (
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.title}>{header}</div>
                    <div className={styles.close_btn} onClick={this.onCancel} />
                    <div className={styles.clear} />
                </div>
                <div className={styles.list}>
                    {items.map(item => this.listItem(item))}
                </div>
                <div className={styles.footer}>
                    <Button isPrimary={true} text="Next" style={{ padding: '10px 20px', width: '80%', margin: 'auto' }} onClick={this.onSave} />
                </div>
            </div>
        )
    }
}

interface ItemsToggleListState {
    draftSku: string[]
}

export const enum Closed {
    CANCELLED = "cancelled", SAVED = "saved"
}

export interface ItemsToggleListProps {
    header: string,
    items: ItemPreviewProps[],
    selectedSkus?: string[],
    onClose?: (selectedSkus: string[], closedAs: Closed) => void
}