import React from 'react';
import Navbar from './Navbar';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';

var currentUserData = []
// JSON.parse(localStorage.getItem('currentUserData'));

class RequestService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobDescription: '',
            estimatedBudget: '',
            userData: currentUserData,
            streetAddress: currentUserData.serviceAddress.streetAddress,
            area: currentUserData.serviceAddress.area,
            city: currentUserData.serviceAddress.city,
            phoneNumber: currentUserData.serviceAddress.servicePhoneNumber,
            preferredStartDate: '',
            userUID: localStorage.getItem('userUID'),
            selectedPersonUserUID: this.props.location.state.selectedPersonUserUID,
            selectedPersonFullName: `${this.props.location.state.selectedPersonFullName}`,
            profession: this.props.location.state.profession,

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
            case 'area':
                this.setState({
                    area: value
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
        Firebase.database()
            .ref(`ServiceRequests`)
            .push({
                customer: {
                    userUID: this.state.userUID,
                    fullName: `${this.props.route.userData['0'].firstName} ${this.props.route.userData['0'].lastName}`
                },
                fixer: {
                    userUID: this.state.selectedPersonUserUID,
                    fullName: this.state.selectedPersonFullName
                },
                status: 'pending',
                jobDescription: this.state.jobDescription,
                profession: this.state.profession,
                estimatedBudget: this.state.estimatedBudget,
                serviceAddress: {
                    streetAddress: this.state.streetAddress,
                    area: this.state.area,
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
            browserHistory.push('/categories')
        }, 3000);
        console.log("write successful")
        event.preventDefault();
        return false
    }
    render() {
        return (<div>
            <Navbar />
            <div className="container">
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
                            <p>When would you like the serice</p>
                            <div>
                                <input className="form-control mb-2" type="text" placeholder="preferred start date"
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
                                    <input className="form-control mb-2" type="text" placeholder="area"
                                        onChange={this.handleChangeInput} value={this.state.area} required></input>
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

                        >Request Hire</button>
                    </div>
                </form>
            </div>
        </div>)
    }
}

export default RequestService