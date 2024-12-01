import React from 'react';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ onLoginClick }) => {
    return (
        <header className="AppHeader">
            <Link to='/'>
                <p className="AppLogo">MOBank</p>
            </Link>
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