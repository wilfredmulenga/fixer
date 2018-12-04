import React from 'react';
import Navbar from './Navbar';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar'

var currentUserData = JSON.parse(localStorage.getItem('currentUserData'));

class RequestService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobDescription: '',
            estimatedBudget: '',
            userData: currentUserData,
            streetAddress: (currentUserData) ? currentUserData.serviceAddress.streetAddress : null,
            city: (currentUserData.serviceAddress) ? currentUserData.serviceAddress.city : null,
            phoneNumber: (currentUserData.serviceAddress) ? currentUserData.serviceAddress.servicePhoneNumber : null,
            preferredStartDate: '',
            userUID: localStorage.getItem('userUID'),
            selectedPersonUserUID: this.props.location.state.fixerUID,
            selectedPersonFullName: `${this.props.location.state.fixerFullName}`,
            profession: this.props.location.state.profession,
            open: false

        }


    }




    render() {
        return (<div>
            <Navbar />
            <div className="container">
                <DetailedService profession={this.state.profession}
                    selectedPersonUserUID={this.state.selectedPersonUserUID}
                    selectedPersonFullName={this.state.selectedPersonFullName}
                />
            </div>
        </div>)
    }
}

class DetailedService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobDescription: '',
            estimatedBudget: '',
            userData: currentUserData,
            streetAddress: (currentUserData) ? currentUserData.serviceAddress.streetAddress : null,
            city: (currentUserData.serviceAddress) ? currentUserData.serviceAddress.city : null,
            phoneNumber: (currentUserData.serviceAddress) ? currentUserData.serviceAddress.servicePhoneNumber : null,
            preferredStartDate: '',
            userUID: localStorage.getItem('userUID'),
            selectedPersonUserUID: this.props.selectedPersonUserUID,
            selectedPersonFullName: `${this.props.selectedPersonFullName}`,
            profession: this.props.profession,

        }
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.submitRequest = this.submitRequest.bind(this)

    }
    handleChangeInput = ({ target: { value, placeholder } }) => {
        switch (placeholder) {
            case 'please give details of the work needed to be done':
                this.setState({
                    jobDescription: value
                })
                break;
            case '1000':
                this.setState({
                    estimatedBudget: value
                })
                break;
            case 'street address':
                this.setState({
                    streetAddress: value
                })
                break;

            case 'city':
                this.setState({
                    city: value
                })
                break;
            case 'phone number':
                this.setState({
                    phoneNumber: value
                })
                break;
            case 'preferred start date':
                this.setState({
                    preferredStartDate: value
                })
                break;
            default:
                break
        }
    }
    submitRequest = (event) => {
        this.setState({
            open: true
        })
        Firebase.database()
            .ref(`ServiceRequests/`)
            .push({
                userUID: this.state.userUID,
                userFullName: `${this.state.userData.firstName} ${this.state.userData.lastName}`,
                fixerUID: this.state.selectedPersonUserUID,
                fixerFullName: this.state.selectedPersonFullName,
                status: 'pending',
                jobDescription: this.state.jobDescription,
                profession: this.state.profession,
                estimatedBudget: this.state.estimatedBudget,
                serviceAddress: {
                    streetAddress: this.state.streetAddress,
                    city: this.state.city,
                    phoneNumber: this.state.phoneNumber,
                    preferredStartDate: this.state.preferredStartDate
                },
                timestamp: new Date().toLocaleString(),
                // serviceRequestID :
            }).catch((error) => {
                console.error('Error writing new message to Firebase Database', error);
            });
        setTimeout(() => {
            browserHistory.push('/user/profile')
        }, 3000);
        console.log("write successful")
        event.preventDefault();
        return false
    }
    render() {
        return (
            <form onSubmit={this.submitRequest}>
                <h4 className="mb-4">Request Service</h4>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="mb-4">
                            <p>Brief Description</p>
                            <textarea
                                className="form-control"
                                rows="5"
                                placeholder="please give details of the work needed to be done"
                                value={this.state.jobDescription}
                                onChange={this.handleChangeInput}
                                required
                            />
                        </div>
                        <div>
                            <p>Estimated Budget (ZMK)</p>
                            <div><input style={{ display: 'inline-block' }}
                                type="number" placeholder='1000'
                                onChange={this.handleChangeInput}
                                value={this.state.estimatedBudget} required /> </div>
                        </div>
                        <p>When would you like the service</p>
                        <div>
                            <input className="form-control mb-2" type="date" placeholder="preferred start date"
                                style={{ display: 'inline-block' }}
                                onChange={this.handleChangeInput} value={this.state.preferredStartDate} required></input>
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <p>Service Address</p>
                        <div>
                            <div className="col-md-10" style={{ display: 'inline-block' }}>
                                <input className="form-control mb-2" type="text" placeholder="street address"
                                    onChange={this.handleChangeInput} value={this.state.streetAddress}
                                    required></input>
                                <input className="form-control mb-2" type="text" placeholder="city"
                                    onChange={this.handleChangeInput} value={this.state.city} required></input>
                                <input
                                    type="text"
                                    value={this.state.phoneNumber}
                                    onChange={this.handleChangeInput}
                                    className="form-control mb-2"
                                    minLength='10'
                                    maxLength='13'
                                    placeholder="phone number"
                                    required
                                    pattern="^\+(?:[0-9]●?){6,14}[0-9]$"
                                />

                                {/* <input type="checkbox" name="rememberAddress" value="" /> Remember this address */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-5 text-center">
                    <button
                        onClick={() => this.submitRequest}

                    >Request Hire</button>
                </div>
                <Snackbar className="mb-4"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open} //change to this.state.open to show snackbar
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Service Request Successful</span>}
                />
            </form>
        )
    }
}

export default RequestService