import React from 'react';
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';

export default function CustomerFixerCard() {
    return (
        <div className="row mt-5  justify-content-center">
            <div className='card text-center  col-md-4'>
                <div>
                    <h3 className='mb-4 mt-5'>Looking for a Fixer</h3>
                    <Button
                        type="button"
                        variant='text'
                        onClick={() => browserHistory.push({ pathname: '/categories' })}>Join as Customer</Button>
                </div>
                <div>
                    <h3 className='mb-4 mt-5'>Looking to get hired</h3>
                    <Button
                        type="button"
                        variant='text'
                        className='mb-5'
                        onClick={() => browserHistory.push({ pathname: '/viewprofile' })}>Join as Fixer</Button>
                </div>
            </div>
            {/* 
                <div>

              <div className="container-fluid padding">
                <div className="row text-center padding">
                  <div className="col-md cardMargin">
                    <Card>
                      <br /><br /><br /><br />
                      <h1>Get Hired</h1>
                      <br />
                      <button className="btn btn-dark btn-lg">Become A Fixer</button>
                      <br /><br /><br /><br />
                    </Card>
                  </div>
                  <br />
                  <div className="col-md cardMargin">
                    <Card>
                      <br /><br /><br /><br />
                      <h1>Hire someone</h1>
                      <br />
                      <button className="btn btn-dark btn-lg">Become An Employer</button>
                      <br /><br /><br /><br />
                    </Card>
                  </div>
                </div>


              </div>
            </div>
            
            */}
        </div>
    )
}

