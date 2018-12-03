import React from 'react';
import Navbar from '../../components/Navbar';
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Media from "react-media";
import ViewProfileUser from '../../Accounts/User/ViewProfileUser';
import ViewRequestServicesUser from './ViewRequestServicesUser';


class ProfileUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: JSON.parse(localStorage.getItem('currentUserData')),
            userUID: localStorage.getItem('userUID'),
            viewRequestServices: false,
            viewProfile: false,
        }
        this.openViewProfile = this.openViewProfile.bind(this)
        this.openViewRequestServices = this.openViewRequestServices.bind(this)

    }

    openViewProfile = () => {
        // this.setState({
        //     viewProfile: true,
        //     viewRequestServices: false
        // })
        console.log("view profile")
    }
    openViewRequestServices = () => {
        this.setState({
            viewProfile: false,
            viewRequestServices: true
        })
    }
    render() {
        const { userUID } = this.state;
        return (

            <div>
                <Navbar userUID={userUID} />
                {(userUID) ?
                    <div className="row container-fluid justify-content-start mt-4">
                        <div className="card col-md-2 ml-3 d-flex mt-2 mb-3">
                            <div className="justify-content-start text-center">
                                <h3 className='mb-3 mt-3'>Account </h3>
                            </div>
                            <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => this.setState({
                                    viewProfile: true,
                                    viewRequestServices: false
                                })}>View Profile</Button>
                            <Button variant='contained'
                                className="btn  mb-1"
                                style={{
                                    backgroundColor: '#FFF',
                                    color: '#000'
                                }}
                                onClick={() => browserHistory.push('/user/updateprofile')}
                            >Update Profile
                            {/* <Link to={{
                            pathname: '/updateprofile',
                            state: { userDetails: listOfPeople }
                        }} >Update Profile</Link> */}
                            </Button>
                            <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => this.setState({
                                    viewProfile: false,
                                    viewRequestServices: true
                                })}>Requested Services</Button>

                            {/* On small devices route to /messagemobile when Messages button is clicked. On large devices /messages */}
                            {/* <Media query="(max-width: 769px)"
                                render={() => <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={() => browserHistory.push('/chathistorymobile')}>Messages</Button>}
                            /> <Media query="(min-width: 770px)"
                                render={() => <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={() => browserHistory.push('/messages')}>Messages</Button>

                                }
                            /> */}
                            {/* <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => browserHistory.push('/messages')}>Messages</Button> */}
                            {/* <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={this.handleSignOut}>Log Out</Button> */}
                        </div>

                        <div className="card col center-align mt-2  ml-3">
                            {(this.state.viewProfile) ? <ViewProfileUser userData={this.state.userData} />
                                : (this.state.viewRequestServices) ? <ViewRequestServicesUser />
                                    : < div > <h3>Please Update Your Profile</h3></div>}
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



export default ProfileUser;