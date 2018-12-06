import React from 'react';
import Navbar from './Navbar'
import Button from '@material-ui/core/Button';
import { browserHistory } from 'react-router';



class Fixer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fixerProfile: this.props.location.state.fixerProfile[0]
        }

    }



    render() {
        const { fixerProfile } = this.state
        return (
            <div >
                <Navbar />
                <div style={{ height: "100vh", backgroundColor: "#0dbab1" }} className=" row justify-content-center ">
                    <div className="col-md-8">
                        <div style={{ backgroundColor: "#FFF" }} className="mt-5 card-body">
                            <div className="row col-md-12">
                                <div className="row col-md-8">
                                    <div className="mr-5"><img style={{ width: '152px', height: '152px' }} src={fixerProfile.pic} /></div>
                                    <div>
                                        <p style={{ fontSize: 42, marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.firstName} ${fixerProfile.lastName}`}</p>
                                        <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.profession}`}</p>
                                        <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.city} City`}</p>
                                        {/* <p style={{ marginTop: 0, marginBottom: 0 }}>{(fixerProfile.rating) ? `${fixerProfile.rating} Stars` : `0 Stars`}</p> */}

                                        <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.phoneNumber}`}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 text-center row align-items-center justify-content-center">
                                    <a href='tel:+260967639241' >  <Button
                                        className="btn  mb-1"
                                        type="button"
                                        variant='contained'
                                        style={{ backgroundColor: '#FFF', color: '#000' }}
                                    // onClick={() => browserHistory.push({
                                    //     pathname: '/requestservice',
                                    //     state: {
                                    //         fixerUID: fixerProfile.userUID,
                                    //         profession: fixerProfile.profession,
                                    //         fixerFullName: `${fixerProfile.firstName} ${fixerProfile.lastName}`
                                    //     }
                                    // })}
                                    > CALL </Button></a>
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
                                {(fixerProfile.reviews) ? fixerProfile.reviews.map((element, i) => <p key={i}>{element}</p>) : <p>no reviews yet</p>}
                            </div>

                        </div>
                    </div>
                </div>

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