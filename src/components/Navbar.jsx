import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';
import jsonData from '../database/fixer-test-export.json'

var listOfFixers = JSON.parse(localStorage.getItem('listOfFixers'))

Modal.setAppElement('#root');
class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  handleOnClick = () => {
    localStorage.setItem('typeOfUser', 'fixer')
    var fixerUserProfile = jsonData['Fixers']['O29nIFjBn8N6U2Kh9eXMyXwGN5B3']
    localStorage.setItem('currentUserData', JSON.stringify(fixerUserProfile))
    //when "Become a Fixer" button is pressed, if user already has info, 
    //takes them to their profile, if they dont, it sends them to update profile
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid)
        for (var y = 0; y < listOfFixers.length; y++) {
          if (listOfFixers[y]["userUID"] === user.uid) {

            browserHistory.push({
              pathname: '/fixer/profile'
            })
          } else {
            browserHistory.push({
              pathname: '/fixer/updateprofile'
            })
          }
        }

      } else {
        localStorage.setItem('typeOfUser', 'fixer')
        browserHistory.push({
          pathname: '/phonelogin'
        })
      }
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
              <li className="nav-item active mr-3">

                {(localStorage.getItem('userUID') !== null) ? <Link to="/user/profile" style={{ color: "#fff" }} className="link">Profile</Link> : null}
                {/* {(localStorage.getItem('typeOfUser') === 'fixer') ? <Link to="/fixer/profile" style={{ color: "#fff" }} className="link">Profile</Link> : null} */}
              </li>
              <li className="nav-item active mr-3">
                {(localStorage.getItem('userUID') !== null) ? <Link to="/requestservice" style={{ color: "#fff" }} className="link">Requested Services</Link> : null}
              </li>
              <li className="nav-item active mr-3">
                <Link to="/phonelogin" style={{ color: "#fff" }} className="link">{(localStorage.getItem('userUID') !== 'null') ? `Logout` : `Login`}</Link>
              </li>
            </ul>


            <button className="btn link my-2 my-sm-0"
              onClick={() => this.handleOnClick()}
            >Become A Fixer</button>

          </div>
        </nav>
        {/* Currently under testing notice */}
        <div className="alert alert-warning text-center" style={{ marginBottom: 0 }} role="alert" >
          This application is currently under testing. Feel free to give us feedback at < Link to='/contactus' > suppport@myfixerapp.com</Link >
        </div >
      </div >
    );
  }
}

export default Navbar;



