export const o7: any = {
    "api": "mtop.lazada.om.orderdetail",
    "data": {
        "data": {
            "root_853200798013": {
                "tag": "root",
                "id": "853200798013",
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
            "shippingInfo_#package#853200898013#NONE": {
                "tag": "shippingInfo",
                "id": "#package#853200898013#NONE",
                "type": "biz",
                "fields": {
                    "delivery": {
                        "createdAt": "Get by Sat 19 Jan - Mon 28 Jan",
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
            "orderItem_853200998013": {
                "tag": "orderItem",
                "id": "853200998013",
                "type": "biz",
                "fields": {
                    "itemType": "normal",
                    "paymentPendingCancel": true,
                    "buyerEmail": "testing@redmart.com",
                    "isFreeGift": false,
                    "groupId": "#package#853200898013#NONE",
                    "tradeOrderId": "853200798013",
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
                        "tradeOrderId": "853200798013",
                        "tradeOrderLineId": "853200998013"
                    },
                    "warranty": "No Warranty Available",
                    "skuId": "212462119",
                    "delivery": {
                        "desc": "Get by Sat 19 Jan - Mon 28 Jan",
                        "email": "testing@redmart.com",
                        "method": "Saver",
                        "status": "info"
                    },
                    "quantity": 6,
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
            "deliverySummary_853200798013#billing": {
                "tag": "deliverySummary",
                "id": "853200798013#billing",
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
            "totalSummary_853200798013": {
                "tag": "totalSummary",
                "id": "853200798013",
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
                    "taxTitle": "GST Incl."
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
                    "IMUrl": "/chat_page?targetid=100100128&orderid=853200798013&suborderid=853200998013&_p_slr=8&targettype=2&type=103&from=order",
                    "sellerId": "8",
                    "shopName": "BestDeals",
                    "imSwitch": "true",
                    "shopUrl": "//www.ali-lazada.com/bestdeals",
                    "IMHost": "http://native.m.lazada.com",
                    "skuId": "212462119"
                }
            },
            "deliverySummary_853200798013#address": {
                "tag": "deliverySummary",
                "id": "853200798013#address",
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
            "package_#package#853200898013#NONE": {
                "tag": "package",
                "id": "#package#853200898013#NONE",
                "type": "biz",
                "fields": {
                    "isLiveUp": false,
                    "packageId": "1"
                }
            },
            "detailInfo_853200798013": {
                "tag": "detailInfo",
                "id": "853200798013",
                "type": "biz",
                "fields": {
                    "createdAt": "Placed on 08 Jan 2019  14:19:35",
                    "total": "$17.99",
                    "tradeOrderId": 853200798013,
                    "linkText": "PAY NOW",
                    "payUrl": "http://pages.lazada.test/wow/i/systest/checkout/cashier?wh_weex=true&checkoutOrderId=293600398013&entranceName=OM",
                    "linkColor": "#f57224"
                }
            }
        },
        "endpoint": {
            "mode": "h5",
            "protocolVersion": "2.0"
        },
        "hierarchy": {
            "component": ["package", "orderItem", "deliverySummary", "shippingInfo", "root", "detailInfo", "totalSummary", "sellerInfo"],
            "root": "root_853200798013",
            "structure": {
                "root_853200798013": ["detailInfo_853200798013", "package_#package#853200898013#NONE", "totalSummary_853200798013", "deliverySummary_853200798013#address", "deliverySummary_853200798013#billing"],
                "package_#package#853200898013#NONE": ["sellerInfo_8", "shippingInfo_#package#853200898013#NONE", "orderItem_853200998013"]
            }
        },
        "linkage": {
            "input": [],
            "request": [],
            "common": {
                "compress": true,
                "queryParams": "^^$$34a4e662b776b8cc3161e0bed6c212c8{$_$}H4sIAAAAAAAAAH2Ry24bMQxF/2W8DQyK0uiRXYt2kU2C1h8QUBLlDDqvasYFnCD/Xo6dAmlRZCeJvJeHVy/NynXoRuqb25dm7mktUx2a2+apbW6amY4s5yOPXKXj9aYZaeDDTGl7noaHmrl+4ZW6XrpPC9dPy9Idx80r9bQs99IunWka9j09U6b9tEn2A41iPfC47mnu9pV/nnhZ999OXM+fT2eu75y/X4syIG6Vu9zcKtAmeFD6plkrZb50bwXfagRwb7UrvroeDt3zdgFZQnDmaZThy0FgaT1V3ogz990vATichoHq+fG92Y5yrrwssoy1DlWEhMSAEIwOMSvMoSSN0RkvoB86xa7vu/EoThgC+Aio0WZFUfygiGFUrWM00V2ctgjuxjL9ZSLiXJIPHDmGkLO8Fyw5EEQToknJkIgvWd+tPLxpwx9t67FFAxwcEAi7zmhIFtKQW1Y5X74+/ZDUHndvh93Vwl93uH+4/yo+JXOrEFJLMZK3rebERWEi9tl53BjqNK3/orPTBbzx0ShVlA2utKzZBcMRgrLb+IX7Xtgve4siGp0sUQvsiW1xzoSgHILVpWRPW1LLUzfPkutF8yG1xBsxaIcxA7bRIhrHjhOCyfFKvU4r9f/7vY3FZ59V9FZbVYA0OqTorIYApBJQ8/r6G9MT8TBWAwAA",
                "submitParams": "^^$$39ecbfc485ddeabea7a97c9bf49dde7f{$_$}H4sIAAAAAAAAAKtWKkktys3MS8xRsqpWKshJLEnLL8pVslLKMFXSUSpITE8FstNT81KLgCpqdZTyEnNTgwsSk0HC+bn+RSmpRS6pJYmZQEkAPC1INEsAAAA="
            },
            "signature": "5ae2a1bcbb8db538ee7c22fb782491ca"
        },
        "reload": true
    },
    "ret": ["SUCCESS::调用成功"],
    "v": "1.0"
}