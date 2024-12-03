import React from 'react';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="AppHeader">
            <Link to='/'>
                <p className="AppLogo">MOBank</p>
            </Link>
            <button className="ContactUsButton navButton">
                <FaEnvelope />
                Contact us
            </button>
            <Link className="LoginButton navButton" to='/login' >
                <FaUser />
                Log in
            </Link>
        </header>
    );
};

export default Header;