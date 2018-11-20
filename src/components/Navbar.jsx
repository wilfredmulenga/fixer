import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Firebas from '../config/firebase'
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';

Modal.setAppElement('#root');
class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  handleOnClick = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        browserHistory.push({
          pathname: '/fixer/profile'
        })
      } else {
        browserHistory.push({
          pathname: '/phonelogin'
        })
      }
    })
  }
  render() {
    return (
      <div id="navbar" >
        <nav className="navbar navbar-expand-md navbar-light">
          <Link to="/" className="navbar-brand link" style={{
            lineHeight: '1.3', fontSize: '23px',
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
                <Link to="/categories" className="link">Categories</Link>
              </li>
              <li className="nav-item active mr-3">

                {(localStorage.getItem('typeOfUser') === 'user') ? <Link to="/user/profile" className="link">Profile</Link> : null}
                {(localStorage.getItem('typeOfUser') === 'fixer') ? <Link to="/fixer/profile" className="link">Profile</Link> : null}
              </li>
              <li className="nav-item active mr-3">
                <Link to="/phonelogin" className="link">{(localStorage.getItem('userUID') !== 'null') ? `Logout` : `Login`}</Link>
              </li>
            </ul>


            <button className="btn link my-2 my-sm-0"
              onClick={() => this.handleOnClick()}
            >Become A Fixer</button>

          </div>
        </nav>
        {/* Currently under testing notice */}
        <div className="alert alert-warning text-center" style={{ marginBottom: 0 }} role="alert" >
          This application is currently under testing.Feel free to give us feedback at < Link to='/contactus' > info@fixer-app.co</Link >
        </div >
      </div >
    );
  }
}

export default Navbar;



