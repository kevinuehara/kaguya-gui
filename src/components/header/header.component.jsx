import React from 'react';
import './header.component.css';

const Header = ({ title }) => (
    <div className="header">
        <div className="title">
            { title }
        </div>
    </div>
);


export default Header;
