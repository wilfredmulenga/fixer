import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './styles/App.scss';
import Categories from './components/Categories';
import Home from './components/Home';
import Messages from './Messages/Messages';
import MessagesMobile from './Messages/MessagesMobile';
import ChatHistoryMobile from './Messages/ChatHistoryMobile';
import UpdateProfile from './Accounts/UpdateProfile';
import Loader from './components/Loader'
// eslint-disable-next-line
import jsonData from './database/fixer-test-export.json'
import PhoneLogin from './components/PhoneLogin'
import PrivacyPolicy from './components/PrivacyPolicy'
import RequestService from './components/RequestedServices2'
import Firebase from './config/firebase';
import Profile from './Accounts/Profile';
//import ProfileUser from './Accounts/User/ProfileUser';
import UpdateProfileUser from './Accounts/User/UpdateProfileUser';
import ProfileFixer from './Accounts/Fixer/ProfileFixer';
import UpdateProfileFixer from './Accounts/Fixer/UpdateProfileFixer';
import Fixer from './components/Fixer';
import ProfileUser2 from './Accounts/User/ProfileUser2';
import GiveReview from './components/GiveReview';
import ViewProfileUser from './Accounts/User/ViewProfileUser';
import ViewRequestServicesFixer from './Accounts/Fixer/ViewRequestServicesFixer'

var listOfFixers = [];
var userUID;
//= 'O29nIFjBn8N6U2Kh9eXMyXwGN5B3'
var JobsSnapshot;

//check which type of user 
var typeOfUser = localStorage.getItem('typeOfUser');
if (typeOfUser === 'user') {
  typeOfUser = 'Users'
} else {
  typeOfUser = 'Fixers'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listOfPeople: []
    }
    this.handleLoadUsers = this.handleLoadUsers.bind(this)
    this.handleDataLoad = this.handleDataLoad.bind(this)
    this.handleCurrentUserDataLoad = this.handleCurrentUserDataLoad.bind(this)
    this.handleLoadUsers()
    this.handleDataLoad()
    this.handleCurrentUserDataLoad()
  }
  handleCurrentUserDataLoad = () => {
    var fixerUserProfile = jsonData['Users']['gHayewR0vKPEcmFIMuaoboYeBGZ2']
    localStorage.setItem('currentUserData', JSON.stringify(fixerUserProfile))
  }

  handleDataLoad = () => {
    JobsSnapshot = jsonData['Fixers'];
    let elements;
    for (const index in JobsSnapshot) {
      elements = JobsSnapshot[index]
      if (elements.profession != null) {
        listOfFixers.push(elements);
      }
    }
    //save list of fixers as json to localStorage
    localStorage.setItem('listOfFixers', JSON.stringify(listOfFixers))
    // currentUser = JSON.parse(localStorage.getItem('listOfFixers'))[2]
  }


  handleLoadUsers = () => {

    //get current user data
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //handleLoadUsers()
        userUID = user.uid
        //save current user's userUID to localStorage
        localStorage.setItem('userUID', "gHayewR0vKPEcmFIMuaoboYeBGZ2")
        // Firebase.database()
        //   .ref(`${typeOfUser}/${userUID}`)
        //   .once('value', (snapshot) => {
        //     currentUser.push(snapshot.val())
        //   })
      } else {

        // this.setState({
        //   loading: true,
        //   listOfPeople: peopleArray
        // })

        browserHistory.push('/')

      }
    })

    //fectch data of fixers
    // let peopleArray = []
    // Firebase.database()
    //   .ref(`Fixers`)
    //   .once('value', (snapshot) => {
    //     JobsSnapshot = snapshot.val();
    //     let elements;
    //     // React doesnt accept objects in states so it has to be converted into an array
    //     for (const index in JobsSnapshot) {
    //       elements = JobsSnapshot[index];
    //       if (elements.profession != null) {
    //         peopleArray.push(elements);
    //       }
    //     }
    //     this.setState({
    //       loading: true,
    //       // listOfPeople: peopleArray,
    //     });
    //     localStorage.setItem('listOfFixers', JSON.stringify(peopleArray))
    //   });
  }
  render() {

    if (this.state.loading) {
      return (

        < Router history={browserHistory} >
          <Route path="/" component={Home} />
          <Route path="/categories" component={Categories} />
          <Route path="/privacypolicy" component={PrivacyPolicy} />
          <Route path="/updateprofile" component={UpdateProfile} />
          <Route path="/messages" component={Messages} />
          <Route path='/profile' component={Profile} />
          <Route path='/phonelogin' component={PhoneLogin} />
          <Route path='/messagesmobile' component={MessagesMobile} />
          <Route path='/chathistorymobile' component={ChatHistoryMobile} />
          <Route path='/requestservice' component={RequestService} />
          <Route path='/user/profile' component={ProfileUser2} />
          <Route path='/user/updateprofile' component={UpdateProfileUser} />
          <Route path='/fixer/profile' component={ProfileFixer} />
          <Route path='/fixer/updateprofile' component={UpdateProfileFixer} />
          <Route path='/fixer' component={Fixer} />
          <Route path='/givereview' component={GiveReview} />
          <Route path='/givereview' component={GiveReview} />

        </Router >

      );
    } else {
      return (<Loader />)
    }
  }
}

export default App;