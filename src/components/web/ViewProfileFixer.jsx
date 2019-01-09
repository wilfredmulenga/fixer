import React, { Component } from 'react';

var fixerUserProfile = JSON.parse(localStorage.getItem('currentUserData'))

class ViewProfileFixer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: fixerUserProfile
        }

    }
    render() {
        return (

            <div>

                {(fixerUserProfile) ? <div className='container' >
                    <h3 className='mb-3 mt-3'>Your Profile</h3>
                    <div className="d-flex justify-content-center ">


                        <div style={{ textAlign: 'center' }}>
                            <img
                                className="rounded-circle"
                                src={fixerUserProfile.pic}
                                style={{ width: 160, height: 160 }}
                                alt={'profile pic'}
                            /> <br />

                        </div>
                    </div>
                    <div className="row mt-5 justify-content-between">
                        <div className="mb-3 col-md-5 ">
                            <h4>Personal Details</h4>
                            <b>
                                Name:</b>{`${fixerUserProfile.firstName} ${fixerUserProfile.lastName}`}
                            <br />
                            <b>Profession: </b>{fixerUserProfile.profession} <br />

                            <b>
                                City: </b>{fixerUserProfile.city} <br />


                            <h4 className="mt-4 mb-1">Job Details</h4>
                            <b>
                                Skills: </b>
                            {`${fixerUserProfile.skills.map((element, i) => (
                                element.label
                            ))}`}

                            <br />


                            <b>Job Desciption: </b>{`${fixerUserProfile.briefDescription}`}
                        </div>
                        <div className=" col-md-5 ">
                            <h4 className="mb-2">Gallery of Work</h4>
                            {fixerUserProfile.galleryOfWork.map((image, i) => (
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



export default ViewProfileFixer;