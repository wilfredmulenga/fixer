import React, { Component } from 'react';



class ViewProfileUser extends Component {
    constructor(props) {
        super(props)

        // this.handleSignOut = this.handleSignOut.bind(this)
        this.state = {
            userData: JSON.parse(localStorage.getItem('currentUserData'))
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
        const { userData } = this.state;

        return (

            <div>

                {(userData) ? <div className='container' >
                    <h3 className='mb-3 mt-3'>Your Profile</h3>
                    <div className="d-flex justify-content-center ">
                    </div>
                    <div className="row mt-5 justify-content-between">
                        <div className="mb-3 col-md-5 ">
                            <h4>Personal Details</h4>
                            <b> Name:</b>{`${userData.firstName} ${userData.lastName}`}
                            <br />
                            <b>Phone Number: </b>{userData.phoneNumber} <br />
                            <h5>Service Address</h5>
                            <b>Street Address: </b>{userData.serviceAddress['streetAddress']} <br />
                            <b>Area: </b>{userData.serviceAddress.area} <br />
                            <b>City: </b>{userData.serviceAddress.city} <br />
                            <b>Phone Number: </b>{userData.serviceAddress.servicePhoneNumber} <br />

                            {console.log(userData.serviceAddress)}



                        </div>

                    </div>
                    <div className='mt-5' style={{ textAlign: 'center' }}>


                    </div></div> : <div><h3>Please Update Your Profile</h3></div>}
            </div>

        )
    }
}



export default ViewProfileUser;