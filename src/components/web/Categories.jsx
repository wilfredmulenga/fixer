import React from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import { browserHistory } from 'react-router';
import Loader from './Loader';
import Snackbar from '@material-ui/core/Snackbar'
import starFilled from '../../images/icons8-star-filled-7.png';
import starOutlined from '../../images/icons8-star-7.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


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
    this.typeOfFixer = this.typeOfFixer.bind(this);
    this.fixerLocation = this.fixerLocation.bind(this)
  }

  //type of fixer selection
  typeOfFixer = (event) => {
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
  //fixer location
  fixerLocation = (event) => {
    let filterByProfession = []
    for (let y = 0; y < this.state.listOfFixers.length; y++) {
      if (this.state.listOfFixers[y]["location"] === event.target.value) {
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
        <div style={{ height: '100vh', backgroundColor: '#0dbab1', paddingLeft: 10 }} className="row  container-fluid justify-content-center pt-4 ">
          <div className=" col-md-3 ml-3">
            <Card >
              <CardContent style={{ paddingLeft: 10 }} className="mt-3 justify-content-start text-center">
                <h5>FILTER</h5>
                <hr />
                <select
                  className="form-control mb-3"
                  id="professionSelect"
                  onChange={this.typeOfFixer}>
                  <option disabled selected>by Trade</option>
                  <option value={'Maid'}>Maid</option>
                  <option value={'Electrician'}>Electrician</option>
                  <option value={'Carpenter'}>Carpenter</option>

                </select>
                <select
                  className="form-control mb-3"
                  id="professionSelect"
                  onChange={this.fixerLocation}>
                  <option disabled selected>by Location</option>
                  <option value={'Woodlands'}>Woodlands</option>
                  <option value={'Kabulonga'}>Kabulonga</option>
                  <option value={'Roma'}>Roma</option>
                </select>
              </CardContent>

            </Card>
          </div>
          <div className="col ml-3 ">
            {/* <div className="mt-2 mb-1">{this.state.typeOfUsers}</div> */}

            <div className="row pl-4 justify-content-start pr-4">


              {

                (filteredFixers !== ["empty"]) ? filteredFixers.map((element, i) => (
                  <Card className=" col-md-5 pt-3 pb-3 mb-4  mr-4" key={i}
                    onClick={() =>
                      (userUID === null) ? this.setState({
                        open: true
                      }) :
                        this.handleCardClick(element.userUID)}>
                    <CardContent>
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-4 mb-2 text-center">
                          <img
                            className="card-img-top rounded-circle"
                            src={element.pic}
                            style={{ width: 100, height: 100 }}
                            alt={'profile pic'}
                          />
                        </div>
                        <div className="col-md-7  text-align-center">
                          <b>   Name: </b> {`${element.firstName} ${element.lastName}`}<br />

                          <b>  Skills: </b>{(element.skills !== undefined) ? `${
                            element.skills.map((element, i) => (
                              element.label
                            ))
                            }` : null} <br />
                          <b> Location:</b> {element.location} <br />

                          {/* <Button className='mt-5' variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                        onClick={() => this.handleCardClick(element.userUID)}>View More</Button> */}
                        </div>

                        {/* Modal when user clicks on a specific person */}

                      </div>
                    </CardContent>
                  </Card>
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

      </div >
    );
  }
}

export default Categories;
