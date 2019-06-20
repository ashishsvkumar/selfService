import { mockOrders, mockDetails, mockUser } from "../mockData/mock";
import { currentEnvironment, Environments } from "../config/environment";
import { CaseRequest } from "../store/ticket/types";

// @ts-ignore
const Mtop = window.lib.mtop;
Mtop.config.prefix = "";


function sgMtop() {
  if (currentEnvironment === Environments.preLive) {
    Mtop.config.subDomain = "acs-wapa";
  } else {
    Mtop.config.subDomain = "acs-m";
  }
  Mtop.config.mainDomain = "lazada.sg";
}

function myMtop() {
  if (currentEnvironment === Environments.preLive) {
    Mtop.config.subDomain = "acs-wapa";

  } else {
    Mtop.config.subDomain = "acs-m";
  }
  Mtop.config.mainDomain = "lazada.com.my";
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

export function createXspaceCase(caseRequest: CaseRequest): Promise<any> {

  myMtop();

  return Mtop.request({
    ...DEFAULT_CONFIG,
    api: 'mtop.lazmart.selfservice.create',
    data: { case: JSON.stringify(caseRequest) }
  });
}

export function orderList(): Promise<any> {
  if (isMock()) {
    return mockOrders();
  }

  sgMtop();

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

  sgMtop();

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

  sgMtop();

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

  sgMtop();

  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      appKey: 4272,
      needLogin: false,
      api: "mtop.helpcenter.category.getrootcategories",
      data: {}
    }
  );
}

export function getCategoriesByUrlKey(urlKey: string): Promise<any> {

  sgMtop();

  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      appKey: 4272,
      needLogin: false,
      api: "mtop.helpcenter.category.getByUrlKey",
      data:
      {
        urlKey: urlKey
      },
    }
  );
}


export function getArticleByUrlKey(urlKey: string): Promise<any> {

  sgMtop();

  return Mtop.request(
    {
      ...DEFAULT_CONFIG,
      appKey: 4272,
      needLogin: false,
      api: "mtop.helpcenter.article.getByUrlKey",
      data:
      {
        urlKey: urlKey
      },
    }
  );
}
