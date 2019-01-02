import React from 'react';
import Navbar from '../../components/Navbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import placeholderPic from '../../images/profile_placeholder.png';
import Firebase from '../../config/firebase';
import Loader from '../../components/Loader';
import TextField from '@material-ui/core/TextField';

const userUID = localStorage.getItem('userUID');

class ProfileUser2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            edit: true,
            fullName: '',
            phoneNumber: '',
            profilePic: placeholderPic
        }
        Firebase.database()
            .ref(`Users/${userUID}/personalInformation`)
            .once('value', (snapshot) => {
                return snapshot

            }).then((snapshot) => {
                this.setState({

                    fullName: (snapshot.val() !== null) ? snapshot.val().fullName : '',
                    phoneNumber: (snapshot.val() !== null) ? snapshot.val().phoneNumber : '',
                    profilePic: (snapshot.val() !== null) ? snapshot.val().pic : placeholderPic
                })
                this.setState({
                    loaded: true
                })
            })

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeProfilePic = this.handleChangeProfilePic.bind(this)
        this.onSave = this.onSave.bind(this)

    }


    handleChange = (event) => {
        switch (event.target.id) {
            case 'fullName':
                this.setState({
                    fullName: event.target.value,
                })
                break;
            case 'phoneNumber':
                this.setState({
                    phoneNumber: event.target.value,
                })
                break;
            default:
        }
    }
    handleChangeProfilePic = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file,
                profilePic: reader.result,
            });
        };
        reader.readAsDataURL(file);
    }

    onSave = () => {
        this.setState({
            edit: false
        })
        Firebase.database()
            .ref(`Users/${userUID}/personalInformation`)
            .set({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                pic: this.state.profilePic,
                userUID: userUID
            })
        localStorage.setItem('currentUserData', JSON.stringify(
            {
                personalInformation: {
                    fullName: this.state.fullName,
                    phoneNumber: this.state.phoneNumber,
                    pic: this.state.profilePic,
                    userUID: userUID
                }
            }
        ))

        console.log("on save")
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid pb-5" style={{ backgroundColor: "#0dbab1", }}>
                    {
                        (this.state.loaded) ? <div><div className='pt-4' style={{ textAlign: 'center' }}><h5 className='whiteText'>Personal Information</h5></div>
                            <div className="row justify-content-center pt-4 mb-5">
                                <div className='col-12 row justify-content-center'>
                                    <img
                                        className="card-img-top rounded-circle"
                                        src={this.state.profilePic}
                                        style={{ width: 72, height: 72 }}
                                        alt={'profile pic'}
                                    />
                                </div>
                                <div className='col-12 row justify-content-center pt-3'>
                                    <p className='whiteText'>{this.state.fullName}</p>
                                </div>
                                {(this.state.edit) ? <div className='mt-3'>
                                    <p className='whiteText'>Change Photo</p>
                                    <input type="file" className="form-control"
                                        placeholder='profile picture'
                                        accept="image/png, image/jpeg, image/jpg" onChange={this.handleChangeProfilePic} />
                                </div> : null}
                            </div>
                            <Card style={{ minWidth: 240, display: 'flex', flexWrap: 'wrap' }}>
                                <CardContent style={{ width: '100%' }}>
                                    <div className="col-12 mb-2"> {(this.state.edit) ? <TextField
                                        id="fullName"
                                        label="Full Name"
                                        fullWidth
                                        value={this.state.fullName}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    /> : <p > Full Name: {this.state.fullName}</p>}</div>
                                    <div className="col-12">{(this.state.edit) ? <TextField
                                        id="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        value={this.state.phoneNumber}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    /> : <p >Phone Number: {this.state.phoneNumber}</p>}</div>
                                </CardContent>
                            </Card>
                            <div className="mt-5 row justify-content-center">
                                <Button
                                    className="btn"
                                    type="button"
                                    variant='contained'
                                    style={{ backgroundColor: '#FFF', color: '#000', width: '100px' }}
                                    onClick={() => this.onSave()}
                                >SAVE</Button>
                            </div></div> : <Loader />
                    }
                </div>
            </div>
        )
    }
}

export default ProfileUser2;