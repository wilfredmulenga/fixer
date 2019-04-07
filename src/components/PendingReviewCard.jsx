import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { browserHistory } from 'react-router';
import Firebase from '../config/firebase';
import WhiteLoader from './WhiteLoader';



var userUID = localStorage.getItem('userUID');
var element = [];
var requestService;


const styles = {
    card: {
        minWidth: 275,
        display: 'flex',
        flexWrap: 'wrap'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class SimpleCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            serviceRequests: [],
            loaded: false
        }
        Firebase.database()
            .ref(`Users/${userUID}/serviceRequests`)
            .once('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    requestService = snapshot.val()
                    for (const index in requestService) {
                        element.push(requestService[index])
                    }
                    this.setState({
                        serviceRequests: element,
                        loaded: true
                    })
                }
            })
    }
    UNSAFE_componentWillMount() {
        element = []
    }
    //const bull = <span className={classes.bullet}>•</span>;
    render() {

        return (
            <div className="row justify-content-center container-fluid">
                {(this.state.loaded) ?
                    (this.state.serviceRequests.length !== 0) ? <div className='col-md-8'>
                        <div style={{ textAlign: "center" }}>  <h5 className="whiteText pb-2">Requested Fixers</h5></div>
                        <table style={{ backgroundColor: '#fff' }} className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col whiteText">Fixer</th>
                                    <th scope="col whiteText">Profession</th>
                                    <th scope="col whiteText">Review Status</th>
                                </tr>
                            </thead>

                            <tbody>{this.state.serviceRequests.map((element, i) =>

                                <tr key={i}>
                                    <th scope="row"> <Typography className='p whiteText'>
                                        {element.fixerFullName}</Typography></th>
                                    <th scope="row"><Typography className='p whiteText'>
                                        {element.profession}</Typography></th>
                                    <th scope="row">
                                        <Button size="small"
                                            className="btn"
                                            type="button"
                                            variant='contained'
                                            style={{ backgroundColor: '#FFF', color: '#000' }}
                                            onClick={() =>
                                                (element.reviewStatus === 'pending') ?
                                                    browserHistory.push({
                                                        pathname: '/givereview',
                                                        state: {
                                                            'fixerUID': element.fixerUID
                                                        }
                                                    }) : null
                                            }
                                        >{(element.reviewStatus === 'pending') ? `Pending` : null}
                                            {(element.reviewStatus === 'reviewed') ? `Reviewed` : null}
                                        </Button>

                                    </th>
                                </tr>
                            )}</tbody> </table></div> : <div className='row justify-content-center'><h5 className='whiteText'>No service requests yet</h5></div> : <WhiteLoader />}


            </div>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);