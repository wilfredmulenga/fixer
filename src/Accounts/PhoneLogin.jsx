import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Navbar from '../components/Navbar'

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        Firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ]
};


class PhoneLogin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userUID: this.props.route.userUID
        }


        this.handleSignOut = this.handleSignOut.bind(this)
    }



    handleSignOut() {

        Firebase.auth().signOut();
        browserHistory.push('/phonelogin')
        console.log('signed out')
    }
    render() {
        return (
            <div>
                <Navbar />
                {
                    (this.state.userUID != undefined) ?
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
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={Firebase.auth()} />
                        </div>)

                }
            </div>
        )
    }
}

export default PhoneLogin;