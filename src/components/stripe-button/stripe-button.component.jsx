import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51Jom33KJimGjsZDqeyT9htEA0mt0EiG5OFBi0r417Ch3CDPqaqb0khp3Yl84hrZYaVi4RhPxfp1nxRLTQFOPcK8W00jMYhjHHg";

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={token => console.log('Payment successful', token)}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;