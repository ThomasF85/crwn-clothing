import React from "react";

import './checkout-item.styles.scss';
import {addCartItem, removeCartItem, removeCartItems} from "../../redux/cart/cart.actions";
import {connect} from "react-redux";
import {selectNullUser} from "../../redux/user/user.selectors";

const CheckoutItem = ({cartItem, removeItemsFromCart, addCartItem, removeCartItem, isNullUser}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeCartItem(cartItem, isNullUser)}>&#10094;</div>
                    <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addCartItem(cartItem, isNullUser)}>&#10095;</div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove' onClick={() => removeItemsFromCart(cartItem, isNullUser)}>&#10005;</div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeItemsFromCart: (item, nullUser) => dispatch(removeCartItems(item, nullUser)),
    addCartItem: (item, nullUser) => dispatch(addCartItem(item, nullUser)),
    removeCartItem: (item, nullUser) => dispatch(removeCartItem(item, nullUser))
})


const mapStateToProps = state => ({
    isNullUser: selectNullUser(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);