import React from 'react';
import Navbar from '../../components/Navbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import placeholderPic from '../../images/profile_placeholder.png';
let currentUserData = JSON.parse(localStorage.getItem('currentUserData'));

class ProfileUser2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: true,
            fullName: (currentUserData.firstName !== undefined) ? `${currentUserData.firstName} ${currentUserData.lastName}` : '',
            phoneNumber: (currentUserData.phoneNumber !== undefined) ? currentUserData.phoneNumber : '',
            profilePic: (currentUserData.pic !== undefined) ? currentUserData.pic : placeholderPic
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeProfilePic = this.handleChangeProfilePic.bind(this)
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
        console.log(file)
        reader.onloadend = () => {
            this.setState({
                file,
                profilePic: reader.result,
            });
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid" style={{ backgroundColor: "#0dbab1", height: "100vh" }}>
                    <div className="row justify-content-center pt-3 mb-5">
                        <img
                            className="card-img-top rounded-circle"
                            src={this.state.profilePic}
                            style={{ width: 72, height: 72 }}
                            alt={'profile pic'}
                        />
                        {(this.state.edit) ? <div className='mt-2'>
                            <p className='whiteText'>Change Photo</p>
                            <input type="file" className="form-control"
                                placeholder='profile picture'
                                accept="image/png, image/jpeg, image/jpg" onChange={this.handleChangeProfilePic} />
                        </div> : null}
                    </div>
                    <Card style={{ minWidth: 240, display: 'flex', flexWrap: 'wrap' }}>
                        <CardContent style={{ width: '100%' }}>
                            <div className="col-12 mb-2"> {(this.state.edit) ? <input style={{ width: '100%' }} type='text' placeholder='full name' value={this.state.fullName} onChange={this.handleChange}></input> : <p >{this.state.fullName}</p>}</div>
                            <div className="col-12">{(this.state.edit) ? <input style={{ width: '100%' }} type='text' placeholder='phone number' value={this.state.phoneNumber} onChange={this.handleChange}></input> : <p >{this.state.phoneNumber}</p>}</div>
                        </CardContent>
                    </Card>
                    <div className="mt-5 row justify-content-center">
                        <Button
                            className="btn"
                            type="button"
                            variant='contained'
                            style={{ backgroundColor: '#FFF', color: '#000' }}
                            onClick={() => this.setState({
                                edit: false
                            })}
                        >SAVE</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileUser2;