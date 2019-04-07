import React from 'react';
import CarpenterImage from '../images/carpenter.jpeg'
import ElectricianImage from '../images/electrical.jpg';
import CleaningImage from '../images/cleaning.jpg';

export default function JobsCarousel() {
    return (
        <div className="container whiteBackground col-md-12 col-sm-12 mb-3">
            <br />
            <div className='text-center mb-5 heading'><h2 style={{ color: '#0dbab1', fontSize: 40, fontStyle: 'bold' }}>Gallery</h2></div>

            <div className='row justify-content-around '>
                <div className="card" style={{ width: "21rem", border: "1px solid white", textAlign: "center" }}>
                    <img className="card-img-top rounded" src={ElectricianImage} alt="Card  electrician" />
                    <div className="card-body">
                        <h5 className="card-title greenText"><strong>Electrical Services</strong></h5>

                        <p className="card-text">We will connect you to  electricians tradesman specializing in electrical wiring of buildings, transmission lines, stationary machines, and related equipment.</p>

                    </div>
                </div>



                <div className="card invisibleBorder" style={{ width: "21rem", border: "1px solid white", textAlign: "center" }}>
                    <img className="card-img-top rounded" src={CleaningImage} alt="Card  cleaner" />
                    <div className="card-body">
                        <h5 className="card-title greenText"><strong>Cleaning Services</strong></h5>
                        <p className="card-text">Connect to people with experince in management of duties and chores involved in the running of a household, such as cleaning, cooking, home maintenance, washing and grocery shopping.</p>

                    </div>
                </div>



                <div className="card" style={{ width: "21rem", border: "1px solid white", textAlign: "center" }}>
                    <img className="card-img-top rounded" src={CarpenterImage} alt="Card  carpenter" />
                    <div className="card-body ">
                        <h5 className="card-title greenText"><strong>Carpenter Services</strong></h5>
                        <p className="card-text">Get in touch with skilled carpenters with experience in performing is the cutting, shaping and installation of building materials during the construction of buildings and home furniture.</p>

                    </div>
                </div>


            </div>
        </div>
    )
}