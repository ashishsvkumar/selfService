export interface RedMartPackage {
    readonly traderOrderId: string;
    readonly status: string;
    readonly createdAt: string;
    readonly deliverySlot: string;
    readonly items: RedMartItem[]
}

export interface RedMartItem {
    readonly name: string;
    readonly quantity: number;
    readonly unitPrice: string;
    readonly itemId: string;
    readonly skuId: string;
    readonly productPage: string;
    readonly thumbnail: string;
    readonly isFreeGift: boolean;
    readonly isFreeSample: boolean;
}

export const enum RedMartPackageActionTypes {
    FETCH = "rm/package/fetch",
    SUCCESS = "rm/package/success",
    FAILURE = "rm/package/failure"
}

export interface RedMartPackageState {
    readonly fetching: boolean;
    readonly error?: string;
    readonly packages: RedMartPackage[];
}
