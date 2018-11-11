import React from 'react'
import Card from '@material-ui/core/Card';
//Icons
import computerIcon from '../images/fixerIcons/icons8-computer-support-48.png';
import drillIcon from '../images/fixerIcons/icons8-drill-48.png';
import plugIcon from '../images/fixerIcons/icons8-electrical-48.png';
import carIcon from '../images/fixerIcons/icons8-fiat-500-48.png';
import houseKeeperIcon from '../images/fixerIcons/icons8-housekeeper-48.png';
import janitorIcon from '../images/fixerIcons/icons8-janitor-48.png';
import maintenanceIcon from '../images/fixerIcons/icons8-maintenance-48.png';
import plumberIcon from '../images/fixerIcons/icons8-pipelines-48.png';
import sawIcon from '../images/fixerIcons/icons8-saw-48.png';
import spadeIcon from '../images/fixerIcons/icons8-spade-48.png';
import trainingIcon from '../images/fixerIcons/icons8-training-48.png';
import welderIcon from '../images/fixerIcons/icons8-welder-64.png';


export default function TypeOfFixers() {
    return (
        <div style={{ height: "100vh" }} className="blueBackground text-center">
            <h3 className='pb-5' style={{ color: 'white' }}>Fixers</h3>
            <div className="row justify-content-center">
                <div className="row col-md-8 justify-content-center">
                    <div className="col-md-4 fixerIcons">
                        <div className="card">
                            <div className="card-body text-center">
                                <a href="">
                                    <p><img className="img-fluid" src={plugIcon} alt="" /></p>
                                    <h3 className="card-title">Electrician</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 fixerIcons">
                        <div className="card">
                            <div className="card-body text-center">
                                <a href="">
                                    <p><img className="img-fluid" src={plumberIcon} alt="" /></p>
                                    <h3 className="card-title">Plumbing</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 fixerIcons mt-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <a href="">
                                    <p><img className="img-fluid" src={sawIcon} alt="" /></p>
                                    <h3 className="card-title">Carpenter</h3>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 fixerIcons mt-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <a href="">
                                    <p><img className="img-fluid" src={janitorIcon} alt="" /></p>
                                    <h3 className="card-title">House Cleaning</h3>
                                </a>
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