import React from 'react';
import workingIcon from '../images/icons8-work-light-100.png'
import handIcon from '../images/icons8-handshake-100.png'
import workerIcon from '../images/icons8-workers-100.png'


export default function HowItWorks() {
    return (
        <div className="blueBackground">
            <div className="flex pb-5" style={{ textAlign: 'center' }}>
                <h3 className="titles" style={{ color: 'white', fontSize: 40 }}>How It Works</h3>
                <div className="row d-flex justify-content-start">
                    <div className=" row col-md-5  offset-md-2 col-sm-12 mb-3">
                        <div className="col-md-4 row align-items-center justify-content-center"> <img src={workingIcon} style={{ height: 80 }} alt="working icon" /></div>
                        <div className="card col-md-8">
                            <h5 className="card-title mt-3"><strong>I want to get hired</strong></h5>
                            <p className="card-text">
                                Our platform lets people who are not in the formal sector be able to list their skills and services thus opening up the window that has been overlooked by other Job-listing sites. Whether you are a Carpenter, Welder, Barberman, this site will help bring the customers to you.
                              </p><br />
                        </div>
                    </div>
                </div>
                <div className="mt-3 row d-flex justify-content-center">
                    <div className="row col-md-5 offset-md-2 col-sm-12 mb-3">
                        <div className="col-md-4 row align-items-center justify-content-center"> <img src={workerIcon} style={{ height: 80 }} alt="working icon" /></div>
                        <div className="card col-md-8">

                            <h5 className="card-title mt-3"><strong>I want to hire someone</strong></h5>
                            <p className="card-text">
                                Looking for a good hairdresser but just don't know where to look. Or maybe your Kitchen needs some remodeling. Our platform lists the very best professionals in the informal job sector, skilled for the job you may require. Feel free to browse through our category section to get started.
                                  </p><br />

                        </div>
                    </div>
                </div>
                <div className="mt-3 row d-flex justify-content-start">
                    <div className="row col-md-5 offset-md-2 col-sm-12 mb-3">
                        <div className="col-md-4 row align-items-center justify-content-center"> <img src={handIcon} style={{ height: 80 }} alt="working icon" /></div>
                        <div className="card col-md-8">

                            <h5 className="card-title mt-3"><strong>I want to be a Partner</strong></h5>
                            <p className="card-text">
                                We are always looking for ways to improve our platform and from new angles or ideas. We feel that people with informal jobs could use a platform that is taylored specifically for them to showcase their work. If you share the same passion as well do, we would be happy to hear from you.
                     </p><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}