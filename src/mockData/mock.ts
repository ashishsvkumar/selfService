import { mockOrdersList } from './ordersList';
import { o1 } from "./o1"
import { o2 } from "./o2"
import { o3 } from "./o3"
import { o4 } from "./o4"
import { o5 } from "./o5"
import { o6 } from "./o6"
import { o7 } from "./o7"
import { o8 } from "./o8"
import { o9 } from "./o9"
import { o10 } from "./o10"
import { isEmptyObject } from '../utils/extras';

const orders = [o1, o2, o3, o4, o5, o6, o7, o8, o9, o10];

export function mockOrders() {
    // @ts-ignore
    return new Promise<any>((resolve: Function) => { 
        console.log('aaa', mockOrdersList)
        mockOrdersList.retType = 0;
        resolve(mockOrdersList) 
    });
}

export function mockDetails(id: string) {
    // @ts-ignore
    return new Promise<any>((resolve: Function, reject: Function) => { 
        const order = orders.filter(order => isOrder(order, id));
        if (order.length > 0) {
            order[0].retType = 0;
            resolve(order[0])
        } else {
            reject({ module: { data: {} } })
        }
    });
}

function isOrder(order: any, id: string) {
    return !isEmptyObject(order.data.data[`root_${id}`]);
}