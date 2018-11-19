import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import handIcon from '../images/icons8-handshake-100.png'
import CarpenterImage from '../images/carpenter.jpeg'
import CardActions from '@material-ui/core/CardActions';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

export default function JobsCarousel() {
    return (
        <div style={{ height: "100vh" }} className="container blueBackground col-md-12 col-sm-12">
            <div className='text-center mb-5'><h2 style={{ color: 'white' }}>Gallery</h2></div>
            <div className='row justify-content-around '>

                <div className="card" style={{ width: "21rem" }}>
                    <img className="card-img-top" src={CarpenterImage} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                    </div>
                </div>
                <div className="card" style={{ width: "21rem" }}>
                    <img className="card-img-top" src={CarpenterImage} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                    </div>
                </div>
                <div className="card" style={{ width: "21rem" }}>
                    <img className="card-img-top" src={CarpenterImage} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                    </div>
                </div>

            </div>
        </div>
    )
}