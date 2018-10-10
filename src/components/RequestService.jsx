import React from 'react';
import Navbar from './Navbar';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';

class RequestService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobDescription: '',
            estimatedBudget: '',
            streetAddress: '',
            area: '',
            city: '',
            phoneNumber: '',
            preferredStartDate: '',
            userUID: this.props.route.userUID,
            selectedPersonUserUID: this.props.location.state.selectedPersonUserUID
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
                break
            case '1000':
                this.setState({
                    estimatedBudget: value
                })
                break
            case 'street address':
                this.setState({
                    streetAddress: value
                })
                break
            case 'area':
                this.setState({
                    area: value
                })
                break
            case 'city':
                this.setState({
                    city: value
                })
                break
            case 'phoneNumber':
                this.setState({
                    phoneNumber: value
                })
                break
            case 'preferredStartDate':
                this.setState({
                    preferredStartDate: value
                })
                break
        }
    }
    submitRequest = (event) => {
        Firebase.database()
            .ref(`ServiceRequests`)
            .push({
                customer: this.state.userUID,
                fixer: this.state.selectedPersonUserUID,
                status: 'pending'
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
                                    type="number" placeholder='1000' required /> </div>
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <p>Service Address</p>
                            <div>
                                <div className="col-md-10" style={{ display: 'inline-block' }}>
                                    <input className="form-control mb-2" type="text" placeholder="street address" required></input>
                                    <input className="form-control mb-2" type="text" placeholder="area" required></input>
                                    <input className="form-control mb-2" type="text" placeholder="city" required></input>
                                    <input className="form-control mb-2" type="number" placeholder="phone number" required></input>
                                    <input className="form-control mb-2" type="text" placeholder="preferred start date" required></input>
                                    <input type="checkbox" name="vehicle2" value="Car" /> Remember this address
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