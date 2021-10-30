import {ShopActionTypes} from "./shop.types";

export const updateCollections = item => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: item
});