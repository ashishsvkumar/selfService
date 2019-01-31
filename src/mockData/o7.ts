export const o7: any = {
    "api": "mtop.lazada.om.orderdetail",
    "data": {
        "data": {
            "detailInfo_8177621520166": {
                "tag": "detailInfo",
                "id": "8177621520166",
                "type": "biz",
                "fields": {
                    "createdAt": "Placed on 10 Dec 2018  18:35:57",
                    "total": "SGD22.58",
                    "tradeOrderId": 8177621520166
                }
            },
            "sellerInfo_100033472": {
                "tag": "sellerInfo",
                "id": "100033472",
                "type": "biz",
                "fields": {
                    "sellerStoreInfos": [{
                        "enterBtnText": "Visit Store",
                        "sellerId": "100033472",
                        "shopLogo": "https://sg-test-11.slatic.net/shop/6e664912a8f13d1b5b40c6343a288211.jpeg",
                        "shopName": "canhong zidonghua shebei",
                        "shopUrl": "//www.lazada.sg/shop/canhong-zidonghua-shebei"
                    }],
                    "title": "Sold by canhong zidonghua shebei"
                }
            },
            "root_8177621520166": {
                "tag": "root",
                "id": "8177621520166",
                "type": "biz",
                "fields": {
                    "buyerId": "1002820166",
                    "confirmDialog": {
                        "cancelText": "No, I will wait",
                        "checkBoxText": "Cancel current payment",
                        "confirmText": "Pay Again",
                        "content": "Payment is processing. To cancel current payment and make a new payment for this order, please tick checkbox to proceed. ",
                        "title": "Process New Payment"
                    }
                }
            },
            "totalSummary_8177621520166": {
                "tag": "totalSummary",
                "id": "8177621520166",
                "type": "biz",
                "fields": {
                    "total": "SGD22.58",
                    "fees": [{
                        "key": "Subtotal",
                        "value": "SGD22.58"
                    }, {
                        "key": "Shipping Fee",
                        "value": "SGD0.00"
                    }],
                    "totalText": "1 Item, 1 Package",
                    "payments": [{
                        "key": "Paid by"
                    }],
                    "totalKey": "Total: "
                }
            },
            "orderItem_8177621720166": {
                "tag": "orderItem",
                "id": "8177621720166",
                "type": "biz",
                "fields": {
                    "itemType": "normal",
                    "quantity": 1,
                    "paymentPendingCancel": false,
                    "buyerEmail": "anurag.saini@redmart.com",
                    "isFreeGift": false,
                    "groupId": "#package#8177621620166#NONE",
                    "tradeOrderId": "8177621520166",
                    "title": "Usb Wireless Mouse Silent Mute Noiseless Optical Mouse Gaming 6 Button 2400 DPI Mouse for Laptop Computer Mice - intl",
                    "scene": "orderDetail",
                    "itemId": "202532947",
                    "picUrl": "http://my-live-02.slatic.net/p/2/usb-wireless-mouse-silent-mute-noiseless-optical-mouse-gaming-6-button-2400-dpi-mouse-for-laptop-computer-mice-1441-795450871-d3abc3fcf1cd0a2b59e14464ba44627f-.jpg",
                    "sequence": 1,
                    "external": {},
                    "sellerId": "100033472",
                    "reviewable": false,
                    "price": "SGD22.58",
                    "warranty": "No Warranty",
                    "oldTradeOrderId": "null",
                    "skuId": "304827401",
                    "itemUrl": "https://www.lazada.sg/-i202532947-s304827401.html?urlFlag=true&mp=1",
                    "status": "Cancelled",
                    "isFreeSample": false
                }
            },
            "package_#package#8177621620166#NONE": {
                "tag": "package",
                "id": "#package#8177621620166#NONE",
                "type": "biz",
                "fields": {
                    "isLiveUp": false,
                    "title": "Package 1",
                    "ofcPackageId": "#package#8177621620166#NONE"
                }
            },
            "sellerChat_#package#8177621620166#NONEchat": {
                "tag": "sellerChat",
                "id": "#package#8177621620166#NONEchat",
                "type": "biz",
                "fields": {
                    "chatBtn": {
                        "colorType": "orange",
                        "text": "Chat Now"
                    },
                    "sellerChatInfos": [{
                        "sellerId": "100033472",
                        "shopLogo": "https://sg-test-11.slatic.net/shop/6e664912a8f13d1b5b40c6343a288211.jpeg",
                        "shopName": "canhong zidonghua shebei",
                        "shopUrl": "//www.lazada.sg/shop/canhong-zidonghua-shebei"
                    }]
                }
            },
            "deliverySummary_8177621520166#comb-address": {
                "tag": "deliverySummary",
                "id": "8177621520166#comb-address",
                "type": "biz",
                "fields": {
                    "consignee": "Anurag",
                    "address": "Singapore, Singapore, 6 FISHERY PORT ROAD",
                    "phone": "62613456",
                    "kind": "shipping",
                    "mobile": "62613456",
                    "postCode": "619747",
                    "title": "Ship & bill to",
                    "addressId": "1002110181"
                }
            },
            "orderOperation_8177621520166": {
                "tag": "orderOperation",
                "id": "8177621520166",
                "type": "biz",
                "fields": {}
            }
        },
        "endpoint": {
            "mode": "h5",
            "protocolVersion": "2.0"
        },
        "hierarchy": {
            "component": ["package", "orderItem", "deliverySummary", "root", "totalSummary", "detailInfo", "sellerChat", "orderOperation", "sellerInfo"],
            "root": "root_8177621520166",
            "structure": {
                "root_8177621520166": ["deliverySummary_8177621520166#comb-address", "package_#package#8177621620166#NONE", "detailInfo_8177621520166", "totalSummary_8177621520166", "orderOperation_8177621520166"],
                "package_#package#8177621620166#NONE": ["sellerInfo_100033472", "orderItem_8177621720166", "sellerChat_#package#8177621620166#NONEchat"]
            }
        },
        "linkage": {
            "input": [],
            "request": ["package_#package#8177621620166#NONE"],
            "common": {
                "compress": true,
                "queryParams": "^^$$61933ed7e778e9548472c62de6b40a51{$_$}H4sIAAAAAAAAAH1SyW7cMAz9F+eaGlopKbduh1wStAP0GlASNTHqZSprCiRB/r30ZEGDFL3RJt9G8aFrVKdhxrG7eOgOI7ay1Km76G5td94dcE9c72mmyhOP592ME+0OmLbfy3RdM9Uv1HAYefq4Uv24rsN+3rjSiOt6xeM8mZapH/EeM/bLBuknnJl6orn1eBj6Sr+OtLb+25Hq3afjHdW/mL8/NVkgbp3L3F1IIZRXQgKcd61iptP41vHSOVDSPjePY6vL/IPqOizsqlO9eo0ln4rdcL99CA7HNg/LzKbWHYfAdqy0Jck0Dr/Z2O44TVjvbt5onDEofsCcK60rKwRnuGUlZOEDB1ZGZpkKCRtFSMGwfD7FupzL8paK0cIVsGBjgEjSEvmiY0nCqoiCNGVGnxZ42Wh6AbsXMIIMwFzask6IPkbnTQzSp+IKm3gBXx/4NRsv5J2811RUMqo453NRGkhbEQsoZY3DWE67Sz95azdnz8XZMwc8bePq+uorE4Es3iahFPnkswETRPBBFOmMcB4dE9Vlae8MyKSooPVCgC4SktfKkhbJA6JHhYxbaRypfr7F9j8PifvMZ6IMHjRyJhAgXQZtOBtIg5FsKq98p9fgsxKaB9T2jtkGQxitcylnC9HaItCSoCiycdsy29Jw/OdRbJeGGgoENODBZKEgeFm09VbHjCZi9/j4B6bM6El8AwAA",
                "submitParams": "^^$$39ecbfc485ddeabea7a97c9bf49dde7f{$_$}H4sIAAAAAAAAAKtWKkktys3MS8xRsqpWKshJLEnLL8pVslLKMFXSUSpITE8FstNT81KLgCpqdZTyEnNTgwsSk0HC+bn+RSmpRS6pJYmZQEkAPC1INEsAAAA="
            },
            "signature": "a3f0e84f6fc4ba305b5bbc35979cecd7"
        },
        "reload": true
    },
    "ret": ["SUCCESS::调用成功"],
    "v": "1.0"
}