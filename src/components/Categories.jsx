import React from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Button from '@material-ui/core/Button';
import { browserHistory } from 'react-router';
import Loader from './Loader';
import Snackbar from '@material-ui/core/Snackbar'
import Media from 'react-media';
import starFilled from '../images/icons8-star-filled-7.png';
import starOutlined from '../images/icons8-star-7.png';


Modal.setAppElement('#root');
var listOfFixers = JSON.parse(localStorage.getItem('listOfFixers'))
var userUID = localStorage.getItem('userUID')

class Categories extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      listOfFixers: listOfFixers,
      filteredFixers: listOfFixers,
      userUID: localStorage.getItem('userUID'),
      currentUser: JSON.parse(localStorage.getItem('currentUserData')),
      typeOfUser: (this.props.location.state) ? this.props.location.state.typeOfUser : null,
      job: '',
      selectedPerson: [],
      loading: true,
      open: false,
      typeOfUsers: "Search Results: Featured Workers",
      pic: 'https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png',
      fullName: `Annonymous`,

    }

    this.handleClick = this.handleClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.starsCount = this.starsCount.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  //for menu
  handleMenuClick = (event) => {
    let filterByProfession = []
    for (let y = 0; y < this.state.listOfFixers.length; y++) {
      if (this.state.listOfFixers[y]["profession"] === event.target.value) {
        filterByProfession.push(this.state.listOfFixers[y])
      }
    }
    this.setState({
      filteredFixers: filterByProfession
    })
  }
  //show rating stars
  starsCount = (rating) => {
    let stars = []
    for (var i = 1; i < 6; i++) {
      let starType = starFilled
      if (i > rating) {
        starType = starOutlined
      }
      stars.push(<img alt='star' src={starType} />)
    }
    return stars
  }
  handleCardClick = (userUID) => {
    console.log("clicked")
    let fixerProfile = []
    for (var y = 0; y < listOfFixers.length; y++) {
      if (listOfFixers[y]["userUID"] === userUID) {
        fixerProfile.push(listOfFixers[y])
      }
    }
    browserHistory.push({
      pathname: '/fixer',
      state: { 'fixerProfile': fixerProfile }
    })
    // console.log(fixerProfile)
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
  handleClose = () => {
    this.setState({ open: false })
  }

  handleClick = (value) => {
    console.log('handleClick', value)
    var filterByProfession = []
    for (var y = 0; y < this.state.listOfFixers.length; y++) {
      if (this.state.listOfFixers[y]["profession"] === value) {
        filterByProfession.push(this.state.listOfFixers[y])
      }
    }
    this.setState({
      filteredFixers: filterByProfession
    })
    console.log(filterByProfession)

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
        filteredFixers: this.state.listOfFixers
      })

    }



  }



  render() {
    const { filteredFixers } = this.state

    return (
      <div>
        <Navbar />
        <Media query="(max-width:375px)"
          render={() =>
            <div>
              {/* Menu */}

              <div className="container-fluid mt-2 mb-3">
                <select
                  className="form-control mb-3"
                  id="professionSelect"
                  onChange={this.handleMenuClick}>
                  <option value={'Maid'}>Maid</option>
                  <option value={'Electrician'}>Electrician</option>
                  <option value={'Carpenter'}>Carpenter</option>

                </select>
              </div>
              {/* list of fixers */}
              <div className="container-fluid">  {

                (filteredFixers !== ["empty"]) ? filteredFixers.map((element, i) => (
                  <div className="card col-md-5 pt-3 pb-3 mb-3 " key={i}
                    onClick={() =>
                      this.handleCardClick(element.userUID)}>
                    <div key={i} className="row justify-content-center">
                      <div key={i} className="col-4 mb-2 text-center">
                        <img
                          className="card-img-top rounded-circle"
                          src={element.pic}
                          style={{ width: 68, height: 68 }}
                          alt={'profile pic'}
                        />
                      </div>
                      <div className="col-8 text-align-center">
                        <b>   Name: </b> {`${element.firstName} ${element.lastName}`}<br />
                        <b>Rating:</b>   {this.starsCount(element.rating)}<br />
                        <b>  Skills: </b>{(element.skills !== undefined) ? `${
                          element.skills.map((element, i) => (
                            element.label
                          ))
                          }` : null} <br />
                        <b> City:</b> {element.city} <br />
                      </div>
                    </div>
                  </div>
                )) : <Loader />}
              </div>
            </div>
          } />
        <Media query="(min-width: 376px)"
          render={() =>
            <div style={{ height: '100vh', backgroundColor: '#0dbab1', paddingLeft: 10 }} className="row  justify-content-start pt-4 ">
              <div className="card col-md-2 ml-3  d-flex">
                <div style={{ paddingLeft: 10 }} className="mt-3 justify-content-start text-center">
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

                <div className="row pl-4 justify-content-between mt-4 pr-4">


                  {

                    (filteredFixers !== ["empty"]) ? filteredFixers.map((element, i) => (
                      <div className="card col-md-5 pt-3 pb-3 mb-4 " key={i}
                        onClick={() =>
                          (userUID === null) ? this.setState({
                            open: true
                          }) :
                            this.handleCardClick(element.userUID)}>
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
            </div >} />

      </div >
    );
  }
}

export default Categories;
