import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import handIcon from '../images/icons8-handshake-100.png'
import CarpenterImage from '../images/carpenter.jpeg'
import MechanicImage from '../images/mechanic.jpg';
import ElectricianImage from '../images/electrical.jpg';
import CleaningImage from '../images/cleaning.jpg';
import CardActions from '@material-ui/core/CardActions';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

export default function JobsCarousel() {
    return (
        <div style={{ height: "100vh" }} className="container whiteBackground col-md-12 col-sm-12">
            <br />
            <div className='text-center mb-5'><h2 style={{ color: '#0dbab1', fontSize: 40 }}>Gallery</h2></div>

            <div className='row justify-content-around '>
                <div className="card" style={{ width: "21rem" }}>
                    <img className="card-img-top" src={CarpenterImage} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title"><strong>Carpenter Services</strong></h5>

                        <p className="card-text">Get in touch with skilled carpenters with experience in performing is the cutting, shaping and installation of building materials during the construction of buildings and home furniture.</p>

                    </div>
                </div>



                <div className="card invisibleBorder" style={{ width: "21rem", border: "1px solid white", textAlign: "center" }}>
                    <img className="card-img-top rounded" src={CleaningImage} alt="Card image mec" />
                    <div className="card-body">
                        <h5 className="card-title greenText"><strong>Cleaning Services</strong></h5>
                        <p className="card-text">Connect to people with experince in management of duties and chores involved in the running of a household, such as cleaning, cooking, home maintenance, washing and grocery shopping.</p>

                    </div>
                </div>



                <div className="card" style={{ width: "21rem" }}>
                    <img className="card-img-top" src={ElectricianImage} alt="Card image elec" />
                    <div className="card-body blueBackground" style={{ color: "white" }}>
                        <h5 className="card-title"><strong>Electrical Services</strong></h5>
                        <p className="card-text">We will connect you to  electricians tradesman specializing in electrical wiring of buildings, transmission lines, stationary machines, and related equipment.</p>

                    </div>
                </div>


            </div>
        </div>
    )
}