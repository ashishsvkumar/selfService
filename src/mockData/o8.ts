export const o8: any = {
    "api": "mtop.lazada.om.orderdetail",
    "data": {
        "data": {
            "sellerInfo_1": {
                "tag": "sellerInfo",
                "id": "1",
                "type": "biz",
                "fields": {
                    "imChatName": "Chat Now",
                    "itemId": "214120001",
                    "accountId": "100003655",
                    "IMUrl": "/chat_page?targetid=100003655&orderid=849401198013&suborderid=849401398013&_p_slr=1&targettype=2&type=103&from=order",
                    "sellerId": "1",
                    "shopName": "ROCKET INTERNETjulia",
                    "imSwitch": "true",
                    "IMHost": "http://native.m.lazada.com",
                    "skuId": "216934001"
                }
            },
            "package_#package#OF0285100910084#HANDLED_BY_SELLER": {
                "tag": "package",
                "id": "#package#OF0285100910084#HANDLED_BY_SELLER",
                "type": "biz",
                "fields": {
                    "isLiveUp": false,
                    "packageId": "1"
                }
            },
            "detailInfo_849401198013": {
                "tag": "detailInfo",
                "id": "849401198013",
                "type": "biz",
                "fields": {
                    "createdAt": "Placed on 02 Jan 2019  16:34:34",
                    "total": "$65.99",
                    "visaCode": "Paid by card xxxx-1111",
                    "authCode": "Authorization Code ABC12345",
                    "tradeOrderId": 849401198013,
                    "paidAt": "Paid on 02 Jan 2019  16:34:42",
                    "linkText": "MANAGE",
                    "linkColor": "#1a9cb7"
                }
            },
            "orderItem_849401398013": {
                "tag": "orderItem",
                "id": "849401398013",
                "type": "biz",
                "fields": {
                    "delivery": {
                        "desc": "Get by Sun 06 Jan - Sat 12 Jan",
                        "email": "testing@redmart.com",
                        "method": "Saver",
                        "status": "info"
                    },
                    "itemType": "normal",
                    "quantity": 5,
                    "paymentPendingCancel": false,
                    "buyerEmail": "testing@redmart.com",
                    "isFreeGift": false,
                    "groupId": "#package#OF0285100910084#HANDLED_BY_SELLER",
                    "tradeOrderId": "849401198013",
                    "title": "Cadbury Stocking Selection Chocolate Box - Christmas Special",
                    "scene": "orderDetail",
                    "itemId": "214120001",
                    "picUrl": "https://s3-ap-southeast-1.amazonaws.com/media.redmart.com/newmedia/1600x/i/m/7622210763198_0045_1510896460214.jpg",
                    "sequence": 1,
                    "external": {},
                    "sellerId": "1",
                    "reviewable": false,
                    "price": "$12.00",
                    "reversible": {
                        "action": true,
                        "desc": "CANCEL",
                        "reverseOrderId": "null",
                        "status": "enable",
                        "step": "cancel",
                        "tradeOrderId": "849401198013",
                        "tradeOrderLineId": "849401398013"
                    },
                    "warranty": "No Warranty Available",
                    "oldTradeOrderId": "null",
                    "skuId": "216934001",
                    "itemUrl": "http://pdp.lazada.test/-i214120001-s216934001.html?urlFlag=true&mp=1",
                    "status": "cancel",
                    "isFreeSample": false
                }
            },
            "shippingInfo_#package#OF0285100910084#HANDLED_BY_SELLER": {
                "tag": "shippingInfo",
                "id": "#package#OF0285100910084#HANDLED_BY_SELLER",
                "type": "biz",
                "fields": {
                    "delivery": {
                        "createdAt": "Get by Sun 06 Jan - Sat 12 Jan",
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
            "deliverySummary_849401198013#address": {
                "tag": "deliverySummary",
                "id": "849401198013#address",
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
            "deliverySummary_849401198013#billing": {
                "tag": "deliverySummary",
                "id": "849401198013#billing",
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
            "root_849401198013": {
                "tag": "root",
                "id": "849401198013",
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
            "totalSummary_849401198013": {
                "tag": "totalSummary",
                "id": "849401198013",
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
                    "taxTitle": "GST Incl.",
                    "payments": [{
                        "key": "Paid by",
                        "value": "Credit/Debit Card"
                    }]
                }
            }
        },
        "endpoint": {
            "mode": "h5",
            "protocolVersion": "2.0"
        },
        "hierarchy": {
            "component": ["package", "orderItem", "deliverySummary", "shippingInfo", "root", "detailInfo", "totalSummary", "sellerInfo"],
            "root": "root_849401198013",
            "structure": {
                "root_849401198013": ["detailInfo_849401198013", "package_#package#OF0285100910084#HANDLED_BY_SELLER", "totalSummary_849401198013", "deliverySummary_849401198013#address", "deliverySummary_849401198013#billing"],
                "package_#package#OF0285100910084#HANDLED_BY_SELLER": ["sellerInfo_1", "shippingInfo_#package#OF0285100910084#HANDLED_BY_SELLER", "orderItem_849401398013"]
            }
        },
        "linkage": {
            "input": [],
            "request": [],
            "common": {
                "compress": true,
                "queryParams": "^^$$f9e16984b6ff3127a82af1650988164e{$_$}H4sIAAAAAAAAAJVTy2rcQBD8F+3VLPPoeflmY4cYjE28p5yWnpmetYheGWkDtvG/p7V2wAkhkINgpK6qrqpBL81CtW8H7Jrzl2bqcClj7Zvz5tE0Z82EB+LzgQaqjHg9awbsaTdhWj+P/X3NVK9owbZj9HGmejHP7WFYtVKH83zHcEamsd92+IwZt+NK2fY4sHRPw7LFqd1W+n6kedl+OVJ9ujw+Uf2g/PA25AVxndzk5lwKDcELqc+apWKmE3odeAggpHyfvdmXb4dd+7y+CA7BdqZx4OXzjs3icqy0Os7UtT/YwO7Y91if9h/FNphzpXnmMC76XLR3CDpZKXImq2TSMSZXpA6Zjf5TKbZd1w4HVtJZJ5QePDofhY4FjAdbolCJ0NlyUloruBnK+JvIakOGjCDJEjgDKEFrbXTOqBQgqMTkU9c3C/XvXP2Ly2tKQM1YdFBsTsEkiFGrkIL1RZyuPn3j1vab98Pm/pNQ3kghAj8eNp8v7q5ur6/2l1/3u+vb2+sH1pUqSycEailC4ATeYgGwygdQ0UZk3TqOy59RIGebKWcJyiUbSQWUIeQIMWljfGDaTF3HWdYeJDNIaM8YaxNJXYJFadk7QCaWJbsumh/baeKeT5z/SxG8QoysnyK51SRazY3FYtlaBhZfxgW7v90u0601EI1JMmjjAv8qkHQxJB1Fl7js5vX1J42RHRF2AwAA",
                "submitParams": "^^$$39ecbfc485ddeabea7a97c9bf49dde7f{$_$}H4sIAAAAAAAAAKtWKkktys3MS8xRsqpWKshJLEnLL8pVslLKMFXSUSpITE8FstNT81KLgCpqdZTyEnNTgwsSk0HC+bn+RSmpRS6pJYmZQEkAPC1INEsAAAA="
            },
            "signature": "37ab4954c26d730922d221bd67773d99"
        },
        "reload": true
    },
    "ret": ["SUCCESS::调用成功"],
    "v": "1.0"
}