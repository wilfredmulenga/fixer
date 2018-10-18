import React from 'react';
import workingIcon from '../images/icons8-work-light-100.png'
import handIcon from '../images/icons8-handshake-100.png'
import workerIcon from '../images/icons8-workers-100.png'
import Navbar from './Navbar';
import facebookIcon from '../images/icons8-facebook-32.png'
import twitterIcon from '../images/icons8-twitter-32.png'
import { browserHistory } from 'react-router';
import landingPage from '../images/landingPage2.jpg'
import Button from '@material-ui/core/Button';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      listOfPeople: ["users"],
      userUID: this.props.route.userUID
    }
    //this.handleLoadUsers = this.handleLoadUsers.bind(this)
    //this.handleLoadUsers()
  }

  // handleLoadUsers = () => {
  //   console.log("handle loaders")
  //   Firebase.database()
  //     .ref('Users/')
  //     .on('value', (snapshot) => {
  //       JobsSnapshot = snapshot.val();
  //       let elements;
  //       // React doesnt accept objects in states so it has to be converted into an array
  //       for (const index in JobsSnapshot) {
  //         elements = JobsSnapshot[index];
  //         peopleArray.push(elements);
  //       }
  //       this.setState({
  //         loading: true,
  //         listOfPeople: peopleArray
  //       })
  //       console.log("home", peopleArray)
  //     });

  // };

  render() {


    return (
      <div>
        <div id="home">
          <Navbar userUID={this.state.userUID} />
          <div id="landingPage" className="col-md-12 col-sm-12">
            <img
              src={landingPage}
              className={'img-fluid'}
              alt="landing page" />
            <div style={{
              position: 'absolute', bottom: 0, width: '100%', height: '70%',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: 40, color: '#fff', float: 'left', marginLeft: '20px', fontStyle: 'oblique' }}>Just what I needed</p></div>

          </div>
          {/* customer/fixer */}
          <div className="text-center">
            <div>
              <h3>Looking for a Fixer</h3>
              <button onClick={() => browserHistory.push({ pathname: '/categories' })}>Join as Customer</button>
            </div>
            <div>
              <h3>Looking to get hired</h3>
              <button onClick={() => browserHistory.push({ pathname: '/viewprofile' })}>Join as Fixer</button>
            </div>
          </div>
          <div >
            <div className="container">
              {/* How it Works section */}
              <div className="mt-5 flex mb-5" style={{ textAlign: 'center' }}>
                <h3 className="titles">How It Works</h3>
                <div className="row d-flex justify-content-between">
                  <div className="col-md-4 col-sm-12 mb-3">
                    <img src={workingIcon} alt="working icon" />
                    <div className="card mt-3">
                      <h5 className="card-title mt-3">I want to get hired</h5>
                      <p className="card-text">
                        Our platform lets people who are not in the formal sector be able to list their skills and services thus opening up the window that has been overlooked by other Job-listing sites. Whether you are a Carpenter, Welder, Barberman, this site will help bring the customers to you.
                </p>
                    </div>
                  </div>
                  <div className=" col-md-4 col-sm-12 mb-3">
                    <img src={workerIcon} alt='worker icon' />
                    <div className='card mt-3'>
                      <h5 className="card-title mt-3">I want to hire someone</h5>
                      <p className="card-text">
                        Looking for a good hairdresser but just don't know where to look. Or maybe your Kitchen needs some remodeling. Our platform lists the very best professionals in the informal job sector, skilled for the job you may require. Feel free to browse through our category section to get started.
                </p>
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12 mb-3">
                    <img src={handIcon} alt="hand icon" />
                    <div className="card mt-3">
                      <h5 className="card-title mt-3">I want to be a Partner</h5>
                      <p className="card-text">
                        We are always looking for ways to improve our platform and from new angles or ideas. We feel that people with informal jobs could use a platform that is taylored specifically for them to showcase their work. If you share the same passion as well do, we would be happy to hear from you.
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact */}
            <div style={{ backgroundColor: '#343a40', color: 'white', marginTop: '100px ' }} >

              <div className="container pt-3 pb-3">
                {/* <div className='text-center'><h3>Get in touch with us</h3></div> */}
                <div className="row justify-content-between">
                  <div className="col-md-5 align-items-center">

                    <h4 className="mb-3">Contact</h4>
                    <h5>Email: info@fixer-app.co</h5>
                    <h5>Phone: 0979622855</h5>
                    {/* <h5>Address:</h5> */}

                  </div>
                  <div className="col-md-5">
                    <h4 className="mb-3">Social Media</h4>
                    <div className="justify-content-between">
                      <a href='https://web.facebook.com/FixerApp/?__xts__%5B0%5D=68.ARAhajZ5_xxcGPxF9I3hKsPez_rEai7f0oFA9T6zv7MOExER-gNR2H5PWh8wOAETh8NHRsE2PjBsbV9fcAkCE8imrlznsQJoIN7w_Z3n5EZsMYiEnq7rD9TaAUi6cLrOCebHBPLLzxS51ZpsVedkffBuzIpH4q7i3_h-p3tdlsUaj_0VKCT1JA&__tn__=-UK-R' >  <img src={facebookIcon} alt="twitter icon" /></a>
                      <a href="https://twitter.com/fixer_app"><img src={twitterIcon} alt="twitter icon" /></a>
                      {/* <img src={instagramIcon} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >)
  }

}


export default Home;
