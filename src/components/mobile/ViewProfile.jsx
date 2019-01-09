import React, { Component } from 'react';



class ViewProfile extends Component {
    constructor(props) {
        super(props)

        // this.handleSignOut = this.handleSignOut.bind(this)
        this.state = {
            userData: this.props.userData,
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


                        <div style={{ textAlign: 'center' }}>
                            <img
                                className="rounded-circle"
                                src={userData.pic}
                                style={{ width: 160, height: 160 }}
                                alt={'profile pic'}
                            /> <br />

                        </div>
                    </div>
                    <div className="row mt-5 justify-content-between">
                        <div className="mb-3 col-md-5 ">
                            <h4>Personal Details</h4>
                            <b>
                                Name:</b>{`${userData.firstName} ${userData.lastName}`}
                            <br />
                            <b>Profession: </b>{userData.profession} <br />

                            <b>
                                City: </b>{userData.city} <br />


                            <h4 className="mt-4 mb-1">Job Details</h4>
                            <b>
                                Skills: </b>{`${userData.skills.map((element, i) => (
                                    element.label
                                ))}`} <br />


                            <b>Job Desciption: </b>{`${userData.briefDescription}`}
                        </div>
                        <div className=" col-md-5 ">
                            <h4 className="mb-2">Gallery of Work</h4>
                            {userData.galleryOfWork.map((image, i) => (
                                <div key={i} className="row mb-3" >
                                    <div className="col-md-6">
                                        <img className="img-thumbnail mr-2" alt=" gallery of work" src={image} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mt-5' style={{ textAlign: 'center' }}>


                    </div></div> : <div><h3>Please Update Your Profile</h3></div>}
            </div>

        )
    }
}



export default ViewProfile;