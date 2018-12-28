import React from 'react';
import Navbar from './Navbar';
import facebookIcon from '../images/icons8-facebook-32.png'
import twitterIcon from '../images/icons8-twitter-32.png'
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import TypeOfFixers from './TypesOfFixers'
import How from './HowItWorks';
import JobsCarousel from './JobsCarousel';


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleHire = this.handleHire.bind(this)
  }

  handleHire = () => {
    browserHistory.push({ pathname: '/categories' })
    localStorage.setItem('typeOfUser', 'user')
  }

  render() {
    return (
      <div>
        <div id="home">
          <Navbar />
          <div id="landingPage" style={{ height: "100vh" }} className="blueBackground col-md-12 col-sm-12">
            <div style={{
              position: 'absolute', bottom: 0, width: '100%', height: '90%',
              textAlign: 'center', padding: 10
            }}>
              <p style={{ fontSize: 32, color: '#fff', float: 'center', marginLeft: '20px' }}>The convenient way to find reliable tradesmen in your neighborhood</p>
              <p style={{ fontSize: 17, color: '#fff', float: 'center', marginLeft: '20px', fontStyle: 'oblique' }}>Choose from our vetted tardesmen for help without all the fuss. We are currently offering services for the following:</p>

              <div>
                <button type="button" className="btn btn-outline-dark landing-btn" onClick={() => this.handleHire()}>Hire A Plumber</button>
                <button type="button" className="btn btn-outline-dark landing-btn" onClick={() => this.handleHire()}>Hire A Cleaner</button>
                <button type="button" className="btn btn-outline-dark landing-btn" onClick={() => this.handleHire()}>Hire An Electrician</button>
                <button type="button" className="btn btn-outline-dark landing-btn" onClick={() => this.handleHire()}>Hire A Carpenter</button>
              </div>

            </div>

          </div>
          {/* customer/fixer */}
          {/* <CustomerFixerCard /> */}
          <div >
            {/* How it Works section */}
            <JobsCarousel />

            <How />
            {/* Buttons*/}
            {/*Type of Fixers*/}
            {/* <TypeOfFixers /> */}
            {/* Contact */}
            <div style={{ backgroundColor: '#007470', color: 'black' }} >

              <div className="container pt-3 pb-3">
                {/* <div className='text-center'><h3>Get in touch with us</h3></div> */}
                <div className="row justify-content-between">
                  <div className="col-md-4">
                    <h4 className="mb-3" style={{ color: '#ffff' }}>Links</h4>
                    <Link to="/privacypolicy" style={{ color: "#fff" }} className="link">Privacy Policy</Link>
                  </div>
                  <div className="col-md-4 align-items-center">

                    <h4 className="mb-3" style={{ color: '#ffff' }}>Contact</h4>
                    <h5 style={{ color: "#fff" }}>Email: <Link style={{ color: "#fff" }} to='/contactus'>support@myfixerapp.com</Link></h5>
                    <h5 style={{ color: "#fff" }}>Phone: 0967639241</h5>
                    {/* <h5>Address:</h5> */}

                  </div>
                  <div className="col-md-4">
                    <h4 className="mb-3" style={{ color: '#ffff' }}>Social Media</h4>
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

export default withStyles(styles)(Home);
//export default Home;
