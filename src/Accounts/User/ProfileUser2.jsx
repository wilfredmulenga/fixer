import React from 'react';
import profilepic from '../../images/profilepic.jpeg';
import Navbar from '../../components/Navbar';
import PendingReviewCard from '../../components/PendingReviewCard';

export default function ProfileUser2() {
    return (
        <div>
            <Navbar />
            <div className="container-fluid" style={{ backgroundColor: "#0dbab1", height: "100vh" }}>
                <div className="row justify-content-center pt-3">
                    <img
                        className="card-img-top rounded-circle"
                        src={profilepic}
                        style={{ width: 68, height: 68 }}
                        alt={'profile pic'}
                    />
                </div>
                <div className="row justify-content-center mt-3">
                    <h5 className="whiteText">Chris Mbewe</h5>
                </div>
                <div>
                    <p className="whiteText">Requested Fixers</p>
                    <PendingReviewCard />
                </div>
            </div>
        </div>
    )
}