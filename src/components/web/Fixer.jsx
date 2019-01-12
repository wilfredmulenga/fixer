import React from 'react';
import Navbar from './Navbar'
import Button from '@material-ui/core/Button';
import Media from 'react-media';
import placeHolderImage from '../../images/profilepic.jpeg';
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper';
import FixerReviews from './FixerReviews';
import Firebase from '../../config/firebase';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const textStyle = {
    fontSize: 13,
    marginBottom: 3
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
        console.log(typeof userUID)
        if (userUID !== 'null') {
            console.log('if statement')
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
                    <Card className="col-md-6 mt-5">
                        <CardContent>
                            <div >
                                <div className="row mb-4">
                                    <div className="mr-5"><img
                                        className="card-img-top rounded-circle"
                                        alt='profile pic' style={{ width: '152px', height: '152px' }} src={placeHolderImage} /></div>
                                    <div>
                                        <p style={{ fontSize: 42, marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.firstName} ${fixerProfile.lastName}`}</p>
                                        <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.profession}`}</p>
                                        <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.city} City`}</p>
                                        {/* <p style={{ marginTop: 0, marginBottom: 0 }}>{(fixerProfile.rating) ? `${fixerProfile.rating} Stars` : `0 Stars`}</p> */}
                                        <p style={{ marginTop: 0, marginBottom: 0 }}>{`${fixerProfile.phoneNumber}`}</p>
                                    </div>
                                </div>
                            </div>
                            <SwipeableTextMobileStepper />
                            <hr />
                            <div className='container-fluid mb-4' style={{ backgroundColor: '#fafafa', textAlign: 'center' }}>
                                <p>
                                    I Install and maintain wiring, control, and
        lighting systems. Inspect electrical components, such as
         transformers and circuit breakers. Identify electrical
         problems with a variety of testing devices. Repair or
         replace wiring, equipment, or fixtures using hand tools
        and power tools.
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