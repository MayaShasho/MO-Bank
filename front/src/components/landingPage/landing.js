import "./landing.css"
import React from 'react';

const LandingPage = ({ onGetStartedClick, onLoginClick }) => {
    return (
        <>
            <div className="LandingPage">
                <div className="MainContent">
                    <h1 className='LandingPageText'>The Future of Banking is Here</h1>
                    <button className="GetStartedButton" onClick={onGetStartedClick}>
                        Get Started
                    </button>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
