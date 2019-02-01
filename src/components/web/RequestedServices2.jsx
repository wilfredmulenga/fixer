import React from 'react';
import Navbar from './Navbar';
import PendingReviewCard from './PendingReviewCard';

export default function RequestedServices2() {
    return (
        <div>
            <Navbar />
            <div style={{ height: '100vh' }} className='blueBackground pt-5'>

                <PendingReviewCard />
            </div>
        </div>
    )
}