export const o5: any = {
    "api": "mtop.lazada.om.orderdetail",
    "data": {
        "data": {
            "totalSummary_838500498013": {
                "tag": "totalSummary",
                "id": "838500498013",
                "type": "biz",
                "fields": {
                    "total": "$17.99",
                    "fees": [{
                        "key": "Subtotal",
                        "value": "$12.00"
                    }, {
                        "key": "Shipping Fee",
                        "value": "$5.99"
                    }],
                    "taxTitle": "GST Incl.",
                    "payments": [{
                        "key": "Paid by",
                        "value": "Credit/Debit Card"
                    }]
                }
            },
            "orderItem_838500698013": {
                "tag": "orderItem",
                "id": "838500698013",
                "type": "biz",
                "fields": {
                    "itemType": "normal",
                    "paymentPendingCancel": false,
                    "buyerEmail": "testing@redmart.com",
                    "isFreeGift": false,
                    "groupId": "#package#OF0285100910151#HANDLED_BY_WAREHOUSE",
                    "tradeOrderId": "838500498013",
                    "title": "Andersen's of Denmark Mocha Almond Fudge Ice cream",
                    "scene": "orderDetail",
                    "picUrl": "https://filebroker-lzd.alibaba.net/p/Gatineau-Gatineau-Floracil-Gentle-Cleansing-Lotion-For-Eyes-(Alcohol-Free)-400ml/13.5oz-(EXPORT)-8311-07541-1-catalog.jpg",
                    "sellerId": "8",
                    "price": "$12.00",
                    "reversible": {
                        "action": true,
                        "desc": "CANCEL",
                        "reverseOrderId": "null",
                        "status": "enable",
                        "step": "cancel",
                        "tradeOrderId": "838500498013",
                        "tradeOrderLineId": "838500698013"
                    },
                    "warranty": "No Warranty",
                    "skuId": "219110001",
                    "delivery": {
                        "desc": "Get by Sat 19 Jan - Mon 28 Jan",
                        "email": "testing@redmart.com",
                        "method": "Saver",
                        "status": "info"
                    },
                    "quantity": 6,
                    "icons": ["https://laz-img-cdn.alicdn.com/tfs/TB1AHvdxMmTBuNjy1XbXXaMrVXa-96-32.png"],
                    "itemId": "216168001",
                    "sequence": 1,
                    "external": {},
                    "reviewable": false,
                    "oldTradeOrderId": "null",
                    "itemUrl": "http://pdp.lazada.test/-i216168001-s219110001.html?urlFlag=true&mp=1",
                    "status": "cancel",
                    "isFreeSample": false
                }
            },
            "deliverySummary_838500498013#billing": {
                "tag": "deliverySummary",
                "id": "838500498013#billing",
                "type": "biz",
                "fields": {
                    "consignee": "Redmart Test",
                    "address": "Singapore, Singapore, 8 SHENTON WAY, 8",
                    "phone": "68805501",
                    "kind": "shipping",
                    "postCode": "068811",
                    "title": "Billing Address"
                }
            },
            "sellerInfo_8": {
                "tag": "sellerInfo",
                "id": "8",
                "type": "biz",
                "fields": {
                    "imChatName": "Chat Now",
                    "itemId": "216168001",
                    "accountId": "100100128",
                    "IMUrl": "/chat_page?targetid=100100128&orderid=838500498013&suborderid=838500698013&_p_slr=8&targettype=2&type=103&from=order",
                    "sellerId": "8",
                    "shopName": "BestDeals",
                    "imSwitch": "true",
                    "shopUrl": "//www.ali-lazada.com/bestdeals",
                    "IMHost": "http://native.m.lazada.com",
                    "skuId": "219110001"
                }
            },
            "package_#package#OF0285100910151#HANDLED_BY_WAREHOUSE": {
                "tag": "package",
                "id": "#package#OF0285100910151#HANDLED_BY_WAREHOUSE",
                "type": "biz",
                "fields": {
                    "isLiveUp": false,
                    "packageId": "1"
                }
            },
            "deliverySummary_838500498013#address": {
                "tag": "deliverySummary",
                "id": "838500498013#address",
                "type": "biz",
                "fields": {
                    "consignee": "Redmart Test",
                    "address": "Singapore, Singapore, 8 SHENTON WAY, 8",
                    "phone": "68805501",
                    "kind": "shipping",
                    "postCode": "068811",
                    "title": "Shipping Address"
                }
            },
            "detailInfo_838500498013": {
                "tag": "detailInfo",
                "id": "838500498013",
                "type": "biz",
                "fields": {
                    "createdAt": "Placed on 08 Jan 2019  14:53:28",
                    "total": "$17.99",
                    "visaCode": "Paid by card xxxx-1111",
                    "authCode": "Authorization Code ABC12345",
                    "tradeOrderId": 838500498013,
                    "paidAt": "Paid on 08 Jan 2019  14:53:46",
                    "linkText": "MANAGE",
                    "linkColor": "#1a9cb7"
                }
            },
            "shippingInfo_#package#OF0285100910151#HANDLED_BY_WAREHOUSE": {
                "tag": "shippingInfo",
                "id": "#package#OF0285100910151#HANDLED_BY_WAREHOUSE",
                "type": "biz",
                "fields": {
                    "delivery": {
                        "createdAt": "Get by Sat 19 Jan - Mon 28 Jan",
                        "desc": "Saver",
                        "method": "Express",
                        "status": "info"
                    },
                    "statusMap": {
                        "active": "Processing",
                        "all": ["Payment pending", "Processing", "Shipped", "Delivered"]
                    },
                    "trackingList": []
                }
            },
            "root_838500498013": {
                "tag": "root",
                "id": "838500498013",
                "type": "biz",
                "fields": {
                    "buyerId": "103498013",
                    "confirmDialog": {
                        "cancelText": "No, I will wait",
                        "checkBoxText": "Cancel current payment",
                        "confirmText": "Pay Again",
                        "content": "Payment is processing. To cancel current payment and make a new payment for this order, please tick checkbox to proceed. ",
                        "title": "Process New Payment"
                    }
                }
            }
        },
        "endpoint": {
            "mode": "h5",
            "protocolVersion": "2.0"
        },
        "hierarchy": {
            "component": ["package", "orderItem", "deliverySummary", "shippingInfo", "root", "detailInfo", "totalSummary", "sellerInfo"],
            "root": "root_838500498013",
            "structure": {
                "root_838500498013": ["detailInfo_838500498013", "package_#package#OF0285100910151#HANDLED_BY_WAREHOUSE", "totalSummary_838500498013", "deliverySummary_838500498013#address", "deliverySummary_838500498013#billing"],
                "package_#package#OF0285100910151#HANDLED_BY_WAREHOUSE": ["sellerInfo_8", "shippingInfo_#package#OF0285100910151#HANDLED_BY_WAREHOUSE", "orderItem_838500698013"]
            }
        },
        "linkage": {
            "input": [],
            "request": [],
            "common": {
                "compress": true,
                "queryParams": "^^$$b1473337a12aae184b74dc2d5cf679e4{$_$}H4sIAAAAAAAAAJVRXWsbMRD8L+fXYFZfJylvCXGJoSQ0ppQ+mZW0co7eV3XnQhLy37vnJJCUUujbSrszOzP7VM1UuqbHtjp/qsYW5zyUrjqv7k11Vo14IK4P1FPhieezqseOdiPG5XvobkuickUzNi1PHycqF9PUHPqFK7Y4TTc8zpNx6NYtPmLC9bBA1h32TN1RP69xbNaFfh5pmtdfjlQeLo8PVN4x3700eUFYOttUnQtQ2jsQ6qyaCyY6TS8Np5wBeOu9yBcvxa55XB7AJljOOPS8fNqxWJyPhRbFidrmFwvYHbsOy8P+PdkKUyo0TWzGOJAyumQTaeOEyUrVoIWUycRaCslC/8kUmrZt+gMzpaAUOwFFCYm0i94akaNEECE4cCemJYJtn4cPJAyuoxS8T6loWJFNUoGJZHQ2EJL3msGnrLczda/Y+g0LzrtaGktOOJlEbWUNILOlpE0w6E+njz84tf3qtVjdfgLpjADwAoQRq+uLm6vPm6v95ff9t4u7zfXt191mObUHZWrpMvooEE1AjzlkUgIQUNZMXYZh/tMNCpuEcz7USbMX9F5Yp7z0KFgnLlFM1LZs5xTFsih4JximdUg6ZpIcWFCaPCkdIIkFcd+MI0d9wvyvEeEy84ecIigrjGUnKQmF2hrPZwbmn4cZ27/dmOG2RomsLWaTPEYdLVgEYyDJWNucqufn31IiWIh8AwAA",
                "submitParams": "^^$$39ecbfc485ddeabea7a97c9bf49dde7f{$_$}H4sIAAAAAAAAAKtWKkktys3MS8xRsqpWKshJLEnLL8pVslLKMFXSUSpITE8FstNT81KLgCpqdZTyEnNTgwsSk0HC+bn+RSmpRS6pJYmZQEkAPC1INEsAAAA="
            },
            "signature": "658de41a4b3d752897f382c0cf573a0e"
        },
        "reload": true
    },
    "ret": ["SUCCESS::调用成功"],
    "v": "1.0"
}