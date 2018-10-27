// This is the profile component

import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import { browserHistory } from 'react-router';
import Firebase from '../../config/firebase';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

let userData
let userUID
class UpdateProfileUser extends Component {

    constructor(props) {
        super(props);
        userData = this.props.route.userData['0'];
        userUID = this.props.route.userUID;
        if (userData != null) {
            this.state = {
                signedIn: true,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                email: userData.email,
                streetAddress: userData.serviceAddress.streetAddress,
                area: userData.serviceAddress.area,
                city: userData.serviceAddress.city,
                userUID: userData.userUID,
                open: false,
                snackbarText: '',
                servicePhoneNumber: userData.serviceAddress.servicePhoneNumber,
                error: '',

            }
        } else {
            this.state = {
                signedIn: true,
                file: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                streetAddress: '',
                area: '',
                city: '',
                userUID: '',
                open: false,
                snackbarText: '',
                servicePhoneNumber: '',
                error: '',

            }
        }

        this.sendData = this.sendData.bind(this);
    }











    sendData = (event) => {
        event.preventDefault();
        // console.log(this.state.firstName, this.state.lastName, this.state.phoneNumber,
        //     this.state.city, this.state.area, this.state.streetAddress, this.state.servicePhoneNumber)
        Firebase.database()
            .ref(`Users/${userUID}`)
            .update(
                {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber,
                    userUID: userUID,
                    serviceAddress: {
                        streetAddress: this.state.streetAddress,
                        city: this.state.city,
                        area: this.state.area,
                        servicePhoneNumber: this.state.phoneNumber
                    }
                },
                (error) => {
                    if (error) {
                        this.setState({
                            open: true,
                            snackbarText: 'Error submiting form, please try again'
                        })
                    } else {
                        this.setState({
                            open: true,
                            snackbarText: 'Successfully uploaded'
                        });

                        console.log('write successful');
                    }
                },
            );
        setTimeout(() => {

        }, 2000);
        window.location.reload()
        browserHistory.push('/categories')

    }





    handleChangeInput = ({ target: { value, placeholder } }) => {
        switch (placeholder) {
            case 'First Name':
                this.setState({
                    firstName: value,
                });
                break;
            case 'Last Name':
                this.setState({
                    lastName: value,
                });
                break;
            case 'Phone Number e.g 0979999999':
                this.setState({
                    phoneNumber: value,
                });
                break;
            case 'phone number':
                this.setState({
                    servicePhoneNumber: value,
                })
                break;
            case 'city':
                this.setState({
                    city: value,
                });
                break;
            case 'area':
                this.setState({
                    area: value,
                });
                break;
            case 'street address':
                this.setState({
                    streetAddress: value,
                });
                break;

            default:
                this.setState({
                    error: 'Please fill in all required fields ',
                });
                break
        }

    }

    render() {

        return (
            <div>
                <Navbar userUID={this.state.userUID} />
                <div className="container justify-content-center">
                    <h3>Update Profile</h3>
                    <div className="card">

                        <div className="card-body">
                            <form
                                className="needs-validation" onSubmit={this.sendData}>
                                <h5>Personal Information</h5>
                                <div className="mb-1">
                                    <div className="form-row">
                                        <div className="col col-sm-12 mb-3">
                                            <input
                                                type="text"
                                                value={this.state.firstName}
                                                onChange={this.handleChangeInput}
                                                className="form-control"
                                                placeholder="First Name"
                                                required
                                            />
                                        </div>
                                        <div className="col col-sm-12 mb-3">
                                            <input
                                                type="text"
                                                value={this.state.lastName}
                                                onChange={this.handleChangeInput}
                                                className="form-control"
                                                placeholder="Last Name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6 col-sm-12 mb-3">
                                            <input
                                                type="text"
                                                style={{ display: 'inline-block' }}
                                                value={this.state.phoneNumber}
                                                onChange={this.handleChangeInput}
                                                className="form-control"
                                                minLength='10'
                                                maxLength='13'
                                                placeholder="Phone Number e.g 0979999999"
                                                required
                                                pattern="[0-9,+]" />
                                        </div>
                                    </div>
                                </div>
                                <h5>Service Address</h5>
                                <div className="col-md-10" style={{ display: 'inline-block' }}>
                                    <input className="form-control mb-3" type="text" placeholder="street address"
                                        onChange={this.handleChangeInput} value={this.state.streetAddress}
                                        required></input>
                                    <input className="form-control mb-3" type="text" placeholder="area"
                                        onChange={this.handleChangeInput} value={this.state.area} required></input>
                                    <input className="form-control mb-3" type="text" placeholder="city"
                                        onChange={this.handleChangeInput} value={this.state.city} required></input>
                                    <input className="form-control mb-3" type="text" placeholder="phone number"
                                        minLength='10'
                                        maxLength='13'
                                        pattern="[0-9,+]"
                                        onChange={this.handleChangeInput} value={this.state.servicePhoneNumber} required></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <Button
                        type="button"
                        variant='text'
                        onClick={this.sendData}>Update Profile</Button>
                </div>
            </div>
        );
    }
}

export default UpdateProfileUser;
