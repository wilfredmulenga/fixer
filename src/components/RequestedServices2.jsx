import React from 'react';
import Navbar from './Navbar';
import PendingReviewCard from './PendingReviewCard';

export default function RequestedServices2() {
    return (
        <div>
            <Navbar />
            <div className='mt-5'>
                <p className="whiteText">Requested Fixers</p>
                <PendingReviewCard />
            </div>
        </div>
    )
}