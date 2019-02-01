import React from 'react';
import Navbar from './Navbar'
import Button from '@material-ui/core/Button';
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper';
import FixerReviews from './FixerReviews';
import Firebase from '../../config/firebase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { browserHistory } from 'react-router';

const textStyle = {
    fontSize: 18,
    marginBottom: 3,
    marginTop: 3
}
const userUID = localStorage.getItem('userUID')
class Fixer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fixerProfile: (this.props.location.state.fixerProfile !== undefined) ? this.props.location.state.fixerProfile[0] : null,
            loginPrompt: false
        }
        this.handleServiceRequest = this.handleServiceRequest.bind(this);
    }

    componentDidMount() {

    }

    handleServiceRequest = () => {

        if (userUID !== 'null') {

            Firebase.database()
                .ref(`Users/${userUID}/serviceRequests`)
                .push({
                    fixerFullName: `${this.state.fixerProfile.firstName} ${this.state.fixerProfile.lastName}`,
                    fixerPhoneNumber: this.state.fixerProfile.phoneNumber,
                    profession: this.state.fixerProfile.profession,
                    fixerUID: this.state.fixerProfile.userUID,
                    reviewStatus: "pending"
                })
        } else {
            this.setState({
                loginPrompt: true
            })
        }

    }

    render() {
        const { fixerProfile } = this.state
        return (
            <div >
                <Navbar />

                <div style={{ backgroundColor: "#0dbab1" }}
                    className=" row justify-content-center ">
                    <Card className="col-md-8 mt-5">
                        <CardContent>
                            <div >
                                <div className="row mb-4 justify-content-center">
                                    <div className="col-md-3 "><img
                                        className="card-img-top rounded-circle"
                                        alt='profile pic' style={{ width: '152px', height: '152px', objectFit: 'cover' }} src={fixerProfile.pic} /></div>
                                    <div className="col-md-9">
                                        <h4 style={{ fontStyle: 'bold', marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.firstName} ${fixerProfile.lastName}`}</h4>
                                        <p style={textStyle}>{`Profession: ${fixerProfile.profession}`}</p>
                                        <p style={textStyle}>{`Serviceable Area: ${fixerProfile.location}`}</p>
                                        {/* <p style={{ marginTop: 0, marginBottom: 0 }}>{(fixerProfile.rating) ? `${fixerProfile.rating} Stars` : `0 Stars`}</p> */}
                                        {(userUID === 'null') ? (<div><p style={textStyle}>{(fixerProfile.phoneNumber) ? `Phone Number: ${fixerProfile.phoneNumber}` : null}
                                        </p>
                                            <p style={textStyle}> {(fixerProfile.email) ? `Email: ${fixerProfile.email}` : null}
                                            </p>
                                            <a style={textStyle} href={(fixerProfile.websit !== null) ? fixerProfile.website : null}> {(fixerProfile.website) ? `Website: ${fixerProfile.website}` : null}
                                            </a>
                                        </div>) :
                                            <Button
                                                className="btn mt-2 mb-1"
                                                type="button"
                                                variant='contained'
                                                style={{ backgroundColor: '#FFF', color: '#000' }}
                                                onClick={() => browserHistory.push({
                                                    pathname: '/phonelogin'
                                                })}
                                            >Login to view Contact</Button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <SwipeableTextMobileStepper galleryOfWork={fixerProfile.galleryOfWork} />
                            <hr />
                            <div className='container-fluid mb-4' style={{ backgroundColor: '#fafafa', textAlign: 'center' }}>
                                <p>
                                    {(fixerProfile.briefDescription !== null) ? <p>{fixerProfile.briefDescription}</p> : null}
                                </p>
                            </div>
                            <hr />
                            <FixerReviews fixerUID={this.state.fixerProfile.userUID} />
                        </CardContent>
                    </Card>
                </div>

            </div>


        )
    }
}

export default Fixer;