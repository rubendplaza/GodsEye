import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
        return(
            <nav className='nav-bar'>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black pa3 grow pointer'>Sign Out</p>
            </nav>
        );
    } else {
        return(
            <nav className='nav-bar'>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 grow pointer'>Sign in</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black pa3 grow pointer'>Register</p>
            </nav>
        );
    }
}

export default Navigation;