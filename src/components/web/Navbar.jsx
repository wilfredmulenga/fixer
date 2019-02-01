import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


var userUID = localStorage.getItem('userUID')
console.log('navbar', userUID)
Modal.setAppElement('#root');
class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      fullName: '',
      profession: '',
      phoneNumber: '',
      emailAddress: '',
      showError: false,
      submitSuccess: false,
      tryAgain: false,
      showButton: (this.props.showButton === undefined) ? true : false
    }

    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    console.log('userUID', typeof userUID, userUID)
  }
  handleSubmit = () => {
    if ((this.state.fullName !== '') && (this.state.profession !== '') &&
      (this.state.profession !== '') && (this.state.emailAddress !== '')) {

      this.setState({
        submitSuccess: true,
        openModal: false
      })
    } else {
      this.setState({
        showError: true
      })
    }

  }

  handleInputChange = (event) => {

    switch (event.target.id) {
      case 'fullName':
        this.setState({
          fullName: event.target.value,
        })
        break;
      case 'profession':
        this.setState({
          profession: event.target.value,
        })
        break;
      case 'phoneNumber':
        this.setState({
          phoneNumber: event.target.value,
        })
        break;
      case 'emailAddress':
        this.setState({
          emailAddress: event.target.value,
        })
        break;
      default:
    }
  }
  handleOnClick = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }
  render() {
    return (
      <div id="navbar" >
        <nav style={{ backgroundColor: '#007470' }} className="navbar navbar-expand-md navbar-light">
          <Link to="/" className="navbar-brand link" style={{
            lineHeight: '1.3', fontSize: '23px', color: '#FFF',
            letterSpacing: 'normal', fontWeight: 'bold', textTransform: 'capitalize'
          }}>
            {/* <img src={brandImage} width="30" height="30" class="d-inline-block align-top" alt=""></img> */}
            Fixer
          </Link>
          <button className=" navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto ">

              <li className="nav-item active mr-3">
                <Link to="/categories" style={{ color: "#fff" }} className="link">Categories</Link>
              </li>
              {(userUID !== 'null') ? <li className="nav-item active mr-3"> <Link to="/user/profile" style={{ color: "#fff" }} className="link">Profile</Link>  </li> : null}
              {/* {(localStorage.getItem('typeOfUser') === 'fixer') ? <Link to="/fixer/profile" style={{ color: "#fff" }} className="link">Profile</Link> : null} */}
              {(userUID !== 'null') ? <li className="nav-item active mr-3"> <Link to="/requestservice" style={{ color: "#fff" }} className="link">Requested Services</Link>  </li> : null}
              <li className="nav-item active mr-3">
                <Link to="/phonelogin" style={{ color: "#fff" }} className="link">{(userUID === 'null') ? `Login` : `Logout`}</Link>
              </li>
            </ul>


            {(this.state.showButton) ? <button className="btn link my-2 my-sm-0"
              onClick={() => this.handleOnClick()}
            >Become A Fixer</button> : null}

          </div>
        </nav>
        {/* Currently under testing notice */}
        {/* <div className="alert alert-warning text-center" style={{ marginBottom: 0 }} role="alert" >
          This application is currently under testing. Feel free to give us feedback at < Link to='/contactus' > suppport@myfixerapp.com</Link >
        </div > */}
        <Modal
          style={customStyles}
          isOpen={this.state.openModal}

        >
          <div className='row justify-content-center' >
            <div className='col-md-8'   >
              <h5 className='greenText mb-3'>Become a Fixer</h5>
              <TextField
                id="fullName"
                label="Full Name"
                fullWidth
                value={this.state.fullName}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <TextField
                id="profession"
                label="Profession"
                fullWidth
                value={this.state.profession}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <TextField
                id="phoneNumber"
                label="Phone Number"
                fullWidth
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <TextField
                id="emailAddress"
                label="Email Address"
                fullWidth
                value={this.state.emailAddress}
                onChange={this.handleInputChange}
                margin="normal"
              />
              {/* <input style={{ width: '90%' }} className='mb-1' type="text" placeholder='full name' value={this.state.fullName} onChange={this.handleInputChange}></input>
              <input style={{ width: '90%' }} className='mb-1' type="text" placeholder='profession' value={this.state.profession} onChange={this.handleInputChange}></input>
              <input style={{ width: '90%' }} className='mb-1' type='text' placeholder='phone number' value={this.state.phoneNumber} onChange={this.handleInputChange}></input>
              <input style={{ width: '90%' }} className='mb-1' type='email' placeholder='email address' value={this.state.emailAddress} onChange={this.handleInputChange}></input> */}
            </div>


          </div>
          <div>
            {(this.state.showError) ? <p style={{ color: 'red' }}>Please input all fields</p> : null}
          </div>
          <div className='align-self-end mt-5'>
            <div className='row justify-content-around '>
              <Button className="btn  mb-1"
                type="button"
                variant='contained'
                style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.setState({
                  openModal: false
                })}>Close</Button>
              <Button className="btn  mb-1"
                type="button"
                variant='contained'
                style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.handleSubmit()}>Submit</Button>
            </div>
          </div>
        </Modal>
        <Modal
          style={customStyles}
          isOpen={this.state.submitSuccess}>
          <div style={{ height: '100%' }} className='row container-fluid justify-content-center align-items-center'>
            <h5 className='mb-5 greenText'>Thank you for signing up! Our Fixer Team will be in contact soon.</h5>
            <Button className="btn  mb-1"
              type="button"
              variant='contained'
              style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.setState({
                submitSuccess: false
              })}>Close</Button>
          </div>
        </Modal>
        <Modal
          style={customStyles}
          isOpen={this.state.tryAgain}>
          <div style={{ height: '100%' }} className='row container-fluid justify-content-center align-items-center'>
            <h5 className='mb-5 greenText'>Ooops! something went wrong. Please try again</h5>
            <Button className="btn  mb-1"
              type="button"
              variant='contained'
              style={{ backgroundColor: '#FFF', color: '#000' }} onClick={() => this.setState({
                submitSuccess: false,
                openModal: true
              })}>Retry</Button>
          </div>
        </Modal>
      </div >

    );
  }
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '80vh',
    textAlign: 'center'
  }
};

export default Navbar;



