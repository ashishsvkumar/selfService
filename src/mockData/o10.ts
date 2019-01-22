export const o10: any = {
    "api": "mtop.lazada.om.orderdetail",
    "data": {
        "data": {
            "orderItem_833101598013": {
                "tag": "orderItem",
                "id": "833101598013",
                "type": "biz",
                "fields": {
                    "itemType": "normal",
                    "paymentPendingCancel": true,
                    "buyerEmail": "testing@redmart.com",
                    "isFreeGift": false,
                    "groupId": "#package#833101498013#NONE",
                    "tradeOrderId": "833101398013",
                    "title": "ModernMum Ready To Cook Fresh Cut Pumpkin",
                    "scene": "orderDetail",
                    "picUrl": "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/8886316220033_0001_1547316963083.jpg",
                    "sellerId": "8",
                    "price": "$12.00",
                    "reversible": {
                        "action": true,
                        "desc": "CANCEL",
                        "paymentPendingCancel": true,
                        "status": "enable",
                        "step": "cancel",
                        "tradeOrderId": "833101398013",
                        "tradeOrderLineId": "833101598013"
                    },
                    "warranty": "No Warranty Available",
                    "skuId": "212462119",
                    "delivery": {
                        "desc": "Get by Tue 08 Jan - Fri 18 Jan",
                        "email": "testing@redmart.com",
                        "method": "Saver",
                        "status": "info"
                    },
                    "quantity": 5,
                    "icons": ["https://laz-img-cdn.alicdn.com/tfs/TB1AHvdxMmTBuNjy1XbXXaMrVXa-96-32.png"],
                    "itemId": "212452090",
                    "sequence": 1,
                    "external": {},
                    "reviewable": false,
                    "oldTradeOrderId": "null",
                    "itemUrl": "http://pdp.lazada.test/-i212452090-s212462119.html?urlFlag=true&mp=1",
                    "status": "cancel",
                    "isFreeSample": false
                }
            },
            "detailInfo_833101398013": {
                "tag": "detailInfo",
                "id": "833101398013",
                "type": "biz",
                "fields": {
                    "createdAt": "Placed on 29 Dec 2018  11:49:43",
                    "total": "$65.99",
                    "tradeOrderId": 833101398013,
                    "linkText": "PAY NOW",
                    "payUrl": "http://pages.lazada.test/wow/i/systest/checkout/cashier?wh_weex=true&checkoutOrderId=285600398013&entranceName=OM",
                    "linkColor": "#f57224"
                }
            },
            "totalSummary_833101398013": {
                "tag": "totalSummary",
                "id": "833101398013",
                "type": "biz",
                "fields": {
                    "total": "$65.99",
                    "fees": [{
                        "key": "Subtotal",
                        "value": "$60.00"
                    }, {
                        "key": "Shipping Fee",
                        "value": "$5.99"
                    }],
                    "taxTitle": "GST Incl."
                }
            },
            "shippingInfo_#package#833101498013#NONE": {
                "tag": "shippingInfo",
                "id": "#package#833101498013#NONE",
                "type": "biz",
                "fields": {
                    "delivery": {
                        "createdAt": "Get by Tue 08 Jan - Fri 18 Jan",
                        "desc": "Saver",
                        "method": "Express",
                        "status": "info"
                    },
                    "statusMap": {
                        "active": "Payment pending",
                        "all": ["Payment pending", "Processing", "Shipped", "Delivered"]
                    },
                    "trackingList": []
                }
            },
            "package_#package#833101498013#NONE": {
                "tag": "package",
                "id": "#package#833101498013#NONE",
                "type": "biz",
                "fields": {
                    "isLiveUp": false,
                    "packageId": "1"
                }
            },
            "sellerInfo_8": {
                "tag": "sellerInfo",
                "id": "8",
                "type": "biz",
                "fields": {
                    "imChatName": "Chat Now",
                    "itemId": "212452090",
                    "accountId": "100100128",
                    "IMUrl": "/chat_page?targetid=100100128&orderid=833101398013&suborderid=833101598013&_p_slr=8&targettype=2&type=103&from=order",
                    "sellerId": "8",
                    "shopName": "BestDeals",
                    "imSwitch": "true",
                    "shopUrl": "//www.ali-lazada.com/bestdeals",
                    "IMHost": "http://native.m.lazada.com",
                    "skuId": "212462119"
                }
            },
            "deliverySummary_833101398013#address": {
                "tag": "deliverySummary",
                "id": "833101398013#address",
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
            "root_833101398013": {
                "tag": "root",
                "id": "833101398013",
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
            },
            "deliverySummary_833101398013#billing": {
                "tag": "deliverySummary",
                "id": "833101398013#billing",
                "type": "biz",
                "fields": {
                    "consignee": "Redmart Test",
                    "address": "Singapore, Singapore, 8 SHENTON WAY, 8",
                    "phone": "68805501",
                    "kind": "shipping",
                    "postCode": "068811",
                    "title": "Billing Address"
                }
            }
        },
        "endpoint": {
            "mode": "h5",
            "protocolVersion": "2.0"
        },
        "hierarchy": {
            "component": ["package", "orderItem", "deliverySummary", "root", "shippingInfo", "detailInfo", "totalSummary", "sellerInfo"],
            "root": "root_833101398013",
            "structure": {
                "root_833101398013": ["detailInfo_833101398013", "package_#package#833101498013#NONE", "totalSummary_833101398013", "deliverySummary_833101398013#address", "deliverySummary_833101398013#billing"],
                "package_#package#833101498013#NONE": ["sellerInfo_8", "shippingInfo_#package#833101498013#NONE", "orderItem_833101598013"]
            }
        },
        "linkage": {
            "input": [],
            "request": [],
            "common": {
                "compress": true,
                "queryParams": "^^$$b162fb781f747420b3a65a29c7541a92{$_$}H4sIAAAAAAAAAH1Sy47bMAz8F+caGHqbyq1Fe8glizYfsKAkKmvUr8pOgewi/146CYptUeyNFmeGw6HfqoVK3w7YVbu3aupwyWPpq131YqttNeGJuD7RQIUR1201YE/HCeP6PPZPJVH5Qgu2HaPPM5VP89yehlUrdjjPB4YzMo593eErJqzHlVL3OLB0T8NS49TWhX6eaV7qb2cql8/nC5V3yt/vTR4Q1s4+VTsptPEgpN5WS8FEN/TaAK0lPz96d/vyXhzb1/VD8BJsZxoHHj4f2Swu50Kr40Rd+4sNHM99j+Xy/F5sgykVmmdeRkf02qNvRLQyO0GBvACIoDGHrAIb/VAptF3XDqdVqRHJmZCd9JICmJhtzNKQylpDNPmmtEawH/L4lwiTlSQVgMAqYY1QMnsLSSsZJQk2Qky+Zb1fqH9w7R8uidA4tM57clYbiSqgwGijdACIt9PHH5za8+ZRbO4S99g3h6fDV9axZKR3IGy2jdbJCZ2SjGgAoxRONqxTxnH517pQkJtIvkk6SZtIaTACBOWgcoTkmTZT17H3297MIFDWKRAhKpQpgw4WvIikSTlUZh00v7TTxLneOB+6zs6JCKhQNczVioxyYBqhA/D98hr7Mi7Y/e9669W8j8IE/gFM5KgbomydUylHjt97VV2vvwG09ablVgMAAA==",
                "submitParams": "^^$$39ecbfc485ddeabea7a97c9bf49dde7f{$_$}H4sIAAAAAAAAAKtWKkktys3MS8xRsqpWKshJLEnLL8pVslLKMFXSUSpITE8FstNT81KLgCpqdZTyEnNTgwsSk0HC+bn+RSmpRS6pJYmZQEkAPC1INEsAAAA="
            },
            "signature": "d5c5f7c16827cd32721840a02689397f"
        },
        "reload": true
    },
    "ret": ["SUCCESS::调用成功"],
    "v": "1.0"
}