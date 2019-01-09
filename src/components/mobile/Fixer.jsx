import React from 'react';
import Navbar from './Navbar'
import Button from '@material-ui/core/Button';
import Media from 'react-media';
import placeHolderImage from '../../images/profilepic.jpeg';
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper';
import FixerReviews from './FixerReviews';
import Firebase from '../../config/firebase';
import Snackbar from '@material-ui/core/Snackbar';


const textStyle = {
    fontSize: 13,
    marginBottom: 3
}
const userUID = localStorage.getItem('userUID')
class Fixer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fixerProfile: (this.props.location.state.fixerProfile !== undefined) ? this.props.location.state.fixerProfile[0] : null,
            loginPrompt: false
        }
        this.handleServiceRequest = this.handleServiceRequest.bind(this);
    }

    componentDidMount() {

    }

    handleServiceRequest = () => {
        console.log(typeof userUID)
        if (userUID !== 'null') {
            console.log('if statement')
            Firebase.database()
                .ref(`Users/${userUID}/serviceRequests`)
                .push({
                    fixerFullName: `${this.state.fixerProfile.firstName} ${this.state.fixerProfile.lastName}`,
                    fixerPhoneNumber: this.state.fixerProfile.phoneNumber,
                    profession: this.state.fixerProfile.profession,
                    fixerUID: this.state.fixerProfile.userUID,
                    reviewStatus: "pending"
                })
        } else {
            this.setState({
                loginPrompt: true
            })
        }

    }

    render() {
        const { fixerProfile } = this.state
        return (
            <div >
                <Navbar />
                <Media query="(max-width: 480px)"
                    render={() => <div style={{ height: '100%' }}>
                        <div className='row container mt-2'>
                            <div className='col-3'>
                                <img alt='profile pic' className='rounded-circle' style={{ width: 72, height: 72 }} src='https://firebasestorage.googleapis.com/v0/b/lsk-guide-jobs.appspot.com/o/kbVNfYtVIcUKwtTXFthTaFB8Xsp1%2Fpexels-photo-428361.jpeg?alt=media&token=9ef3aee5-412a-491e-ae01-1cc43913be4e' />
                            </div>
                            <div className='col-5 ml-1' >
                                <p style={textStyle}>Richard Sikazwe, Carpenter</p>
                                <p style={textStyle}>Ibex Hill, Lusaka</p>
                                <p style={textStyle}>Skills: Wiring, Scaffolding</p>
                            </div>
                            <div className='col-4 row align-items-end'>
                                {(userUID !== 'null') ? <a href='tel:+2609799999999'
                                >  <Button
                                    className="btn  mb-1"
                                    type="button"
                                    variant='contained'
                                    style={{ backgroundColor: '#FFF', color: '#000', width: 100 }}
                                    onClick={() => this.handleServiceRequest()}
                                > CALL </Button></a> :
                                    <Button
                                        className="btn  mb-1"
                                        type="button"
                                        variant='contained'
                                        style={{ backgroundColor: '#FFF', color: '#000', width: 100 }}
                                        onClick={() => this.setState({
                                            loginPrompt: true
                                        })}
                                    > CALL </Button>
                                }
                            </div>
                        </div>
                        <hr />
                        <SwipeableTextMobileStepper />
                        <div className='container-fluid' style={{ backgroundColor: '#fafafa', textAlign: 'center' }}>
                            <p style={textStyle}>
                                I Install and maintain wiring, control, and
    lighting systems. Inspect electrical components, such as
     transformers and circuit breakers. Identify electrical
     problems with a variety of testing devices. Repair or
     replace wiring, equipment, or fixtures using hand tools
    and power tools.
                            </p>
                        </div>
                        <FixerReviews fixerUID={this.state.fixerProfile.userUID} />
                        <Snackbar className="mb-4"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.loginPrompt} //change to this.state.open to show snackbar
                            autoHideDuration={3000}
                            onClose={() => this.setState({
                                loginPrompt: false
                            })}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Login first</span>}
                        />
                    </div>

                    }
                />
                <Media query="(min-width:481px)" render={() =>
                    <div style={{ height: "100vh", backgroundColor: "#0dbab1" }}
                        className=" row justify-content-center ">
                        <div className="col-md-8">
                            <div style={{ backgroundColor: "#FFF" }} className="mt-5 card-body">
                                <div className="row col-md-12">
                                    <div className="row col-md-8">
                                        <div className="mr-5"><img alt='profile pic' style={{ width: '152px', height: '152px' }} src={placeHolderImage} /></div>
                                        <div>
                                            <p style={{ fontSize: 42, marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.firstName} ${fixerProfile.lastName}`}</p>
                                            <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.profession}`}</p>
                                            <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.city} City`}</p>
                                            {/* <p style={{ marginTop: 0, marginBottom: 0 }}>{(fixerProfile.rating) ? `${fixerProfile.rating} Stars` : `0 Stars`}</p> */}
                                            <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.phoneNumber}`}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center row align-items-center justify-content-center">
                                        {(userUID !== null)}
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <h5>Job Description</h5>
                                    <p>{`${fixerProfile.briefDescription}`}</p>
                                </div>
                                <hr />
                                <div>
                                    <h5>Reviews</h5>
                                    {/* {(fixerProfile.reviews) ? fixerProfile.reviews.map((element, i) => <p key={i}>{element}</p>) : <p>no reviews yet</p>} */}
                                </div>

                            </div>
                        </div>

                    </div>
                } />
            </div>
            // <div>
            //     {(selectedPerson.firstName !== '' && selectedPerson.lastName !== '' && selectedPerson.age !== ''
            //         && selectedPerson.city !== '' && selectedPerson.briefDescription !== '' && selectedPerson.email !== ''
            //         && selectedPerson.phoneNumber !== '' && selectedPerson.nrc !== '') ?
            //         <Modal
            //             isOpen={this.state.modalIsOpen}
            //             //style={customStyles}
            //             id="modalStyles"
            //             contentLabel="Example Modal">
            //             <div className="container ">
            //                 <div className=" row mb-3 justify-content-end"
            //                 >
            //                     <img src={cancelButton} alt="cancel button" />
            //                     {/* <Button

            //                   type="button"
            //                   onClick={() => this.setState({
            //                     modalIsOpen: false
            //                   })}
            //                   variant='contained'
            //                   color="secondary">
            //                   Cancel</Button> */}
            //                 </div>
            //                 <div className="row justify-content-center">

            //                     <div className="col-md-6">
            //                         <div>
            //                             <div className='text-center col mb-2'>
            //                                 <img
            //                                     className="rounded-circle"
            //                                     src={selectedPerson.pic}
            //                                     style={{ width: 160, height: 160 }}
            //                                     alt={'profile pic'}
            //                                 />
            //                             </div>
            //                             <div className="col-md-12 col-sm-12 text-center">
            //                                 <p style={{ fontSize: 24, marginBottom: 0 }}>{`${selectedPerson.firstName} ${selectedPerson.lastName}`}</p>
            //                                 <p style={{ fontSize: 16, marginBottom: 0 }}>{`${selectedPerson.profession}`}</p>
            //                                 <p style={{ fontSize: 12, marginBottom: 0 }}>{selectedPerson.city}</p>
            //                                 <div className='row'>
            //                                     <div className='col-6'><p>Ratings: 5 Stars</p></div>

            //                                     <div className='col-6'><p>24 Reviews</p></div>
            //                                 </div>
            //                             </div>
            //                             <div>
            //                             </div>
            //                         </div>
            //                         <div className="text-center">
            //                             <a href="tel:+260967639241" style={{ decoration: 'none' }}>
            //                                 <Button className="mt-3" variant='contained'
            //                                     style={{ backgroundColor: '#FFF', color: '#000', width: 200 }}
            //                                 // onClick={() => }

            //                                 >Call</Button></a>
            //                         </div>
            //                     </div>

            //                 </div>
            //             </div>
            //         </Modal> : null}

            // </div>

        )
    }
}

export default Fixer;