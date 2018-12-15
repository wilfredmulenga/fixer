import React from 'react';
import database from '../database/fixer-test-export.json';

const reviews = database.Fixers.L5WK2zajNqS7wLVja2KwzsdWfCA3.reviews;
const textStyle = {
    fontSize: 11,
    marginBottom: 3
}
export default function FixerReviews() {
    return (
        <div >
            <h5>Reviews</h5>
            {
                reviews.map((element, i) => (
                    <div className="row" key={i}>
                        <div className="col-4">
                            <img className='rounded-circle' style={{ width: 72, height: 72 }} src={element.pic} />
                        </div>
                        <div className="col-8">
                            <p style={textStyle}>{element.name}</p>
                            <p style={textStyle}>{element.rating}</p>
                            <p style={textStyle}>{element.review}</p>
                        </div>
                        <hr />
                    </div>
                    
                ))
            }
        </div>
    )
}