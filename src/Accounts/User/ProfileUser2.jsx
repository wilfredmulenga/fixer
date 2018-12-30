import React from 'react';
import Navbar from '../../components/Navbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import placeholderPic from '../../images/profile_placeholder.png';
import Firebase from '../../config/firebase';

let currentUserData = JSON.parse(localStorage.getItem('currentUserData'));
const userUID = localStorage.getItem('userUID');

class ProfileUser2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: true,
            fullName: (currentUserData !== null && currentUserData.personalInformation !== undefined && currentUserData.personalInformation.fullName !== undefined) ? `${currentUserData.personalInformation.fullName} ` : '',
            phoneNumber: (currentUserData.personalInformation !== undefined && currentUserData.personalInformation.phoneNumber !== null) ? currentUserData.personalInformation.phoneNumber : '',
            profilePic: (currentUserData !== null && currentUserData.personalInformation !== undefined && currentUserData.personalInformation.pic !== undefined) ? currentUserData.personalInformation.pic : placeholderPic
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeProfilePic = this.handleChangeProfilePic.bind(this)
        this.onSave = this.onSave.bind(this)
    }


    handleChange = ({ target: { value, placeholder } }) => {
        switch (placeholder) {
            case 'full name':
                this.setState({
                    fullName: value,
                })
                break;
            case 'phone number':
                this.setState({
                    phoneNumber: value,
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

        console.log("on save")
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid pb-5" style={{ backgroundColor: "#0dbab1", }}>
                    <div className='pt-4' style={{ textAlign: 'center' }}><h5 className='whiteText'>Personal Information</h5></div>
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
                            <div className="col-12 mb-2"> {(this.state.edit) ? <input style={{ width: '100%' }} type='text' placeholder='full name' value={this.state.fullName} onChange={this.handleChange}></input> : <p > Full Name: {this.state.fullName}</p>}</div>
                            <div className="col-12">{(this.state.edit) ? <input style={{ width: '100%' }} type='number' placeholder='phone number' value={this.state.phoneNumber} onChange={this.handleChange}></input> : <p >Phone Number: {this.state.phoneNumber}</p>}</div>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileUser2;