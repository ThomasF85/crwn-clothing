export const addItemToCart = (cartItems, newCartItem) => {
    const existingCartItem = cartItems.find(item => item.id === newCartItem.id);
    if (existingCartItem) {
        return cartItems.map(item =>
           item.id === newCartItem.id ? {...item, quantity: item.quantity + 1} : item
        );
    }
    return [...cartItems, {...newCartItem, quantity: 1}];
}

export const removeItemsFromCart = (cartItems, itemToBeRemoved) => {
    return cartItems.filter(item => item.id !== itemToBeRemoved.id);
}

export const removeItemFromCart = (cartItems, itemToBeRemoved) => {
    const existingCartItem = cartItems.find(item => item.id === itemToBeRemoved.id);
    if (existingCartItem && existingCartItem.quantity === 1) {
        return removeItemsFromCart(cartItems, itemToBeRemoved);
    }
    return cartItems.map(item =>
        item.id === itemToBeRemoved.id ? {...item, quantity: item.quantity - 1} : item
    );
}