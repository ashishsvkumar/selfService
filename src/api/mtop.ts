import { mockOrders, mockDetails, mockUser } from "../mockData/mock";
import { currentEnvironment, Environments } from "../config/environment";

// @ts-ignore
const Mtop = window.lib.mtop;

if (currentEnvironment === Environments.preLive) {
  Mtop.config.prefix = "";
  Mtop.config.subDomain = "acs-wapa";
  Mtop.config.mainDomain = "lazada.sg";
} else {
  Mtop.config.prefix = "";
  Mtop.config.subDomain = "acs-m";
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
  isSec: 1,
  AntiCreep: true
};

export function isMock() {
  return /(&?)test=true/.test(location.search);
}

export function orderList(): Promise<any> {
  if (isMock()) {
    return mockOrders();
  }

  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      api: "mtop.lazada.om.orderlist",
      "data": {
        sellerId: 1000008313,
        "ultronVersion": "2.2"
      }
    });
}

export function orderDetails(id: string): Promise<any> {
  if (isMock()) {
    return mockDetails(id);
  }

  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      api: "mtop.lazada.om.orderdetail",
      data: {
        tradeOrderId: id,
        "ultronVersion": "2.1"
      }
    });
}


export function memberDetails(userId: string, sessionId: string): Promise<any> {
  if (isMock()) {
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

export function getRootCategories(): Promise<any> {
  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      appKey: 4272,
      needLogin: false,
      api:"mtop.helpcenter.category.getrootcategories",
      data: {}  
    }
  );
}

export function getCategoriesByUrlKey(urlKey: string): Promise<any> {
  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      appKey: 4272,
      needLogin: false,
      api:"mtop.helpcenter.category.getByUrlKey",
      data: 
      {
        urlKey: urlKey
      },
    }
  );
}


export function getArticleByUrlKey(urlKey: string): Promise<any> {
  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      appKey: 4272,
      needLogin: false,
      api:"mtop.helpcenter.article.getByUrlKey",
      data: 
      {
        urlKey: urlKey
      },
    }
  );
}
