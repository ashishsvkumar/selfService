import { action } from "typesafe-actions";
import { RedMartPackageActionTypes, RedMartPackage } from "./types";
import { orderList, orderDetails } from '../../api/mtop'
import * as log from "loglevel";
import { deflattener, errorCode } from "../../utils/mtop-utils";
import { RM_SELLER_ID } from "../../config/environment";
import { get, isEmpty, has } from 'lodash';

const request = () => action(RedMartPackageActionTypes.FETCH);
const success = (data: RedMartPackage[]) => action(RedMartPackageActionTypes.SUCCESS, data);
const failure = (error: string) => action(RedMartPackageActionTypes.FAILURE, error);


type Dispatch = (param: any) => any;

export function fetchRedMartPackages() {
    return function (dispatch: Dispatch) {
        log.info('Fetching RedMart packages 📦');
        dispatch(request());

        return orderList().then((response) => {
            if (response.retType === 0) {
                const tradeOrderIds: string[] = deflattener(response).orders.filter(filterForRedMartOrders).map(order => get(order, 'tradeOrderId'));
                log.info('Fetched traderOrderIds of RedMart Orders 📦', tradeOrderIds);
                dispatch(success(null))
                fetchAllDetails(tradeOrderIds, dispatch)
            } else {
                onError(response, dispatch);
            }
        }).catch(err => onError(err, dispatch))
    }
}

function onError(err: any, dispatch: Dispatch) {
    err = errorCode(err)
    log.error('Exception while fetching RedMart packages 📦:', err)
    dispatch(failure(err))
}

function filterForRedMartOrders(order: any) {
    const items: any[] = get(order, 'orderItems');
    return !isEmpty(items) && items.some(im => im.sellerId == RM_SELLER_ID || true); // Use loose equality!!!
}

function fetchAllDetails(ids: string[], dispatch: Dispatch) {
    // @ts-ignore
    Promise.all(ids.map(fetchDetails)).then(list => list.filter(data => data !== null)).then(list => {
        const packages: RedMartPackage[] = list.map(digestOrder);
        dispatch(success(packages))
    });
}

function digestOrder(order: any): RedMartPackage {
    const packages = has(order, 'package') ? [order.package] : order.packages;
    if (isEmpty(packages)) {
        return null;      // unlikely
    }

    const rmPackages = packages.filter(pack => has(pack, 'orderItems')).filter(pack => pack.orderItems.every(im => im.sellerId == "3356"))
    if (isEmpty(rmPackages)) {
        return null;
    }

    const out: any = {};
    out.status = rmPackages[0].status;
    out.items = rmPackages[0].orderItems.map(im => {
        out.tradeOrderId = im.tradeOrderId;
        out.deliverySlot = has(im, 'delivery.desc') ? im.delivery.desc : null;
        return {
            name: im.title,
            quantity: im.quantity,
            unitPrice: im.price,
            itemId: im.itemId,
            skuId: im.skuId,
            productPage: im.itemUrl,
            thumbnail: im.picUrl,
            isFreeGift: im.isFreeGift,
            isFreeSample: im.isFreeSample
        };
    });

    if (has(order, 'detailInfo.createdAt')) {
        out.createdAt = order.detailInfo.createdAt;
    }

    return out;
}

function fetchDetails(id: string) {
    return orderDetails(id)
        .then((response: any) => {
            if (response.retType === 0) {
                return deflattener(response);
            } else {
                return null;
            }
        })
        .catch(err => null)
}