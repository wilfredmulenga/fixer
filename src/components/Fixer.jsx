import React from 'react';
import Navbar from './Navbar'

var listOfFixers = JSON.parse(localStorage.getItem('listOfFixers'))
var fixerProfile = []
class Fixer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fixerUID: this.props.location.state.fixerUID
        }
        console.log(this.state.fixerUID)
    }

    UNSAFE_componentWillMount() {
        for (var y = 0; y < listOfFixers.length; y++) {
            if (listOfFixers[y]["userUID"] === this.state.fixerUID) {
                fixerProfile.push(listOfFixers[y])
            }
        }
        console.log(fixerProfile)
    }

    render() {
        return (
            <div >
                <Navbar />
                <div style={{ height: "100vh", backgroundColor: "#F7F5F5" }} className=" row justify-content-center ">
                    <div className="col-md-8">
                        <div style={{ backgroundColor: "#FFF" }} className="mt-5 card-body">
                            <div className="row">
                                <div className="mr-5"><img style={{ width: '152px', height: '152px' }} src={fixerProfile[0]['pic']} /></div>
                                <div>
                                    <p style={{ fontSize: 42, marginTop: 0, marginBottom: 0 }}>Clara Tembo</p>
                                    <p style={{ marginTop: 0, marginBottom: 0 }}>Electrician, Lusaka City</p>
                                    <p style={{ marginTop: 0, marginBottom: 0 }}>Rating: 5 Stars</p>
                                    <p style={{ marginTop: 0, marginBottom: 0 }}></p>
                                    <p style={{ marginTop: 0, marginBottom: 0 }}>+260979 999 999</p>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h5>Job Description</h5>
                                <p>...</p>
                            </div>
                            <hr />
                            <div>
                                <h5>Reviews</h5>
                                <p>...</p>
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