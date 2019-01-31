/**
 * For Orders' List API
 */

export interface OrderList {
  chosenLimit: OrderListRange;
  timeLimits: OrderListRange[];
  orders?: OrderSummary[];
}

export interface OrderListRange {
  key: number;
  text: string;
}

export interface OrderSummary {
  createdAt: string;
  tradeOrderId: string;
  linkColor: string;
  sequence: number;
  orderInfo: DetailInfo;
  orderItems: Item[];
}

export interface Item {
  title: string;
  quantity: number,
  tradeOrderId: string;
  itemUrl: string;
  picUrl: string;
  icons: string[];         // Store icons
  sellerId: string;
  price: string;
  skuId: string;
  itemId: string;
  isFreeGift: boolean;
  isFreeSample: boolean;
  reviewable: boolean;
  status: string;
  sequence: number;
  buyerEmail: string,
  delivery: { desc: string, email: string };
  shippedInfo: { status: string, text: string };
  reversible: { desc: string }
}

/**
 * For Orders Details API
 */

export interface Package {
  isLiveUp: boolean;
  packageId: string;
  orderItems: Item[];
  shippingInfo: ShippingInfo;
  sellerInfo: SellerInfo;
  status: string;
}

export interface DeliverySummary {
  consignee: string;       // Person
  address: string;
  phone: string;
  kind: string;
  postCode: string;
  title: string;            // Shipping Address
}

export interface ShippingInfo {
  statusMap: { active: string, all: string[] };            // What all status are possible and which one is active
  delivery: {
    createdAt: string,
    method: string,
    desc: string,
    status: string,
  };
}

export interface TotalSummary {
  total: string;
  fees: Fee[];
}

export interface Fee {
  key: string;
  value: string;
}

export interface SellerInfo {
  sellerId: string;
  shopName: string;
  IMHost: string;      // like http://native.m.lazada.co
  accountId: string;
  IMUrl: string;       // like /chat_page?targetid=100100128&orderid=840204398013&suborderid=840204598013&_p_slr=8&targettype=2&type=103&from=order
  imSwitch: boolean;
  imChatName: string;
}

export interface DetailInfo {
  createdAt: string;
  total: string;
  visaCode: string;       // Paid by card xxxx-1111,
  authCode: string;       // Authorization Code 133906,
  tradeOrderId: string;
  paidAt: string;
  linkText: string;
  linkColor: string;
}

export interface OrderDetails {
  detailInfo: DetailInfo;
  package: Package;
  totalSummary: TotalSummary;
  deliverySummary: DeliverySummary;
  buyerId: string;
}


/**
 * Action Types
 */

export const enum OrderActionTypes {
  ORDERS_LIST_REQUEST = "orders/list/request",
  ORDERS_LIST_SUCCESS = "orders/list/success",
  ORDERS_LIST_FAILURE = "orders/list/failure",
  ORDER_DETAILS_REQUEST = "order/details/request",
  ORDER_DETAILS_SUCCESS = "order/details/success",
  ORDER_DETAILS_FAILURE = "order/details/failure",
}

/**
 * Order State
 */

export interface OrdersListState {
  readonly loading: boolean;
  readonly data?: OrderList;
  readonly errors?: string;
}

export interface OrdersDetailsState {
  [propName: string]: OrderDetailsState;           // tradeOrderId -> tradeOrderDetails
}

export interface OrderDetailsState {
  readonly loading: boolean;
  readonly data?: OrderDetails;
  readonly errors?: string;
}
