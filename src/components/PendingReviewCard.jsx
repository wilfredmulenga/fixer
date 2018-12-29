import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { browserHistory } from 'react-router';
import Firebase from '../config/firebase';



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
            serviceRequests: []
        }
        Firebase.database()
            .ref(`Users/${userUID}/serviceRequests`)
            .once('value', (snapshot) => {
                requestService = snapshot.val()
                for (const index in requestService) {
                    element.push(requestService[index])
                }
                this.setState({
                    serviceRequests: element
                })
            })
    }

    //const bull = <span className={classes.bullet}>•</span>;
    render() {

        return (
            <div className="container-fluid">
                <table style={{ backgroundColor: '#fff' }} className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col whiteText">Fixer</th>
                            <th scope="col whiteText">Profession</th>
                            <th scope="col whiteText">Review Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.serviceRequests !== []) ? this.state.serviceRequests.map((element, i) =>
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
                        ) : <div className='row justify-content-center'><p className='whiteText'>No service requests yet</p></div>}
                    </tbody>
                </table>
            </div>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);