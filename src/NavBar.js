import React from "react";
import { Link } from 'react-router-dom'

const NavBar = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/article-list">Articles</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/tree">Tree</Link>
            </li>
            {
                window.sessionStorage.getItem('user') ?
                    <span>{window.sessionStorage.getItem("user")}</span> :
                    <li><Link to="/login">Login</Link></li>

            }
        </ul>
    </nav>
)

export default NavBar