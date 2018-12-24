import React from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

class GiveReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal1IsOpen: true,
            modal2IsOpen: false,
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                {/* did they pick up the call modal */}
                <Modal
                    isOpen={this.state.modal1IsOpen}
                    //style={customStyles}
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
                                onClick={() => this.setState({
                                    modal1IsOpen: false
                                })}
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
                    //style={customStyles}
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
                                onClick={() => this.setState({
                                    modal2IsOpen: false
                                })}
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
                    //style={customStyles}
                    id="modalStyles"
                    contentLabel="Example Modal">
                    <h5>How well would you rate this fixer</h5>
                    <div className='mt-5 row justify-content-center '>
                        <Rating />
                    </div>
                    <h5 className="mt-3 mb-3">Comments</h5>
                    <div className='row justify-content-center  '>
                        <textarea rows="3" required ></textarea>
                    </div>
                    <div className='mt-5 row justify-content-center '>
                        <Button
                            className="btn"
                            type="button"
                            variant='contained'
                            style={{ backgroundColor: '#FFF', color: '#000' }}
                            onClick={() => this.setState({
                                modal2IsOpen: false
                            })}
                        >SUBMIT REVIEW</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

class Rating extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: null,
            temp_rating: null

        }
    }
    rate(rating) {
        this.setState({
            rating: rating,
            temp_rating: rating
        });

    }
    star_over(rating) {
        this.state.temp_rating = this.state.rating;
        this.state.rating = rating;

        this.setState({
            rating: this.state.rating,
            temp_rating: this.state.temp_rating
        });
    }
    // star_out() {
    //     this.state.rating = this.state.temp_rating;

    //     this.setState({ rating: this.state.rating });
    // }
    render() {
        var stars = [];

        for (var i = 0; i < 5; i++) {
            var klass = 'star-rating__star';

            if (this.state.rating >= i && this.state.rating != null) {
                klass += ' is-selected';
            }

            stars.push(
                <label
                    className={klass}
                    onClick={this.rate.bind(this, i)}
                    onMouseOver={this.star_over.bind(this, i)}
                // onMouseOut={this.star_out}
                >
                    ★
            </label>
            );
        }
        return (
            <div>

                {stars}
            </div>
        )
    }
}



export default GiveReview;