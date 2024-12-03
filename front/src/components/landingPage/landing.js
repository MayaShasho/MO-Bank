import "./landing.css"
import { Link } from "react-router-dom";
import React from 'react';

const LandingPage = () => {

    return (
        <>
            <div className="LandingPage">
                <div className="MainContent">
                    <h1 className='LandingPageText'>The Future of Banking is Here</h1>
                    <Link className="GetStartedButton" to='/signup'>
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
