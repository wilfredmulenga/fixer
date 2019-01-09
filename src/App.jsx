import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './styles/App.scss';
//components for mobile
import CategoriesMobile from './components/mobile/Categories';
import HomeMobile from './components/mobile/Home';
// eslint-disable-next-line
import jsonData from './database/fixer-test-export.json'
import PhoneLoginMobile from './components/mobile/PhoneLogin'
import PrivacyPolicyMobile from './components/mobile/PrivacyPolicy'
import RequestServiceMobile from './components/mobile/RequestedServices2'
import Firebase from './config/firebase';
import UpdateProfileUserMobile from './components/mobile/UpdateProfileUser';
import ProfileFixerMobile from './components/mobile/ProfileFixer'
import UpdateProfileFixerMobile from './components/mobile/UpdateProfileFixer';
import FixerMobile from './components/mobile/Fixer';
import ProfileUser2Mobile from './components/mobile/ProfileUser2';
import GiveReviewMobile from './components/mobile/GiveReview';
//components for web
import CategoriesWeb from './components/web/Categories';
import HomeWeb from './components/web/Home';
import PhoneLoginWeb from './components/web/PhoneLogin'
import PrivacyPolicyWeb from './components/web/PrivacyPolicy'
import RequestServiceWeb from './components/web/RequestedServices2'
import UpdateProfileUserWeb from './components/web/UpdateProfileUser';
import ProfileFixerWeb from './components/web/ProfileFixer'
import UpdateProfileFixerWeb from './components/web/UpdateProfileFixer';
import FixerWeb from './components/web/Fixer';
import ProfileUser2Web from './components/web/ProfileUser2';
import GiveReviewWeb from './components/web/GiveReview';
import Media from 'react-media'
import Loader from './components/mobile/Loader'


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
          <Media query="(max-width:480px)"
            render={() =>
              < Router history={browserHistory} >
                <Route path="/" component={HomeMobile} />
                <Route path="/categories" component={CategoriesMobile} />
                <Route path="/privacypolicy" component={PrivacyPolicyMobile} />
                <Route path='/phonelogin' component={PhoneLoginMobile} />
                <Route path='/requestservice' component={RequestServiceMobile} />
                <Route path='/user/profile' component={ProfileUser2Mobile} />
                <Route path='/user/updateprofile' component={UpdateProfileUserMobile} />
                <Route path='/fixer/profile' component={ProfileFixerMobile} />
                <Route path='/fixer/updateprofile' component={UpdateProfileFixerMobile} />
                <Route path='/fixer' component={FixerMobile} />
                <Route path='/givereview' component={GiveReviewMobile} />
              </Router >
            } />
          <Media query="(min-width:481px)"
            render={() =>
              < Router history={browserHistory} >
                <Route path="/" component={HomeWeb} />
                <Route path="/categories" component={CategoriesWeb} />
                <Route path="/privacypolicy" component={PrivacyPolicyWeb} />
                <Route path='/phonelogin' component={PhoneLoginWeb} />
                <Route path='/requestservice' component={RequestServiceWeb} />
                <Route path='/user/profile' component={ProfileUser2Web} />
                <Route path='/user/updateprofile' component={UpdateProfileUserWeb} />
                <Route path='/fixer/profile' component={ProfileFixerWeb} />
                <Route path='/fixer/updateprofile' component={UpdateProfileFixerWeb} />
                <Route path='/fixer' component={FixerWeb} />
                <Route path='/givereview' component={GiveReviewWeb} />
              </Router >
            } />
        </div>
      );
    } else {
      return (<Loader />)
    }
  }
}

export default App;