import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { browserHistory } from 'react-router';

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

function SimpleCard(props) {
    const { classes } = props;
    //const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.card}>
            <div>
                <CardContent>
                    <Typography className='p'>
                        Clara Tembo
                        <br />
                        Profession
                   </Typography>
                </CardContent>
            </div>
            <div>
                <CardActions>
                    <Button size="small"
                        onClick={()=>
                        browserHistory.push({
                            pathname: '/givereview'
                        })
                            }
                    >Pending Review</Button>
                </CardActions>
            </div>
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);