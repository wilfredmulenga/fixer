import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Navbar from '../components/Navbar'

const uiConfigCustomer = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/categories',

    // We will display Google and Facebook as auth providers.
    signInOptions: [
        {
            provider: Firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'ZM',
            //defaultNationalNumber: '979 99 99',
        },

    ]
};
const uiConfigFixer = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/viewprofile',

    // We will display Google and Facebook as auth providers.
    signInOptions: [
        {
            provider: Firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'ZM',
            //defaultNationalNumber: '979 99 99',
        },

    ]
};


class PhoneLogin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userUID: this.props.route.userUID,
            typeOfUser: (this.props.location.state.typeOfUser) ? this.props.location.state.typeOfUser : "customer"
        }
        console.log(this.props.location.state.typeOfUser)

        this.handleSignOut = this.handleSignOut.bind(this)
    }



    handleSignOut() {
        Firebase.auth().signOut();
        //browserHistory.push('/')
        console.log('signed out')
        window.location.reload()
    }
    render() {
        return (
            <div>
                <Navbar userUID={this.state.userUID} typeOfUser={this.state.typeOfUser} />
                {
                    (this.state.userUID !== undefined) ?
                        (<div className='mt-5' >

                            <div style={{ marginTop: 50, textAlign: 'center' }}>{

                                <div>
                                    <h1> Sign Out of Fixer? </h1>
                                    <div className='row justify-content-center' style={{ textAlign: 'center' }}>
                                        <Button className='mt-5 mr-5' variant='contained' color='secondary'
                                            onClick={this.handleSignOut}>Yes</Button>
                                        <Button className='mt-5 ml-5' variant='contained' color='primary'
                                            onClick={() => browserHistory.push('/categories')}>Not Yet</Button>
                                    </div>
                                </div>



                            }
                            </div>
                        </div>)
                        :
                        (<div className='mt-5 text-center'>
                            <h1 style={{ marginBottom: 50 }}>Welcome to Fixer</h1>
                            {(this.state.typeOfUser == "customer") ? (<StyledFirebaseAuth uiConfig={uiConfigCustomer} firebaseAuth={Firebase.auth()} />)
                                : (<StyledFirebaseAuth uiConfig={uiConfigFixer} firebaseAuth={Firebase.auth()} />)}
                        </div>)

                }
            </div>
        )
    }
}

export default PhoneLogin;