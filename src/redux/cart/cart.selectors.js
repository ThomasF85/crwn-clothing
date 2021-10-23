import { createSelector } from "reselect";

export const selectCartItemsCount = createSelector(
    [state => state.cart.cartItems],
    items => items.reduce((qty, item) => qty + item.quantity, 0)
)

export const selectCartTotal = createSelector(
    [state => state.cart.cartItems],
    items => items.reduce((price, item) => price + (item.quantity * item.price), 0)
)