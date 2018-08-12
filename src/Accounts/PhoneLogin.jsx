import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Firebase from '../config/firebase';

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/categories',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        Firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ]
};


class PhoneLogin extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div  >

            <div style={{ marginTop: 50, textAlign: 'center' }}>
                <h1 style={{ marginBottom: 50 }}>Welcome to Fixer</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={Firebase.auth()} />

            </div>
        </div>
    }
}

export default PhoneLogin;