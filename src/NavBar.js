import React from "react";
import { Link } from 'react-router-dom'
class NavBar extends React.PureComponent {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {
                        window.sessionStorage.getItem('user') ?
                            <span>{window.sessionStorage.getItem("user")}</span> :
                            <li><Link to="/login">Login</Link></li>

                    }
                </ul>
            </nav>
        )
    }
}

export default new NavBar();