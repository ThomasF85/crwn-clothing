import React from "react";

import './collection-item.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import {connect} from "react-redux";
import {addCartItem} from "../../redux/cart/cart.actions";
import {selectNullUser} from "../../redux/user/user.selectors";

const CollectionItem = ({ item, addItem, isNullUser }) => {
    const { name, price, imageUrl } = item;
    return (
        <div className='collection-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}>
            </div>
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item, isNullUser)} inverted> Add to cart </CustomButton>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: (item, nullUser) => dispatch(addCartItem(item, nullUser))
});

const mapStateToProps = state => ({
    isNullUser: selectNullUser(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);