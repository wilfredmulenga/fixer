import React from 'react'
//Icons
import { browserHistory } from 'react-router';
import plugIcon from '../images/fixerIcons/icons8-electrical-48.png';
import janitorIcon from '../images/fixerIcons/icons8-janitor-48.png';
import plumberIcon from '../images/fixerIcons/icons8-pipelines-48.png';
import sawIcon from '../images/fixerIcons/icons8-saw-48.png';



export default function TypeOfFixers() {
    return (
        <div className="whiteBackground text-center">
            <br />
            <h2 className='pb-5' style={{ color: '#0dbab1', fontSize: 40 }}>Our Services</h2>
            <div className="row justify-content-center">
                <div className="row col-md-12 justify-content-center">
                    <div className="col-md-2 fixerIcons"
                        onClick={() => browserHistory.push({
                            pathname: '/categories',
                            state: { typeOfUser: 'Electrician' }
                        })}>
                        <div className="card colorChange">
                            <div className="card-body text-center">

                                <p><img className="img-fluid rounded" src={plugIcon} alt="electrical plug" /></p>
                                <h5 className="card-title">Electrician</h5>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 fixerIcons">
                        <div className="card colorChange">
                            <div className="card-body text-center">

                                <p><img className="img-fluid" src={plumberIcon} alt="plumber" /></p>
                                <h5 className="card-title">Plumbing</h5>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 fixerIcons">
                        <div className="card colorChange">
                            <div className="card-body text-center">

                                <p><img className="img-fluid" src={sawIcon} alt="saw" /></p>
                                <h5 className="card-title">Carpenter</h5>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 fixerIcons">
                        <div className="card colorChange">
                            <div className="card-body text-center">

                                <p><img className="img-fluid" src={janitorIcon} alt="saw" /></p>
                                <h5 className="card-title">House Cleaning</h5>
                                <br />
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div className="col-xs fixerIcons">
                    <div className="card">
                        <div className="card-body text-center">
                            <a href="">
                                <p><img className="img-fluid" src={computerIcon} alt="" /></p>
                                <h3 className="card-title">Computer Repair</h3>
                            </a>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-xs fixerIcons">
                    <div className="card">
                        <div className="card-body text-center">
                            <a href="">
                                <p><img className="img-fluid" src={drillIcon} alt="" /></p>
                                <h3 className="card-title">Appliances</h3>
                            </a>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-xs fixerIcons">
                    <div className="card">
                        <div className="card-body text-center">
                            <a href="">
                                <p><img className="img-fluid" src={carIcon} alt="" /></p>
                                <h3 className="card-title">Car Repair</h3>
                            </a>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-xs fixerIcons">
                    <div className="card">
                        <div className="card-body text-center">
                            <a href="">
                                <p><img className="img-fluid" src={welderIcon} alt="" /></p>
                                <h3 className="card-title">Welding</h3>
                            </a>
                        </div>
                    </div>
                </div> */}

                {/* <div className="col-xs fixerIcons">
                    <div className="card">
                        <div className="card-body text-center">
                            <a href="">
                                <p><img className="img-fluid" src={houseKeeperIcon} alt="" /></p>
                                <h3 className="card-title">House Keeper</h3>
                            </a>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-xs fixerIcons">
                    <div className="card">
                        <div className="card-body text-center">
                            <a href="">
                                <p><img className="img-fluid" src={maintenanceIcon} alt="" /></p>
                                <h3 className="card-title">Maintenance</h3>
                            </a>
                        </div>
                    </div>
                </div> */}

                {/* <div className="col-xs fixerIcons">
                    <div className="card">
                        <div className="card-body text-center">
                            <a href="#">
                                <p><img className="img-fluid" src={spadeIcon} alt="" /></p>
                                <h3 className="card-title">Landscaping</h3>
                            </a>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-xs fixerIcons">
                    <div className="card">
                        <div className="card-body text-center">
                            <a href="#">
                                <p><img className="img-fluid" src={trainingIcon} alt="" /></p>
                                <h3 className="card-title">Training</h3>
                            </a>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    )
}