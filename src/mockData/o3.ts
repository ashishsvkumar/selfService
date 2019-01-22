export const o3: any = {
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
                    "IMUrl": "/chat_page?targetid=100003655&orderid=853402098013&suborderid=853402298013&_p_slr=1&targettype=2&type=103&from=order",
                    "sellerId": "1",
                    "shopName": "ROCKET INTERNETjulia",
                    "imSwitch": "true",
                    "IMHost": "http://native.m.lazada.com",
                    "skuId": "216934001"
                }
            },
            "totalSummary_853402098013": {
                "tag": "totalSummary",
                "id": "853402098013",
                "type": "biz",
                "fields": {
                    "total": "$28.99",
                    "fees": [{
                        "key": "Subtotal",
                        "value": "$24.00"
                    }, {
                        "key": "Shipping Fee",
                        "value": "$4.99"
                    }],
                    "taxTitle": "GST Incl."
                }
            },
            "package_#package#853402198013#NONE": {
                "tag": "package",
                "id": "#package#853402198013#NONE",
                "type": "biz",
                "fields": {
                    "isLiveUp": false,
                    "packageId": "1"
                }
            },
            "deliverySummary_853402098013#address": {
                "tag": "deliverySummary",
                "id": "853402098013#address",
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
            "root_853402098013": {
                "tag": "root",
                "id": "853402098013",
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
            "orderItem_853402298013": {
                "tag": "orderItem",
                "id": "853402298013",
                "type": "biz",
                "fields": {
                    "delivery": {
                        "desc": "Get by Thu 10 Jan - Thu 10 Jan",
                        "email": "testing@redmart.com",
                        "method": "Priority Delivery",
                        "status": "info"
                    },
                    "itemType": "normal",
                    "quantity": 2,
                    "paymentPendingCancel": true,
                    "buyerEmail": "testing@redmart.com",
                    "isFreeGift": false,
                    "groupId": "#package#853402198013#NONE",
                    "tradeOrderId": "853402098013",
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
                        "paymentPendingCancel": true,
                        "status": "enable",
                        "step": "cancel",
                        "tradeOrderId": "853402098013",
                        "tradeOrderLineId": "853402298013"
                    },
                    "warranty": "No Warranty Available",
                    "oldTradeOrderId": "null",
                    "skuId": "216934001",
                    "itemUrl": "http://pdp.lazada.test/-i214120001-s216934001.html?urlFlag=true&mp=1",
                    "status": "cancel",
                    "isFreeSample": false
                }
            },
            "detailInfo_853402098013": {
                "tag": "detailInfo",
                "id": "853402098013",
                "type": "biz",
                "fields": {
                    "createdAt": "Placed on 08 Jan 2019  17:11:54",
                    "total": "$28.99",
                    "tradeOrderId": 853402098013,
                    "linkText": "PAY NOW",
                    "payUrl": "http://pages.lazada.test/wow/i/systest/checkout/cashier?wh_weex=true&checkoutOrderId=294200698013&entranceName=OM",
                    "linkColor": "#f57224"
                }
            },
            "deliverySummary_853402098013#billing": {
                "tag": "deliverySummary",
                "id": "853402098013#billing",
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
            "shippingInfo_#package#853402198013#NONE": {
                "tag": "shippingInfo",
                "id": "#package#853402198013#NONE",
                "type": "biz",
                "fields": {
                    "delivery": {
                        "createdAt": "Get by Thu 10 Jan - Thu 10 Jan",
                        "desc": "Priority Delivery",
                        "method": "Standard",
                        "status": "info"
                    },
                    "statusMap": {
                        "active": "Payment pending",
                        "all": ["Payment pending", "Processing", "Shipped", "Delivered"]
                    },
                    "trackingList": []
                }
            }
        },
        "endpoint": {
            "mode": "h5",
            "protocolVersion": "2.0"
        },
        "hierarchy": {
            "component": ["package", "orderItem", "deliverySummary", "root", "shippingInfo", "detailInfo", "totalSummary", "sellerInfo"],
            "root": "root_853402098013",
            "structure": {
                "root_853402098013": ["detailInfo_853402098013", "package_#package#853402198013#NONE", "totalSummary_853402098013", "deliverySummary_853402098013#address", "deliverySummary_853402098013#billing"],
                "package_#package#853402198013#NONE": ["sellerInfo_1", "shippingInfo_#package#853402198013#NONE", "orderItem_853402298013"]
            }
        },
        "linkage": {
            "input": [],
            "request": [],
            "common": {
                "compress": true,
                "queryParams": "^^$$f846c9ac64949cca0426293397ec41b4{$_$}H4sIAAAAAAAAAH1Ry24bMQz8l/XVMPRcSb61aA+5JGj9AQElUs6i+6p2XcAJ/O+lbBdIiyI3SpwZDodvzUpl6Ebom/1bM/ew5qkMzb55sc22meFIXB9ppMKIy7YZYaDDDKl+T8NTQSpfaIWuZ/RpofJpWbrjWLVSD8vyyHBGpmnY9fAKCLupUnYDjCw90LjuYO52hX6eaFl3305Uzp9PZyrvlL/fmjwg1s4DNnsptAleSL1t1gJIV3RteKuNUOLeu9mXt+LQvdaH4CXYzjyNPHw5sFlYT4WqY6S++8UGDqdhgHJ+fi+2AcRCy8LLYAbhTSSNtnVeIkgPGEAjxqwV1tw+VIpd33fjkZWkk4bFgLzQrYkihkjgnCSnnfEmXZVqBA9jnv4SYTIFADIOGJyQDaTWtVJRbjVBZktMvmb9sNJw56o/XCm81klnoXMGjwKdCkaFloBa9E5dT59+cGrPm3uxuUnI2w6PT49faxTekTXBQXItkUuhNSbJqLz1ITvvWadM0/qv9ag5tlZrL4x1NmoR0EqpwMbgdfB1/EJ9z97r3pIZOnMiKpoEDpNMmhRqYcgoncmBM5Xx0s0z53rlfOha59SGkL0NJKWDEHw9AmiKyqbW1wOu0wr9/65X6c5bFImCCAFQWK/4CtqjC4gih9xcLr8B8aX4YlYDAAA=",
                "submitParams": "^^$$39ecbfc485ddeabea7a97c9bf49dde7f{$_$}H4sIAAAAAAAAAKtWKkktys3MS8xRsqpWKshJLEnLL8pVslLKMFXSUSpITE8FstNT81KLgCpqdZTyEnNTgwsSk0HC+bn+RSmpRS6pJYmZQEkAPC1INEsAAAA="
            },
            "signature": "03a642a13d2edd70a49c6e0f213c2acd"
        },
        "reload": true
    },
    "ret": ["SUCCESS::调用成功"],
    "v": "1.0"
}