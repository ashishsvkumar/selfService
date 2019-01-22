import { mockOrders, mockDetails } from "../mockData/mock";
const useMock: boolean = location.search.indexOf('mock=true') >= 0 || location.host.indexOf('redmart.com') > 0;

// @ts-ignore
const Mtop = window.lib.mtop;

Mtop.config.prefix = "acs";
Mtop.config.subDomain = "waptest";
Mtop.config.mainDomain = "lazada.test";

const DEFAULT_CONFIG = {
  "v": "1.0",
  "data": {},
  "appKey": "24814220",
  "type": "GET",
  "ecode": 0,
  "dataType": "json",
  "needLogin": true,
  "timeout": 5000,
  "x-i18n-language": "en",
  "x-i18n-regionID": "sg",
};

export function orderList(): Promise<any> {
  if (useMock) {
    return mockOrders();
  }

  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      api: "mtop.lazada.om.orderlist",
    });
}

export function orderDetails(id: string): Promise<any> {
  if (useMock) {
    return mockDetails(id);
  }

  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      api: "mtop.lazada.om.orderdetail",
      data: {
        tradeOrderId: parseInt(id, 10)
      }
    });
}
