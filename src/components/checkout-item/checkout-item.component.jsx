import React from "react";

import './checkout-item.styles.scss';
import {removeCartItems} from "../../redux/cart/cart.actions";
import {connect} from "react-redux";

const CheckoutItem = ({ cartItem, removeItemsFromCart }) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>{quantity}</span>
            <span className='price'>${price}</span>
            <div className='remove' onClick={() => removeItemsFromCart(cartItem)}>&#10005;</div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeItemsFromCart: item => dispatch(removeCartItems(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);