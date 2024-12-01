import React from 'react';
import { FaEnvelope, FaUser } from 'react-icons/fa';

const Header = ({ onLoginClick }) => {
    return (
        <header className="AppHeader">
            <p className="AppLogo">MOBank</p>
            <button className="ContactUsButton navButton">
                <FaEnvelope />
                Contact us
            </button>
            <button className="LoginButton navButton" onClick={onLoginClick} >
                <FaUser />
                Log in
            </button>
        </header>
    );
};

export default Header;