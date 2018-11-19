import React from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Firebase from '../config/firebase';
import Button from '@material-ui/core/Button';
import { browserHistory } from 'react-router';
import Loader from './Loader';
import Snackbar from '@material-ui/core/Snackbar'
import cancelButton from '../images/icons8-delete-26.png'

Modal.setAppElement('#root');
var listOfFixers = JSON.parse(localStorage.getItem('listOfFixers'))

class Categories extends React.Component {

  constructor(props) {
    super(props);
    if (!this.props.route.currentUser) {
      this.state = {
        modalIsOpen: false,
        userData: listOfFixers,
        userUID: localStorage.getItem('userUID'),
        currentUser: JSON.parse(localStorage.getItem('currentUserData')),
        typeOfUser: (this.props.location.state) ? this.props.location.state.typeOfUser : null

      };

    } else {
      this.state = {
        modalIsOpen: false,
        userData: listOfFixers,
        userUID: localStorage.getItem('userUID'),
        currentUser: [],
        typeOfUser: (this.props.location.state) ? this.props.location.state.typeOfUser : null
      }
    }


  }

  render() {
    return (
      <div>
        <Navbar typeOfUser={this.state.typeOfUser} />
        <Tables userData={this.state.userData} typeOfUser={this.state.typeOfUser}
          currentUser={this.state.currentUser} />
      </div>
    );
  }
}



class Tables extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.currentUser.pic) {
      this.state = {
        listOfPeople: this.props.userData,
        userUID: localStorage.getItem('userUID'),
        job: '',
        selectedPerson: [],
        loading: true,
        open: false,
        typeOfUsers: "Search Results: Featured Workers",
        pic: this.props.currentUser.pic,
        fullName: `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`
      };
    } else {
      this.state = {
        listOfPeople: this.props.userData,
        userUID: localStorage.getItem('userUID'),
        job: '',
        selectedPerson: [],
        loading: true,
        open: false,
        typeOfUsers: "Search Results: Featured Workers",
        pic: 'https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png',
        fullName: `Annonymous`
      };
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleClose = this.handleClose.bind(this)
    console.log("categories constructor")
    // this.handleClick("Electrician")
  }
  handleClose = () => {
    this.setState({ open: false })
  }



  handleConnect = (selectedPersonFirstName, selectedPersonLastName, selectedPersonPic, selectedPersonUserUID) => {
    //console.log("handleConnect", selectedPersonFirstName, selectedPersonLastName, selectedPersonPic, selectedPersonUserUID, this.state.pic)
    if (this.state.userUID) {
      var PostRef = Firebase.database()
        .ref(`Users/${this.state.userUID}/Messages`).push()
      var PostRefKey = PostRef.getKey()
      Firebase.database().ref(`Users/${this.state.userUID}/Messages`)
        .push({
          messageKey: PostRefKey,
          name: `${selectedPersonFirstName} ${selectedPersonLastName}`,
          text: "Click here to start chatting",
          profilePicUrl: selectedPersonPic
        })
      Firebase.database().ref(`Users/${selectedPersonUserUID}/Messages`)
        .push({
          messageKey: PostRefKey,
          name: this.state.fullName,
          text: "New Connection",
          profilePicUrl: this.state.pic
        })

        .catch((error) => {
          console.error('Error writing new message to Firebase Database', error);
        });
      //console.log(PostRef.getKey())
      browserHistory.push({
        pathname: '/messages',
        // search: '?the=search',
        state: { messageKey: PostRefKey }
      })
    } else {
      this.setState({ open: true })
    }
  }

  handleCardClick = (selectedPersonUserID) => {
    for (const item in this.state.listOfPeople) {
      // eslint-disable-next-line
      (selectedPersonUserID === this.state.listOfPeople[item].userUID) ? this.setState({
        selectedPerson: this.state.listOfPeople[item],
      }) : null;

    }
    this.openModal();
  };

  openModal() {
    // open and close modal upon clicking
    this.setState({ modalIsOpen: true });
  }
  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }



  handleClick = (value) => {
    console.log('handleClick', value)
    var filterByProfession = []
    for (var y = 0; y < this.props.userData.length; y++) {
      if (this.props.userData[y]["profession"] === value) {
        filterByProfession.push(this.props.userData[y])
      }
    }
    this.setState({
      listOfPeople: filterByProfession
    })

    switch (value) {
      case "Maid": this.setState({
        typeOfUsers: "Search Results: Maids"
      })
        break
      case "Electrician": this.setState({
        typeOfUsers: "Search Results: Electrician"
      })
        break
      case "Carpenter": this.setState({
        typeOfUsers: "Search Results: Carpenters"
      })

        break
      default: this.setState({
        typeOfUsers: "Search Results: Featured Workers",
        listOfPeople: this.props.userData
      })

    }
  }



  render() {
    const { listOfPeople } = this.state;
    const { selectedPerson } = this.state;



    return (
      <div className="row container-fluid justify-content-start mt-4 mb-4">
        <div className="card col-md-2 ml-3 mb-3 d-flex">
          <div className="mt-3 justify-content-start text-center">
            <h5>BROWSE JOBS</h5>
            <hr />
          </div>
          {/* Three sample jobs for demo purposes. list can be as long as desired */}

          <Button
            className="btn  mb-1"
            type="button"
            variant='contained'
            style={{ backgroundColor: '#FFF', color: '#000' }}
            onClick={() => this.handleClick('Maid')}
          >Maid</Button>
          <Button
            className="btn mb-1"
            type="button"
            variant='contained'
            style={{ backgroundColor: '#FFF', color: '#000' }}
            onClick={() => this.handleClick('Electrician')}
          >
            Electrician
            </Button>
          <Button
            className="btn  mb-1"
            type="button"
            variant='contained'
            style={{ backgroundColor: '#FFF', color: '#000' }}
            onClick={() => this.handleClick('Carpenter')}
          >
            Carpenter
            </Button>
          <Button
            className="btn  mb-1"
            type="button"
            variant='contained'
            style={{ backgroundColor: '#FFF', color: '#000' }}
            onClick={() => this.handleClick('All')}
          >All</Button>

        </div>
        <div className="card col ml-3 ">
          <div className="mt-2 mb-1">{this.state.typeOfUsers}</div>
          {/* <div className="input-group mt-3 row justify-content-center ">
           
            <div className="col-5">
              <IntegrationAutosuggest
                lol={this.state.value}
                onClick={() => alert(this.state.value)}
              />
            </div>
            <div className='col-1 ml-4'>
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={() => {
                    const value = document.getElementById('jobInput').value;
                    console.log(document.getElementById('jobInput').value)
                    this.handleClick(value);
                  }}>
                  Go!
                </button>
              </span>
            </div>
          </div> */}
          <div className="row pl-4 justify-content-between mt-4 pr-4">
            {/* {
           listOfPeople.forEach((element,i)=>{
             newArray.push(Object.values(element))
           })

           } */}

            {

              (listOfPeople !== ["empty"]) ? listOfPeople.map((element, i) => (
                <div className="card col-md-5 pt-3 pb-3 mb-4 " key={i}
                  onClick={() => this.handleCardClick(element.userUID)}>
                  <div className="row justify-content-center">
                    <div className="col-md-6 mb-2 text-center">
                      <img
                        className="card-img-top rounded-circle"
                        src={element.pic}
                        style={{ width: 100, height: 100 }}
                        alt={'profile pic'}
                      />
                    </div>
                    <div className="col-md-6  text-align-center">
                      <b>   Name: </b> {`${element.firstName} ${element.lastName}`}<br />

                      <b>  Skills: </b>{(element.skills !== undefined) ? `${
                        element.skills.map((element, i) => (
                          element.label
                        ))
                        }` : null} <br />
                      <b> City:</b> {element.city} <br />

                      {/* <Button className='mt-5' variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                        onClick={() => this.handleCardClick(element.userUID)}>View More</Button> */}
                    </div>

                    {/* Modal when user clicks on a specific person */}
                    {(selectedPerson.firstName !== '' && selectedPerson.lastName !== '' && selectedPerson.age !== ''
                      && selectedPerson.city !== '' && selectedPerson.briefDescription !== '' && selectedPerson.email !== ''
                      && selectedPerson.phoneNumber !== '' && selectedPerson.nrc !== '') ?
                      <Modal
                        isOpen={this.state.modalIsOpen}
                        //style={customStyles}
                        id="modalStyles"
                        contentLabel="Example Modal">
                        <div className="container ">
                          <div className=" row mb-3 justify-content-end"
                          >
                            <img src={cancelButton} alt="cancel button" />
                            {/* <Button

                              type="button"
                              onClick={() => this.setState({
                                modalIsOpen: false
                              })}
                              variant='contained'
                              color="secondary">
                              Cancel</Button> */}
                          </div>
                          <div className="row justify-content-center">

                            <div className="col-md-6">
                              <div>
                                <div className='text-center col mb-2'>
                                  <img
                                    className="rounded-circle"
                                    src={selectedPerson.pic}
                                    style={{ width: 160, height: 160 }}
                                    alt={'profile pic'}
                                  />
                                </div>
                                <div className="col-md-12 col-sm-12 text-center">
                                  <p style={{ fontSize: 24, marginBottom: 0 }}>{`${selectedPerson.firstName} ${selectedPerson.lastName}`}</p>
                                  <p style={{ fontSize: 16, marginBottom: 0 }}>{`${selectedPerson.profession}`}</p>
                                  <p style={{ fontSize: 12, marginBottom: 0 }}>{selectedPerson.city}</p>
                                  <div className='row'>
                                    <div className='col-6'><p>Ratings: 5 Stars</p></div>

                                    <div className='col-6'><p>24 Reviews</p></div>
                                  </div>
                                </div>
                                <div>
                                  {/* <Button className="mt-3" variant='contained'
                                    style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={() => (this.state.userUID) ?
                                      browserHistory.push({
                                        pathname: '/requestservice',
                                        state: {
                                          selectedPersonUserUID: selectedPerson.userUID,
                                          profession: selectedPerson.profession,
                                          selectedPersonFullName: `${selectedPerson.firstName} ${selectedPerson.lastName}`
                                        }
                                      }) : this.setState({
                                        open: true
                                      })}
                                  //this.handleConnect(selectedPerson.firstName, selectedPerson.lastName,
                                  //selectedPerson.pic, selectedPerson.userUID)}
                                  >Request Service</Button> */}
                                  {/* </Link> */}
                                </div>
                              </div>
                              <div className="text-center">
                                <a href="tel:+260967639241" style={{ decoration: 'none' }}>
                                  <Button className="mt-3" variant='contained'
                                    style={{ backgroundColor: '#FFF', color: '#000', width: 200 }}
                                  // onClick={() => }

                                  >Call</Button></a>
                              </div>
                            </div>

                          </div>
                        </div>
                      </Modal> : null}
                  </div>
                </div>
              )) : <Loader />}
          </div>
        </div>
        <Snackbar className="mb-4"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open} //change to this.state.open to show snackbar
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Login first</span>}
        />
      </div >
    );
  }
}

export default Categories;
