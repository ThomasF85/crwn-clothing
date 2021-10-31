import {CartActionTypes} from "./cart.types";
import {addItemToCart, removeItemFromCart, removeItemsFromCart} from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
    nullUserCartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.POPULATE_CART_FROM_NULLUSER_CART:
            return {
                ...state,
                cartItems: [...state.nullUserCartItems]
            }
        case CartActionTypes.CLEAR_NULLUSER_CART:
            return {
                ...state,
                nullUserCartItems: []
            }
        case CartActionTypes.TOGGLE_CARD_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            const newStateAddItem = {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload.item)
            };
            if (action.payload.nullUser) {
                newStateAddItem.nullUserCartItems = [...newStateAddItem.cartItems]
            }
            return newStateAddItem
        case CartActionTypes.REMOVE_ITEM:
            let newStateRemoveItem = {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload.item)
            };
            if (action.payload.nullUser) {
                newStateRemoveItem.nullUserCartItems = [...newStateRemoveItem.cartItems]
            }
            return newStateRemoveItem
        case CartActionTypes.REMOVE_ITEMS:
            let newStateRemoveItems = {
                ...state,
                cartItems: removeItemsFromCart(state.cartItems, action.payload.item)
            }
            if (action.payload.nullUser) {
                newStateRemoveItems.nullUserCartItems = [...newStateRemoveItems.cartItems]
            }
            return newStateRemoveItems
        default:
            return state;
    }
}

export default cartReducer;