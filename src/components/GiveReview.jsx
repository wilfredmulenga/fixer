import React from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Button from '@material-ui/core/Button';

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
                        <div className="col-6" style={{ textAlign: 'center' }}>
                            <Button
                                className="btn"
                                type="button"
                                variant='contained'
                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => this.setState({
                                    modal3IsOpen: false
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
                                    modal3IsOpen: false,
                                    modal4IsOpen: true
                                })}
                            >YES</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default GiveReview;