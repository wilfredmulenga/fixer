import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './styles/App.scss';
import jsonData from './database/fixer-test-export.json'
import Firebase from './config/firebase';
import Categories from './components/Categories';
import Home from './components/Home';
import PhoneLogin from './components/PhoneLogin'
import PrivacyPolicy from './components/PrivacyPolicy'
import RequestService from './components/RequestedServices2'
import UpdateProfileUser from './components/UpdateProfileUser';
import ProfileFixer from './components/ProfileFixer'
import UpdateProfileFixer from './components/UpdateProfileFixer';
import Fixer from './components/Fixer';
import ProfileUser from './components/ProfileUser2';
import GiveReview from './components/GiveReview';
import Loader from './components/Loader'


var listOfFixers = [];
var userUID;
//= 'O29nIFjBn8N6U2Kh9eXMyXwGN5B3'
var JobsSnapshot;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listOfPeople: []
    }
    this.handleLoadUsers = this.handleLoadUsers.bind(this)
    this.handleDataLoad = this.handleDataLoad.bind(this)
    this.handleLoadUsers()
    // this.handleDataLoad()

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
        localStorage.setItem('userUID', userUID)
        Firebase.database()
          .ref(`Users/${userUID}`)
          .once('value', (snapshot) => {
            return snapshot
          }).then((snapshot) => {
            if (snapshot !== null) { localStorage.setItem('currentUserData', JSON.stringify(snapshot.val())) }
          })

      } else {
        browserHistory.push('/')
      }
    })

    //fectch data of fixers
    let peopleArray = []
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
          // listOfPeople: peopleArray,
        });
        localStorage.setItem('listOfFixers', JSON.stringify(peopleArray))
      });
  }
  render() {

    if (this.state.loading) {
      return (
        <div>
          < Router history={browserHistory} >
            <Route path="/" component={Home} />
            <Route path="/categories" component={Categories} />
            <Route path="/privacypolicy" component={PrivacyPolicy} />
            <Route path='/phonelogin' component={PhoneLogin} />
            <Route path='/requestservice' component={RequestService} />
            <Route path='/user/profile' component={ProfileUser} />
            <Route path='/user/updateprofile' component={UpdateProfileUser} />
            <Route path='/fixer/profile' component={ProfileFixer} />
            <Route path='/fixer/updateprofile' component={UpdateProfileFixer} />
            <Route path='/fixer' component={Fixer} />
            <Route path='/givereview' component={GiveReview} />
          </ Router>
        </div>
      );
    } else {
      return (<Loader />)
    }
  }
}

export default App;