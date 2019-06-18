import { mockOrders, mockDetails, mockUser } from "../mockData/mock";
import { currentEnvironment, Environments } from "../config/environment";

// @ts-ignore
const Mtop = window.lib.mtop;

function useMobileMtop() {
  if (currentEnvironment === Environments.preLive) {
    Mtop.config.prefix = "";
    Mtop.config.subDomain = "acs-wapa";
    Mtop.config.mainDomain = "lazada.sg";
  } else {
    Mtop.config.prefix = "";
    Mtop.config.subDomain = "acs-m";
    Mtop.config.mainDomain = "lazada.sg";
  }
}

function useXSpaceMtop() {
  Mtop.config.prefix = "acs-m";
  Mtop.config.subDomain = "wapa";
  Mtop.config.mainDomain = "taobao.com";
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

export function createCase(request: any): Promise<any> {
  useMobileMtop();

  return Mtop.request({
    ...DEFAULT_CONFIG,
    api: 'mtop.lazmart.helpcenter.case.rawcreate',
    data: request,
    needLogin: false,
    type: 'POST'
  });
}


export function orderList(): Promise<any> {
  if (currentEnvironment === Environments.preLive) {
    return mockOrders();
  }

  useMobileMtop();

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
  if (currentEnvironment === Environments.preLive) {
    return mockDetails(id);
  }

  useMobileMtop();

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
  if (currentEnvironment === Environments.preLive) {
    return mockUser();
  }

  useMobileMtop();

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

  useMobileMtop();

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

  useMobileMtop();

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

  useMobileMtop();

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