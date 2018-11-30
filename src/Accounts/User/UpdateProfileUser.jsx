// This is the profile component

import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import { browserHistory } from 'react-router';
import Firebase from '../../config/firebase';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

let userData
let userUID
class UpdateProfileUser extends Component {

    constructor(props) {
        super(props);
        userData = JSON.parse(localStorage.getItem('currentUserData'));
        userUID = localStorage.getItem('userUID');
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
                <Navbar />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col align-self-center">
                            <Card className="main-login main-center updateProfileCard">
                                <CardContent>

                                    <div>
                                        <h3>Update Profile</h3>
                                        <h5>Personal Information</h5>
                                        <form
                                            className="needs-validation" onSubmit={this.sendData}>

                                            <div>
                                                <div className="form-group">
                                                    <label className="cols-sm-2 control-label">First Name</label>
                                                    <div className="cols-sm-10">
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                value={this.state.firstName}
                                                                onChange={this.handleChangeInput}
                                                                className="form-control"
                                                                placeholder="First Name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="cols-sm-2 control-label">Last Name</label>
                                                    <div className="cols-sm-10">
                                                        <div className="input-group">
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
                                                </div>
                                                <div className="form-group">
                                                    <label className="cols-sm-2 control-label">Phone Number</label>
                                                    <div className="cols-sm-10">
                                                        <div className="input-group">
                                                            <input
                                                                type="text"

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
                                            </div>
                                            <h5>Service Address</h5>
                                            <div>
                                                <div className="form-group">
                                                    <label className="cols-sm-2 control-label">Street Address</label>
                                                    <div className="cols-sm-10">
                                                        <div className="input-group">
                                                            <input className="form-control " type="text" placeholder="street address"
                                                                onChange={this.handleChangeInput} value={this.state.streetAddress}
                                                                required></input>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="cols-sm-2 control-label">Area</label>
                                                    <div className="cols-sm-10">
                                                        <div className="input-group">
                                                            <input className="form-control " type="text" placeholder="area"
                                                                onChange={this.handleChangeInput} value={this.state.area} required></input>


                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="cols-sm-2 control-label">City</label>
                                                    <div className="cols-sm-10">
                                                        <div className="input-group">
                                                            <input className="form-control " type="text" placeholder="city"
                                                                onChange={this.handleChangeInput} value={this.state.city} required></input>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="cols-sm-2 control-label">Phone Number</label>
                                                    <div className="cols-sm-10">
                                                        <div className="input-group">
                                                            <input className="form-control " type="text" placeholder="phone number"
                                                                minLength='10'
                                                                maxLength='13'
                                                                pattern="[0-9,+]"
                                                                onChange={this.handleChangeInput} value={this.state.servicePhoneNumber} required></input>

                                                        </div>
                                                    </div>
                                                </div>




                                            </div>
                                        </form>
                                        <br />
                                        <div className='text-center'>
                                            <Button
                                                size="large"
                                                variant='contained'
                                                onClick={this.sendData}>Update Profile</Button>
                                        </div>
                                        <br />

                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>
                <br />
                <br />
            </div>
        );
    }
}

export default UpdateProfileUser;
