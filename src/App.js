import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { connect} from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./components/signin-singup/signin-signup.component";
import { setUpOnAuthorizationChangeHandler } from './firebase/firebase.utils';

class App extends React.Component {
    unsubscribeFromAuthorizationChange = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuthorizationChange = setUpOnAuthorizationChangeHandler(
            newUser => setCurrentUser(newUser)
        );
    }

    componentWillUnmount() {
        this.unsubscribeFromAuthorizationChange();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' render={
                        () => this.props.currentUser ?
                            (<Redirect to='/' />) :
                            (<SignInAndSignUpPage />)
                    }/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
