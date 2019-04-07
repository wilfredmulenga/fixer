import React from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Button from '@material-ui/core/Button';
import Rating from './Rating';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';
import placeholderPic from '../images/profile_placeholder.png'
import TextField from '@material-ui/core/TextField';

Modal.setAppElement('#root');
const currentUserData = JSON.parse(localStorage.getItem('currentUserData'));
const userUID = localStorage.getItem('userUID');

class GiveReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal1IsOpen: true,
            modal2IsOpen: false,
            modal3IsOpen: false,
            modal4IsOpen: false,
            comment: '',
            rating: null,
            fixerUID: (this.props.location.state !== undefined) ? this.props.location.state.fixerUID : null
        }
        this.submitReview = this.submitReview.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    submitReview = () => {
        let date = new Date()
        let currentDate = date.getDate()
        let currentMonth = date.getMonth()
        let currentYear = date.getFullYear()
        //creates a review
        Firebase.database()
            .ref(`Fixers/${this.state.fixerUID}/reviews`)
            .push({
                dateOfReview: `${currentDate}/${currentMonth}/${currentYear}`,
                name: (currentUserData.firstName) ? `${currentUserData.firstName} ${currentUserData.lastName}` : `Anonymous`,
                pic: (currentUserData.pic) ? currentUserData.pic : placeholderPic,
                rating: this.state.rating + 1,
                review: this.state.comment
            })

        //chances status of review to reviewed
        Firebase.database()
            .ref(`Users/${userUID}/serviceRequests`)
            .orderByChild('fixerUID')
            .equalTo(this.state.fixerUID)
            .once('value', (snapshot) => {
                return snapshot.val()
            }).then(function (snapshot) {

                return Object.getOwnPropertyNames(snapshot.val())[0]
            })
            .then(function (key) {
                return Firebase.database()
                    .ref(`Users/${userUID}/serviceRequests/${key}`)
                    .update({
                        reviewStatus: 'reviewed'
                    })
            })

        this.setState({
            modal3IsOpen: false,
            modal4IsOpen: true
        })

    }
    handleChangeInput = (event) => {
        switch (event.target.id) {
            case "comment":
                this.setState({
                    comment: event.target.value
                })
                break;
            default:

        }
    }


    render() {
        return (
            <div>
                <Navbar />
                {/* did they pick up the call modal */}
                <Modal
                    isOpen={this.state.modal1IsOpen}
                    style={customStyles}
                    id="modalStyles"
                    contentLabel="Example Modal">
                    <h5>Did the Fixer pick up the call</h5>
                    <div className='mt-5 row justify-content-center '>
                        <div className="col-6" style={{ textAlign: 'center' }}>
                            <Button
                                className="btn"
                                type="button"
                                variant='contained'
                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => {
                                    this.setState({
                                        modal1IsOpen: false
                                    })
                                    browserHistory.push({ pathname: '/requestservice' })
                                }
                                }
                            >NO</Button>
                        </div>
                        <div className="col-6" style={{ textAlign: 'center' }}>
                            <Button
                                className="btn"
                                type="button"
                                variant='contained'
                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => this.setState({
                                    modal1IsOpen: false,
                                    modal2IsOpen: true
                                })}
                            >YES</Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.modal2IsOpen}
                    style={customStyles}
                    id="modalStyles"
                    contentLabel="Example Modal">
                    <h5>Have they finished the job?</h5>
                    <div className='mt-5 row justify-content-center '>
                        <div className="col-6" style={{ textAlign: 'center' }}>
                            <Button
                                className="btn"
                                type="button"
                                variant='contained'
                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => {
                                    this.setState({
                                        modal2IsOpen: false
                                    })
                                    browserHistory.push({ pathname: '/requestservice' })
                                }}
                            >NO</Button>
                        </div>
                        <div className="col-6" style={{ textAlign: 'center' }}>
                            <Button
                                className="btn"
                                type="button"
                                variant='contained'
                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => this.setState({
                                    modal2IsOpen: false,
                                    modal3IsOpen: true
                                })}
                            >YES</Button>
                        </div>
                    </div>
                </Modal>
                {/* rate their service */}
                <Modal
                    isOpen={this.state.modal3IsOpen}
                    style={customStyles2}
                    id="modalStyles"
                    contentLabel="Example Modal">
                    <h5>How well would you rate this fixer</h5>
                    <div className='mt-5 row justify-content-center '>
                        <Rating rating={this.state.rating} handleChange={this.handleChange} />
                    </div>
                    <h5 className="mt-3 mb-3">Comments</h5>
                    <div className='row justify-content-center mb-3  '>
                        <TextField
                            id="comment"
                            multiline
                            rows="3"
                            // helperText="Full width!"
                            fullWidth
                            // defaultValue="Default Value"
                            className='col-md-8'
                            margin="normal"
                            value={this.state.comment}
                            onChange={this.handleChangeInput}
                        />
                        {/* <textarea style={{ width: 200 }} rows="3" value={this.state.comment} onChange={this.handleChangeInput}
                            placeholder="leave a comment" required ></textarea> */}
                    </div>
                    <div className='mt-5 row justify-content-center '>
                        <Button
                            className="btn"
                            type="button"
                            variant='contained'
                            style={{ backgroundColor: '#FFF', color: '#000' }}
                            onClick={() => this.submitReview()}
                        >SUBMIT REVIEW</Button>
                    </div>
                </Modal>
                <Modal style={customStyles} isOpen={this.state.modal4IsOpen}>
                    <div style={{ textAlign: 'center' }}>
                        <p>Thank you for your review!</p>
                        <div className='mt-5 row justify-content-center '>
                            <Button
                                className="btn"
                                type="button"
                                variant='contained'
                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => browserHistory.push({
                                    pathname: '/categories'
                                })}
                            >RETURN</Button>
                        </div>
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
        height: '50vh',
        textAlign: 'center'
    }
};

const customStyles2 = {
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




export default GiveReview;