import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../firebase/firebase.utils';
import { connect } from "react-redux";

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.style.scss';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={signOut}>SIGN OUT</div> :
                    <Link className='option' to="/signin">SIGN IN</Link>
            }
            <CartIcon />
        </div>
        { hidden ? null : <CartDropdown /> }
    </div>
)

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    hidden: state.cart.hidden,
})

export default connect(mapStateToProps)(Header);