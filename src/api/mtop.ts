import { mockOrders, mockDetails, mockUser } from "../mockData/mock";
import { currentEnvironment, Environments } from "../config/environment";
const useMock: boolean = location.search.indexOf('mock=true') >= 0;

// @ts-ignore
const Mtop = window.lib.mtop;

if (currentEnvironment === Environments.production) {
  Mtop.config.prefix = "";
  Mtop.config.subDomain = "acs-wapa";
  Mtop.config.mainDomain = "lazada.sg";
} else {
  Mtop.config.prefix = "";
  Mtop.config.subDomain = "acs-wapa-rm";
  Mtop.config.mainDomain = "lazada.sg";
}

const DEFAULT_CONFIG = {
  "v": "1.0",
  "data": { ultronVersion: 2.2 },
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
      "data": {
        sellerId: 1000008313,
        ultronVersion: 2.2
      }
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
        tradeOrderId: parseInt(id, 10),
        ultronVersion: 2.2
      }
    });
}


export function memberDetails(userId: string, sessionId: string): Promise<any> {
  if (useMock) {
    return mockUser();
  }

  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      api: "mtop.lazada.member.user.biz.getloginuser",
      data: {
        sessionId: sessionId,
        userId: parseInt(userId, 10),
        ultronVersion: 2.2
      }
    }
  );
}