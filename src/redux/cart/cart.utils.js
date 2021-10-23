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