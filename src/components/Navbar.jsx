import React from 'react';
import { Link } from 'react-router';
import Firebase from '../config/firebase';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import brandImage from '../images/fixer-logo-v3.jpg'


let loginStatus

Modal.setAppElement('#root');
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userUID: this.props.userUID
    }
    this.handleSignOut = this.handleSignOut.bind(this);

  }

  handleSignOut() {
    Firebase.auth().signOut();
    this.setState({
      signOutModalIsOpen: false,
      signInModalIsOpen: true
    })

  }

  render() {
    return (
      <div id="navbar">
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <Link to="/" className="navbar-brand link" style={{
            lineHeight: '1.3', fontSize: '23px',
            letterSpacing: 'normal', fontWeight: 'bold', textTransform: 'capitalize'
          }}>
            {/* <img src={brandImage} width="30" height="30" class="d-inline-block align-top" alt=""></img> */}
            Fixer
         </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto ">

              <li className="nav-item active mr-3">
                <Link to="/categories" className="link">Categories</Link>
              </li>
              {/* <Link to="/login" className="link" //onClick={this.props.action} 
  onClick={this.openSignInModal}>
  <li className="nav-item active mr-3" id='login'>{
    (loginStatus) ? `Sign Out` : `Sign In`
  }
  </li>
</Link> */}
              <li className="nav-item active mr-3">
                <Link to="/profile" className="link">Profile</Link>
              </li>
              <li className="nav-item active mr-3">
                <Link to="/phonelogin" className="link">{(this.state.userUID) ? `Logout` : `Login`}</Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* Navbar section */}

      </div >
    );
  }
}

export default Navbar;
