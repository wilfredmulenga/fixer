import React from 'react';
import ShakingHands from '../images/shaking-hands.jpeg';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

Modal.setAppElement('#root');
class BecomeAFixer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            submitSuccess: false,
            tryAgain: false,
            showError: false
        }
        this.handleHire = this.handleHire.bind(this)
    }
    handleHire = () => {
        this.setState({
            openModal: true
        })
        console.log("on click")
    }
    render() {
        return (
            <div className="container whiteBackground col-md-12 col-sm-12 mb-5">
                <br />
                <div className='text-center mb-5 heading'><h2 style={{ color: '#0dbab1', fontSize: 40, fontStyle: 'bold' }}>Become A Fixer</h2></div>

                <div className='row justify-content-center '>
                    <div className="card col-md-5 mr-3" style={{ width: "21rem", border: "1px solid white", textAlign: "center" }}>
                        <img className="card-img-top rounded" src={ShakingHands} alt="Shaking Hands" />

                    </div>
                    <div className="greenBorder col-md-4 row align-items-center">
                        <div>
                            <h5 className="card-title greenText"><strong>Gain more Customers, Become A Fixer</strong></h5>

                            <p className="card-text">Join our network of Fixers to get more jobs. Customers contact you directly when they want to hire you from our platform. Are you looking to work in a group? Through our platform we can help you connect with larger groups of Fixers.</p>
                            <div className='text-center'>
                                <Button className="btn  mb-1"
                                    type="button"
                                    variant='contained'
                                    style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.handleHire()}>Become A Fixer</Button>
                            </div>
                        </div>

                    </div>

                </div>
                <Modal
                    style={customStyles}
                    isOpen={this.state.openModal}

                >
                    <div className='row justify-content-center' >
                        <div className='col-md-8'   >
                            <h5 className='greenText mb-3'>Become a Fixer</h5>
                            <TextField
                                id="fullName"
                                label="Full Name"
                                fullWidth
                                value={this.state.fullName}
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                id="profession"
                                label="Profession"
                                fullWidth
                                value={this.state.profession}
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                id="phoneNumber"
                                label="Phone Number"
                                fullWidth
                                value={this.state.phoneNumber}
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                id="emailAddress"
                                label="Email Address"
                                fullWidth
                                value={this.state.emailAddress}
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                            {/* <input style={{ width: '90%' }} className='mb-1' type="text" placeholder='full name' value={this.state.fullName} onChange={this.handleInputChange}></input>
              <input style={{ width: '90%' }} className='mb-1' type="text" placeholder='profession' value={this.state.profession} onChange={this.handleInputChange}></input>
              <input style={{ width: '90%' }} className='mb-1' type='text' placeholder='phone number' value={this.state.phoneNumber} onChange={this.handleInputChange}></input>
              <input style={{ width: '90%' }} className='mb-1' type='email' placeholder='email address' value={this.state.emailAddress} onChange={this.handleInputChange}></input> */}
                        </div>


                    </div>
                    <div>
                        {(this.state.showError) ? <p style={{ color: 'red' }}>Please input all fields</p> : null}
                    </div>
                    <div className='align-self-end mt-5'>
                        <div className='row justify-content-around '>
                            <Button className="btn  mb-1"
                                type="button"
                                variant='contained'
                                style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.setState({
                                    openModal: false
                                })}>Close</Button>
                            <Button className="btn  mb-1"
                                type="button"
                                variant='contained'
                                style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.handleSubmit()}>Submit</Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    style={customStyles}
                    isOpen={this.state.submitSuccess}>
                    <div style={{ height: '100%' }} className='row container-fluid justify-content-center align-items-center'>
                        <h5 className='mb-5 greenText'>Thank you for signing up! Our Fixer Team will be in contact soon.</h5>
                        <Button className="btn  mb-1"
                            type="button"
                            variant='contained'
                            style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.setState({
                                submitSuccess: false
                            })}>Close</Button>
                    </div>
                </Modal>
                <Modal
                    style={customStyles}
                    isOpen={this.state.tryAgain}>
                    <div style={{ height: '100%' }} className='row container-fluid justify-content-center align-items-center'>
                        <h5 className='mb-5 greenText'>Ooops! something went wrong. Please try again</h5>
                        <Button className="btn  mb-1"
                            type="button"
                            variant='contained'
                            style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.setState({
                                submitSuccess: false,
                                openModal: true
                            })}>Retry</Button>
                    </div>
                </Modal>

            </div>




        )
    }
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        height: '80vh',
        textAlign: 'center'
    }
};

export default BecomeAFixer;