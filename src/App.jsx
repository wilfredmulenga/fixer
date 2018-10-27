import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './styles/App.css';
import Categories from './components/Categories';
import Home from './components/Home';
import Messages from './Messages/Messages';
import MessagesMobile from './Messages/MessagesMobile';
import ChatHistoryMobile from './Messages/ChatHistoryMobile';
import UpdateProfile from './Accounts/UpdateProfile';
import SignIn from './Accounts/SignIn'
import SignUp from './Accounts/SignUp'
import Loader from './components/Loader'
// eslint-disable-next-line
import jsonData from './database/fixer-test-export.json'
import PhoneLogin from './Accounts/PhoneLogin'
import PrivacyPolicy from './components/PrivacyPolicy'
import RequestService from './components/RequestService'
import ContactUs from './components/ContactUs'
import Firebase from './config/firebase';
import Profile from './Accounts/Profile';
import ProfileUser from './Accounts/User/ProfileUser';
import UpdateProfileUser from './Accounts/User/UpdateProfileUser';
import ProfileFixer from './Accounts/Fixer/ProfileFixer';
import UpdateProfileFixer from './Accounts/Fixer/UpdateProfileFixer'

var peopleArray = [];
var currentUser = [];
var userUID;
//= 'O29nIFjBn8N6U2Kh9eXMyXwGN5B3'
var JobsSnapshot;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      listOfPeople: []
    }
    this.handleLoadUsers = this.handleLoadUsers.bind(this)
    //this.handleDataLoad = this.handleDataLoad.bind(this)
    this.handleLoadUsers()
    //this.handleDataLoad()
  }
  handleLoadUsers = () => {
    //check which type of user 
    var typeOfUser = localStorage.getItem('typeOfUser');
    if (typeOfUser === 'user') {
      typeOfUser = 'Users'
    } else {
      typeOfUser = 'Fixers'
    }
    //get current user data
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //handleLoadUsers()
        userUID = user.uid
        // console.log("current user", userUID)
        Firebase.database()
          .ref(`${typeOfUser}/${userUID}`)
          .once('value', (snapshot) => {
            currentUser.push(snapshot.val())
          })
      } else {

        // this.setState({
        //   loading: true,
        //   listOfPeople: peopleArray
        // })

        browserHistory.push('/')

      }
    })

    //fectch data of fixers
    Firebase.database()
      .ref(`Fixers`)
      .once('value', (snapshot) => {
        JobsSnapshot = snapshot.val();
        let elements;
        // React doesnt accept objects in states so it has to be converted into an array
        for (const index in JobsSnapshot) {
          elements = JobsSnapshot[index];
          if (elements.profession != null) {
            peopleArray.push(elements);
          }
        }
        this.setState({
          loading: true,
          listOfPeople: peopleArray,
        });
      });
  }
  render() {

    if (this.state.loading) {
      return (

        < Router history={browserHistory} >
          <Route path="/" component={Home} userUID={userUID} />
          <Route path="/categories" component={Categories} userData={peopleArray} userUID={userUID} currentUser={currentUser} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/privacypolicy" component={PrivacyPolicy} />
          <Route path="/updateprofile" component={UpdateProfile} userData={currentUser} userUID={userUID} />
          <Route path="/messages" component={Messages} userUID={userUID} />
          <Route path='/profile' component={Profile} userData={currentUser} userUID={userUID} />
          <Route path='/phonelogin' component={PhoneLogin} userUID={userUID} />
          <Route path='/messagesmobile' component={MessagesMobile} userUID={userUID} />
          <Route path='/chathistorymobile' component={ChatHistoryMobile} userUID={userUID} />
          <Route path='/requestservice' component={RequestService} userUID={userUID} userData={currentUser} />
          <Route path='/user/profile' component={ProfileUser} userData={currentUser} userUID={userUID} />
          <Route path='/user/updateprofile' component={UpdateProfileUser} userData={currentUser} userUID={userUID} />
          <Route path='/fixer/profile' component={ProfileFixer} userData={currentUser} userUID={userUID} />
          <Route path='/fixer/updateprofile' component={UpdateProfileFixer} userData={currentUser} userUID={userUID} />
          <Route path='/contactus' component={ContactUs} />
        </Router >

      );
    } else {
      return (<Loader />)
    }
  }
}

export default App;