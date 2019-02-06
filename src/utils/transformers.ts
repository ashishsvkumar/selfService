import { OrderDetails, OrderDetailsState, Item, OrderSummary, DetailInfo, ShippingInfo, Package } from "../store/order/types";
import { OrderSummaryProps } from "../components/order/OrderSummary";
import { ItemPreviewProps } from "../components/item/ItemPreview";
import * as log from "loglevel";
import { isEmptyArray, isEmptyObject, isEmptyString } from "./extras";

export function extractOrderSummary(order: OrderDetails | OrderDetailsState | null): OrderSummaryProps | null {
    let data: OrderDetails;

    if (order === null) {
        return null;
    }
    else if (<OrderDetailsState>order) {
        const orderState = (<OrderDetailsState>order);
        if (orderState.loading || orderState.errors || !orderState.data) {
            return null;
        }

        data = orderState.data

    } else if (<OrderDetails>order) {
        data = <OrderDetails>order;
    } else {
        return null;
    }

    return {
        tradeOrderId: data.detailInfo.tradeOrderId,
        deliverySlot: getSlot(data.package.orderItems, data.detailInfo),
        deliveryStatus: getStatus(data.detailInfo, data.package, null),
        itemThumnails: data.package.orderItems.map(item => item.picUrl)
    }
}

export function orderSummaryToProps(order: OrderSummary): OrderSummaryProps {
    return {
        tradeOrderId: order.tradeOrderId,
        deliveryStatus: getStatus(order.orderInfo, null, order.orderItems),
        deliverySlot: getSlot(order.orderItems, order.orderInfo),
        itemThumnails: order.orderItems.map(item => item.picUrl)
    }
}

export function itemDetailsToItemPreviewProps(item: Item): ItemPreviewProps {
    return {
        sku: item.skuId,
        name: item.title,
        unitPrice: item.price,
        quantity: item.quantity,
        thumbnail: item.picUrl,
        selectedQuantity: 1,
        selectedIssue: undefined
    }
}

export function getSlot(items: Item[], detail: DetailInfo): string {
    const deliveryTimes = items.filter(item => item.delivery).map(item => item.delivery.desc)

    if (deliveryTimes && deliveryTimes.length > 0) {
        // All RedMart orders will be delivered at same time
        return deliveryTimes[0];
    }

    return detail.createdAt;
}

export function getStatus(detail: DetailInfo, orderPackage: Package, items: Item[]) {
    if (!isEmptyObject(detail) && !isEmptyString(detail.status)) {
        return detail.status;
    }
    if (!isEmptyObject(orderPackage) && !isEmptyString(orderPackage.status)) {
        return orderPackage.status;
    }
    if (!isEmptyArray(items) && items.some(im => !isEmptyString(im.status))) {
        return items.filter(im => !isEmptyString(im.status)).map(im => im.status)[0];
    }

    return '';
}

export function blobToFile(theBlob: Blob, fileName: string): File {
    var blob: any = theBlob;
    blob.lastModifiedDate = new Date();
    blob.name = fileName;

    //Cast to a File() type
    return <File>blob;
}
