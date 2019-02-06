import { action } from "typesafe-actions";
import { OrderActionTypes, OrderList, OrderDetails } from "./types";
import { orderList, orderDetails } from '../../api/mtop'
import * as log from "loglevel";
import { deflattener, errorCode } from "../../utils/mtop-utils";
import { clearSession } from "../../utils/session";
import { getBasePath } from "../../config/environment";
import { showAlert, hideAlert } from "../alert/actions"

const ordersListRequest = () => action(OrderActionTypes.ORDERS_LIST_REQUEST);
const ordersListSuccess = (data: OrderList) => action(OrderActionTypes.ORDERS_LIST_SUCCESS, data);
const ordersListError = (message: string) => action(OrderActionTypes.ORDERS_LIST_FAILURE, message);

const orderDetailsRequest = (tradeOrderId: string) => action(OrderActionTypes.ORDER_DETAILS_REQUEST, tradeOrderId);
const orderDetailsSuccess = (tradeOrderId: string, data: OrderDetails) => action(OrderActionTypes.ORDER_DETAILS_SUCCESS, { tradeOrderId, data });
const orderDetailsError = (tradeOrderId: string, message: string) => action(OrderActionTypes.ORDER_DETAILS_FAILURE, { tradeOrderId, message });

// Encapsulate the flow of ordersListRequest -> ordersListSuccess / ordersListError
export function fetchOrdersList() {
    return function (dispatch: (param: any) => any): Promise<OrderList | string> {

        // Update app state to indicate that list of orders is being fetched
        log.info('Fetching list of orders')
        dispatch(ordersListRequest())

        return orderList().then((response) => {
            if (response.retType === 0) {
                log.info('Fetched list of orders')
                const data: OrderList = deflattener(response)
                dispatch(ordersListSuccess(data))
                return data;
            } else {
                const err = errorCode(response)
                log.error('Error while fetching list of orders:', err)
                dispatch(ordersListError(err))
                return err
            }
        }).catch((err) => {
            err = errorCode(err)
            log.error('Unexpected error while fetching list of orders:', err)
            dispatch(ordersListError(err))
            handleSessionExpire(err, dispatch)
            return err
        })
    }
}

// Encapsulate the flow of orderDetailsRequest -> orderDetailsSuccess / orderDetailsError
export function fetchOrderDetails(tradeOrderId: string) {
    return function (dispatch: (param: any) => any): Promise<OrderDetails | string> {

        // Update app state to indicate that order details are being fetched
        log.info(`Fetching details of order-${tradeOrderId}`)
        dispatch(orderDetailsRequest(tradeOrderId))

        return orderDetails(tradeOrderId).then((response) => {
            if (response.retType === 0) {
                log.info(`Fetched details of order-${tradeOrderId}`)
                const details: OrderDetails = deflattener(response)
                dispatch(orderDetailsSuccess(tradeOrderId, details))
                return details;
            } else {
                const err = errorCode(response)
                log.error(`Error while fetching details of order-${tradeOrderId}:`, err)
                dispatch(orderDetailsError(tradeOrderId, err))
                return err
            }
        }).catch((err) => {
            err = errorCode(err)
            log.error(`Unexpected error while fetching of order-${tradeOrderId}:`, err)
            dispatch(orderDetailsError(tradeOrderId, err))
            handleSessionExpire(err, dispatch)
            return err;
        })
    }
}

export function fetchAllOrderDetails(limit: number = 24) {
    return function (dispatch: (param: any) => any) {
        fetchOrdersList()(dispatch).then((list) => {
            if ((<OrderList>list).orders) {
                const orders = (list as OrderList).orders
                if (orders.length > 0) {
                    orders.slice(0, limit).forEach(order => fetchOrderDetails(order.tradeOrderId)(dispatch))
                }
            }
        })
    }
}

function handleSessionExpire(err, dispatch: any) {
    if (err === 'FAIL_SYS_SESSION_EXPIRED') {
        clearSession();
        dispatch(showAlert({
            show: true,
            title: 'Session expired!',
            message: 'Your session has expired. Please login again.',
            btnText: 'Close',
            onClick: () => { location.reload() }
        }));
    }
    else if (err = 'FAIL_SYS_HSF_ASYNC_TIMEOUT') {
        dispatch(showAlert({
            show: true,
            title: 'Network Issue',
            message: 'We encountered a problem while connecting to our servers. Please check your network connection, then try again.',
            btnText: 'Retry',
            onClick: () => { location.reload() }
        }));
    }
}