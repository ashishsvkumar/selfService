export const o6: any = {
    "api": "mtop.lazada.om.orderdetail",
    "data": {
        "data": {
            "shippingInfo_#package#838500298013#NONE": {
                "tag": "shippingInfo",
                "id": "#package#838500298013#NONE",
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
            "detailInfo_838500198013": {
                "tag": "detailInfo",
                "id": "838500198013",
                "type": "biz",
                "fields": {
                    "createdAt": "Placed on 08 Jan 2019  14:38:42",
                    "total": "$17.99",
                    "tradeOrderId": 838500198013,
                    "linkText": "PAY NOW",
                    "payUrl": "http://pages.lazada.test/wow/i/systest/checkout/cashier?wh_weex=true&checkoutOrderId=293800198013&entranceName=OM",
                    "linkColor": "#f57224"
                }
            },
            "orderItem_838500398013": {
                "tag": "orderItem",
                "id": "838500398013",
                "type": "biz",
                "fields": {
                    "itemType": "normal",
                    "paymentPendingCancel": true,
                    "buyerEmail": "testing@redmart.com",
                    "isFreeGift": false,
                    "groupId": "#package#838500298013#NONE",
                    "tradeOrderId": "838500198013",
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
                        "tradeOrderId": "838500198013",
                        "tradeOrderLineId": "838500398013"
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
            "package_#package#838500298013#NONE": {
                "tag": "package",
                "id": "#package#838500298013#NONE",
                "type": "biz",
                "fields": {
                    "isLiveUp": false,
                    "packageId": "1"
                }
            },
            "deliverySummary_838500198013#billing": {
                "tag": "deliverySummary",
                "id": "838500198013#billing",
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
            "deliverySummary_838500198013#address": {
                "tag": "deliverySummary",
                "id": "838500198013#address",
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
            "sellerInfo_8": {
                "tag": "sellerInfo",
                "id": "8",
                "type": "biz",
                "fields": {
                    "imChatName": "Chat Now",
                    "itemId": "212452090",
                    "accountId": "100100128",
                    "IMUrl": "/chat_page?targetid=100100128&orderid=838500198013&suborderid=838500398013&_p_slr=8&targettype=2&type=103&from=order",
                    "sellerId": "8",
                    "shopName": "BestDeals",
                    "imSwitch": "true",
                    "shopUrl": "//www.ali-lazada.com/bestdeals",
                    "IMHost": "http://native.m.lazada.com",
                    "skuId": "212462119"
                }
            },
            "root_838500198013": {
                "tag": "root",
                "id": "838500198013",
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
            "totalSummary_838500198013": {
                "tag": "totalSummary",
                "id": "838500198013",
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
            }
        },
        "endpoint": {
            "mode": "h5",
            "protocolVersion": "2.0"
        },
        "hierarchy": {
            "component": ["package", "orderItem", "deliverySummary", "shippingInfo", "root", "detailInfo", "totalSummary", "sellerInfo"],
            "root": "root_838500198013",
            "structure": {
                "root_838500198013": ["detailInfo_838500198013", "package_#package#838500298013#NONE", "totalSummary_838500198013", "deliverySummary_838500198013#address", "deliverySummary_838500198013#billing"],
                "package_#package#838500298013#NONE": ["sellerInfo_8", "shippingInfo_#package#838500298013#NONE", "orderItem_838500398013"]
            }
        },
        "linkage": {
            "input": [],
            "request": [],
            "common": {
                "compress": true,
                "queryParams": "^^$$060c79c9f923082661aad8e572e2b211{$_$}H4sIAAAAAAAAAH2Ry24bMQxF/2W8NQy9H961aBfZJGj9AQEpUc6g86pmXMAJ/O/l2C6QFkV2lMh7dHn11ixU+3aArtm/NVMHSxlr3+ybF9tsmwmOxPWRBqo8cdk2A/R0mCCt12P/VDPVL7RA2/H0aab6aZ7b47CyUgfz/MjjPJnGftfBK2TYjatk18PA6J6GZQdTu6v080Tzsvt2onr+fDpTfUf+fmvyA7h2HnKzl0KbGITU22apkOk6vTaCDlYIee/d7MtbcWhf14PgJdjONA78+Hxgs7CcKq2OM3XtLzZwOPU91PPze9gGcq40z7yMLNEqZ0PO2ngJQgcXdBHgo5YJwprbhyRsu64djispOa2ytegxe8RYZIYs0SjMhF7RlbRG8DCU8S8Ii4VU1nkrVQFMWosUQ46lgJYKhIDA4mvWDwv1d63+o01W5ajQgVbGOwMxBpVzljYSoY3u+vXpB6f2vLkXmxtC3XZ4fHr8ypzgE2WhUJUkUQVno0hEQQRtM2mrmVPHcfnXepYcXAlGilJ8QHRoBCJyjiSd8IllM3Ude7/uzQosxhfnVU6pQCkFE3kvkwheamGSXxUv7TRxrlfNh67BCQPJCooESoUiQ/TeUbLOkAdjGLaMC3T/+z2WkzCRdAQs3smYUGC0QCIgoM/ay+Zy+Q1lWG6lVgMAAA==",
                "submitParams": "^^$$39ecbfc485ddeabea7a97c9bf49dde7f{$_$}H4sIAAAAAAAAAKtWKkktys3MS8xRsqpWKshJLEnLL8pVslLKMFXSUSpITE8FstNT81KLgCpqdZTyEnNTgwsSk0HC+bn+RSmpRS6pJYmZQEkAPC1INEsAAAA="
            },
            "signature": "e53649e3732c04e50c2634cdacc8f9b3"
        },
        "reload": true
    },
    "ret": ["SUCCESS::调用成功"],
    "v": "1.0"
}