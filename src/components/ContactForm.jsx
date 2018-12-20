import React from 'react';
import CarpenterImage from '../images/carpenter.jpeg'
import ElectricianImage from '../images/electrical.jpg';
import CleaningImage from '../images/cleaning.jpg';
import PlumberImage from '../images/plumber.jpg';


export default function Carousel() {
    return (
        <div style={{ height: "150vh" }} className="container blueBackground col-md-12 col-sm-12">
            <div className='text-center mb-5'><h2 style={{ color: 'white', fontSize: 40 }}>Gallery</h2></div>

            <div className='row justify-content-around '>

                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">

                            <img className="card-img-top makesmaller" src={ElectricianImage} alt="Card  electrician" />
                            <div class="carousel-caption d-none d-md-block">
                                <h5 style={{ fontSize: 30, color: '#fff', float: 'center', marginLeft: '20px' }}><strong>Electrical Services</strong></h5>
                                <p style={{ fontSize: 20, color: '#fff', float: 'center', marginLeft: '20px' }}>We will connect you to  electrician tradesmen specializing in electrical wiring of buildings, transmission lines, stationary machines, and related equipment.</p>

                            </div>
                        </div>
                        <div class="carousel-item">

                            <img className="card-img-top makesmaller" src={PlumberImage} alt="Card plumber" />
                            <div class="carousel-caption d-none d-md-block">

                                <h5 style={{ fontSize: 30, color: '#fff', float: 'center', marginLeft: '20px' }}><strong>Plumbing Services</strong></h5>
                                <p style={{ fontSize: 20, color: '#fff', float: 'center', marginLeft: '20px' }}>Meet plumbing tradesmen who specializes in installing and maintaining systems used for potable (drinking) water, sewage and drainage in plumbing systems.</p>
                            </div>

                        </div>
                        <div class="carousel-item">

                            <img className="card-img-top makesmaller" src={CleaningImage} alt="Card cleaning" />
                            <div class="carousel-caption d-none d-md-block">

                                <h5 style={{ fontSize: 30, color: '#fff', float: 'center', marginLeft: '20px' }}><strong>Cleaning Services</strong></h5>
                                <p style={{ fontSize: 20, color: '#fff', float: 'center', marginLeft: '20px' }}>Connect to people with experince in management of duties and chores involved in the running of a household, such as cleaning, cooking, home maintenance, washing and grocery shopping.</p>
                            </div>

                        </div>
                        <div class="carousel-item">

                            <img className="card-img-top " src={CarpenterImage} alt="Card carpenter" />
                            <div class="carousel-caption d-none d-md-block">
                                <h5 style={{ fontSize: 30, color: '#fff', float: 'center', marginLeft: '20px' }}><strong>Carpenting Services</strong></h5>
                                <p style={{ fontSize: 20, color: '#fff', float: 'center', marginLeft: '20px' }}>Get in touch with skilled carpenters with experience in performing is the cutting, shaping and installation of building materials during the construction of buildings and home furniture.</p>
                            </div>

                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

            </div>

        </div>

    )
}