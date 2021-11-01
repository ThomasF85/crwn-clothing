import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./components/signin-singup/signin-signup.component";
import {setUpOnAuthorizationChangeHandler} from './firebase/firebase.utils';
import CheckoutPage from "./pages/checkout/checkout.component";
import {clearNullUserCart, populateCartFromNullUserCart} from "./redux/cart/cart.actions";

const App = ({currentUser, setCurrentUser, clearNullUserCart, populateCartFromNullUserCart}) => {

    useEffect(() => {
        const unsubscribeFromAuthorizationChange = setUpOnAuthorizationChangeHandler(
            newUser => {
                if (newUser) {
                    setCurrentUser(newUser);
                    clearNullUserCart();
                    // fetch cart and if not empty, replace with cart in redux store
                } else {
                    setCurrentUser(null);
                    populateCartFromNullUserCart();
                }
            }
        );
        return () => {
            if (unsubscribeFromAuthorizationChange) {
                unsubscribeFromAuthorizationChange();
            }
        }
    }, [])

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/signin' render={
                    () => currentUser ?
                        (<Redirect to='/'/>) :
                        (<SignInAndSignUpPage/>)
                }/>
                <Route exact path='/checkout' component={CheckoutPage}/>
            </Switch>
        </div>
    );
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    clearNullUserCart: () => dispatch(clearNullUserCart()),
    populateCartFromNullUserCart: () => dispatch(populateCartFromNullUserCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
