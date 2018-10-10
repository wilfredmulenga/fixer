import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';
import { Link, browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Media from "react-media";
import ViewProfile from './ViewProfile'


class Profile extends Component {
    constructor(props) {
        super(props)

        // this.handleSignOut = this.handleSignOut.bind(this)
        this.state = {

            userUID: this.props.route.userUID,
            viewRequestServices: false,
            ViewProfile: false
        }

    }


    // handleSignOut() {
    //     Firebase.auth().signOut();
    //     browserHistory.push('/');
    // }

    // UNSAFE_componentWillMount() {
    //     this.handleLoad()
    // }
    componentDidMount() {
        //this.handleLoad();
    }

    render() {
        const { listOfPeople, userUID } = this.state;
        console.log(userUID)
        return (

            <div>
                <Navbar userUID={this.state.userUID} />
                {(userUID) ?
                    <div className="row container-fluid justify-content-start mt-4">
                        <div className="card col-md-2 ml-3 d-flex mt-2 mb-3">
                            <div className="justify-content-start text-center">
                                <h3 className='mb-3 mt-3'>Account </h3>
                            </div>
                            <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => this.setState({
                                    ViewProfile: true
                                })}>View Profile</Button>
                            <Button variant='contained'
                                className="btn  mb-1"
                                style={{
                                    backgroundColor: '#FFF',
                                    color: '#000'
                                }}
                                onClick={() => browserHistory.push('/updateprofile')}
                            >Update Profile
                            {/* <Link to={{
                            pathname: '/updateprofile',
                            state: { userDetails: listOfPeople }
                        }} >Update Profile</Link> */}
                            </Button>
                            <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => this.setState({
                                    viewRequestServices: true
                                })}>Requested Services</Button>

                            {/* On small devices route to /messagemobile when Messages button is clicked. On large devices /messages */}
                            <Media query="(max-width: 769px)"
                                render={() => <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={() => browserHistory.push('/chathistorymobile')}>Messages</Button>}
                            /> <Media query="(min-width: 770px)"
                                render={() => <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={() => browserHistory.push('/messages')}>Messages</Button>

                                }
                            />
                            {/* <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => browserHistory.push('/messages')}>Messages</Button> */}
                            {/* <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={this.handleSignOut}>Log Out</Button> */}
                        </div>

                        <div className="card col center-align mt-2  ml-3">
                            {(false) ? <ViewProfile /> : <div><h3>Please Update Your Profile</h3></div>}
                        </div>
                    </div>
                    : <div className="container text-center mt-5" style={{ height: '100%' }} >
                        {/* <img src={ChatIcon} /> */}
                        <h4 className="mt-5">Please login first</h4>
                        <Button variant='outlined'
                            style={{ backgroundColor: '#FFF', color: '#000', marginTop: 50 }}
                            onClick={() => browserHistory.push('/phoneLogin')}>Login</Button>
                    </div>
                }

            </div>)
    }
}



export default Profile;