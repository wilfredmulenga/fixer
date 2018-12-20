import React from 'react';
import database from '../database/fixer-test-export.json';
import starFilled from '../images/icons8-star-filled-7.png';
import starOutlined from '../images/icons8-star-7.png';


let reviews = database.Fixers.L5WK2zajNqS7wLVja2KwzsdWfCA3.reviews;
const textStyle = {
    fontSize: 11,
    marginBottom: 3
}
let stars = []

function starsCount(rating) {
    for (var i = 1; i < 6; i++) {
        let starType = starFilled
        if (i > rating) {
            starType = starOutlined
        }
        stars.push(<img alt='star' src={starType} />)
    }
    return stars
}

export default function FixerReviews() {
    return (
        <div >
            <h5>Reviews</h5>
            {
                reviews.map((element, i) => (
                    <div className="row" key={i}>
                        <div className="col-4">
                            <img alt='profile pic' className='rounded-circle' style={{ width: 72, height: 72 }} src={element.pic} />
                        </div>
                        <div className="col-8">
                            <p style={textStyle}>{element.name}</p>
                            {starsCount(element.rating)}
                            <p style={textStyle}>{element.review}</p>
                        </div>
                        <hr />
                    </div>

                ))
            }
        </div>
    )
}