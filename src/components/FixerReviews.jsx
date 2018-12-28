import React from 'react';
import database from '../database/fixer-test-export.json';
import starFilled from '../images/icons8-star-filled-7.png';
import starOutlined from '../images/icons8-star-7.png';
import Firebase from '../config/firebase';


//let reviews = database.Fixers.L5WK2zajNqS7wLVja2KwzsdWfCA3.reviews;
const textStyle = {
    fontSize: 11,
    marginBottom: 3
}
let stars = []



class FixerReviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
        this.handleReviews = this.handleReviews.bind(this)
        this.starsCount = this.starsCount.bind(this)
        this.handleReviews()
    }
    UNSAFE_componentWillMount() {

        //reset stars array to empty so that it doesnt continue adding stars
        stars = []
    }

    handleReviews = () => {
        let elements = []
        Firebase.database()
            .ref(`Fixers/L5WK2zajNqS7wLVja2KwzsdWfCA3/reviews`)
            //.ref(`Fixers/${this.props.fixerUID}/reviews`)
            .once('value', (snapshot) => {
                for (const index in snapshot.val()) {
                    elements.push(snapshot.val()[index])
                }
                this.setState({
                    reviews: elements
                })

            })
    }
    starsCount = (rating) => {
        stars = []
        for (var i = 1; i < 6; i++) {
            let starType = starFilled
            if (i > rating) {
                starType = starOutlined
            }
            stars.push(<img alt='star' src={starType} />)
        }
        return stars
    }

    render() {
        const { reviews } = this.state;
        return (
            <div className="container-fluid">
                <h5>Reviews</h5>
                {
                    reviews.map((element, i) => (
                        <div className="row mb-3" key={i}>
                            <div className="col-4">
                                <img alt='profile pic' className='rounded-circle' style={{ width: 72, height: 72 }} src={element.pic} />
                            </div>
                            <div key={i} className="col-8">
                                <p style={textStyle}>{`${element.name}, ${element.dateOfReview}`}</p>
                                {this.starsCount(element.rating)}
                                <p style={textStyle}>{element.review}</p>
                            </div>
                            <hr />
                        </div>

                    ))
                }
            </div>
        )
    }
}

export default FixerReviews;