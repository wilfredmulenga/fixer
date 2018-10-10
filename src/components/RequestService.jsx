import React from 'react';
import Navbar from './Navbar';

class RequestService extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
            <Navbar />
            <div className="container">
                <h4 className="mb-4">Request Service</h4>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="mb-4">
                            <p>Brief Description</p>
                            <textarea
                                className="form-control"
                                rows="5"
                                placeholder="please give details of the work needed to be done"
                                required
                            />
                        </div>
                        <div>
                            <p>Estimated Budget (ZMK)</p>
                            <div><input style={{ display: 'inline-block' }}
                                type="number" required /> </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <p>Service Address</p>
                        <div>
                            {/* <div className="col-md-4 text-center" >
                                <p>Street Address</p>
                                <p></p>
                                <p></p>
                                <p></p>
                            </div> */}
                            <div className="col-md-10" style={{ display: 'inline-block' }}>
                                <input className="form-control mb-2" type="text" placeholder="street address" required></input>
                                <input className="form-control mb-2" type="text" placeholder="area" required></input>
                                <input className="form-control mb-2" type="text" placeholder="city" required></input>
                                <input className="form-control mb-2" type="number" placeholder="phone number" required></input>
                                <input className="form-control mb-2" type="text" placeholder="preferred start date" required></input>
                                <input type="checkbox" name="vehicle2" value="Car" /> Remember this address
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-5 text-center">
                    <button>Request Hire</button>
                </div>
            </div>
        </div>)
    }
}

export default RequestService