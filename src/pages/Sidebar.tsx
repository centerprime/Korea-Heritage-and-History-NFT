import React from 'react';
import '../css/style.css';
import header_bg_001 from "../images/header_bg_001.png";
import logo from "../images/logo.png";
import {Link} from "react-router-dom";

function Sidebar() {
    return (
        <div className="container-fluid header">
            <div className="row">
                <div className="col-lg-3">
                    <ul id="mmenu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/khhn_swap">
                            KHHN SWAP
                        </Link></li>
                        <li><Link to="/khhn_lottery">KHHN LOTTERY</Link></li>
                        <li><Link to="/khhn_viewer">KHHN VIEWER</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
