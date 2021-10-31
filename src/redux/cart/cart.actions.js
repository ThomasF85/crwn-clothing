import {CartActionTypes} from "./cart.types";

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CARD_HIDDEN
});

export const addCartItem = (item, nullUser) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: { item, nullUser }
});

export const removeCartItem = (item, nullUser) => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: { item, nullUser }
});

export const removeCartItems = (item, nullUser) => ({
    type: CartActionTypes.REMOVE_ITEMS,
    payload: { item, nullUser }
});

export const clearNullUserCart = () => ({
    type: CartActionTypes.CLEAR_NULLUSER_CART
});

export const populateCartFromNullUserCart = () => ({
    type: CartActionTypes.POPULATE_CART_FROM_NULLUSER_CART
});