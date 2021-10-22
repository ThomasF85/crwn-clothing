import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./components/signin-singup/signin-signup.component";
import {auth, saveUserIfNeededAndReturnRef, onSnapshot} from './firebase/firebase.utils';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;


    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            this.setState({ currentUser: userAuth });
            if (userAuth) {
                const userRef = await saveUserIfNeededAndReturnRef(userAuth);

                const unsub = onSnapshot(userRef, (doc) => {
                    this.setState({
                        currentUser: {
                            id: doc.id,
                            ...doc.data()
                        }
                    })
                });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
