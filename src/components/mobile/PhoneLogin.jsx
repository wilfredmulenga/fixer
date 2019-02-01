import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Firebase from '../../config/firebase';
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar'

var userUID = localStorage.getItem('userUID')

const uiConfig = {
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
// const uiConfigFixer = {
//     // Popup signin flow rather than redirect flow.
//     signInFlow: 'popup',
//     // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//     signInSuccessUrl: '/fixer/profile',

//     // We will display Google and Facebook as auth providers.
//     signInOptions: [
//         {
//             provider: Firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//             defaultCountry: 'ZM',
//             //defaultNationalNumber: '979 99 99',
//         },

//     ]
// };


class PhoneLogin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            typeOfUser: (localStorage.getItem('typeOfUser') === 'user') ? 'user' : (localStorage.getItem('typeOfUser') === 'fixer') ? 'fixer' : null
        }
        this.handleSignOut = this.handleSignOut.bind(this)
    }



    handleSignOut() {

        localStorage.setItem('userUID', null)
        localStorage.setItem('currentUserData', null)
        localStorage.setItem('listOfFixers', null)

        Firebase.auth().signOut();
        //browserHistory.push('/')
        console.log('signed out')
        //reload page
        window.location.reload()
    }
    render() {
        return (
            <div>
                <Navbar />
                {
                    //if user is logged in and the press login button it shows sign out dialog
                    (userUID !== 'null') ?
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
                        //else it shows sign in dialog
                        (<div className='mt-5 text-center'>
                            <h1 style={{ marginBottom: 50 }}>Welcome to Fixer</h1>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={Firebase.auth()} />

                        </div>)

                }

            </div>
        )
    }
}

export default PhoneLogin;