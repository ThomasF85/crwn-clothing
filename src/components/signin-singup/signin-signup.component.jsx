import React from 'react';

import './signin-signup.styles.scss';
import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up/sign-up.component";

const SignInAndSignUpPage = () => (
    <div className='sign-in-sign-up'>
        <SignIn />
        <SignUp />
    </div>
)

export default SignInAndSignUpPage;