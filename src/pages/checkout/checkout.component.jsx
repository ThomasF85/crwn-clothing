import React from "react";

import './checkout.styles.scss';
import {connect} from "react-redux";
import {selectCartTotal} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(item => <CheckoutItem key={item.id} cartItem={item} />)
        }
        <div className='total'>
            <span>${total}</span>
        </div>
        <StripeCheckoutButton price={total} />
    </div>
)

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
    total: selectCartTotal(state)
})

export default connect(mapStateToProps)(CheckoutPage);